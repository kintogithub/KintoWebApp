import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { unique, envVariable } from 'helpers/forms/validators'
import {
  processUserVariablesForForm,
  pastedEnvVariablePatternRegex
} from 'helpers/kintoBlocksHelper'
import { FieldValidation, Toggle } from 'components/forms'
import Icon from '../../../ui/Icon'

const uniqueValidation = unique('configParameters', 'key')
class KintoBlockManageParamsField extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
    updateForm: PropTypes.func.isRequired,
    rawEnvironmentVariables: PropTypes.array
  }

  state = {
    key: '',
    value: '',
    required: false,
    onPaste: false
  }

  onChangeKey = e => {
    if (!this.state.onPaste) {
      this.setState({ key: e.target.value })
    } else {
      this.setState({ onPaste: false })
    }
  }

  onChangeValue = e => {
    if (!this.state.onPaste) {
      this.setState({ value: e.target.value })
    } else {
      this.setState({ onPaste: false })
    }
  }

  onToggleRequired = () => {
    this.setState(state => ({
      required: !state.required
    }))
  }

  onAdd = () => {
    const { key, value, required } = this.state
    this.props.fields.push({ key, value, required })
    this.setState({
      key: '',
      value: '',
      required: false
    })
  }

  handleKeyPress = e => {
    if (e.key === 'Enter' && this.state.key) {
      e.preventDefault()
      this.onAdd()
    }
  }

  handlePaste = e => {
    const rawData = e.clipboardData.getData('text')

    if (pastedEnvVariablePatternRegex.test(rawData)) {
      const processedData = processUserVariablesForForm(
        rawData,
        this.props.rawEnvironmentVariables
      )
      this.props.updateForm(processedData)

      this.setState({
        key: '',
        value: '',
        required: false,
        onPaste: true
      })
    }
  }

  render() {
    const { fields, disabled } = this.props
    const { key, value } = this.state
    return (
      <div className="form-body custom-params" data-test="kb-manage-params">
        <div className="top">
          {fields.length ? (
            fields.map((field, index) => (
              <ul
                key={index}
                className="unstyled-list"
                data-test={`kb-manage-params-${index}`}
              >
                <li className="row">
                  <div className="switch-container">
                    <Field
                      label="This is required"
                      name={`${field}.required`}
                      component={Toggle}
                      disabled={disabled}
                    />
                  </div>
                  <Field
                    label="Name"
                    name={`${field}.key`}
                    placeholder="Variable Name"
                    component={FieldValidation}
                    validate={[envVariable, uniqueValidation]}
                    disabled={disabled}
                  />
                  <Field
                    label="Recommended Value"
                    name={`${field}.value`}
                    placeholder="Separate by &quot;,&quot;"
                    component={FieldValidation}
                    disabled={disabled}
                  />
                  <div className="icon-column">
                    <Icon
                      onClick={() => fields.remove(index)}
                      disabled={disabled}
                      icon="remove"
                    />
                  </div>
                </li>
              </ul>
            ))
          ) : (
            <div className="empty-message">No environment variables added</div>
          )}
        </div>
        {!disabled ? (
          <div className="bottom">
            <div className="row">
              <div className="toggle-content">
                <label className="switch">
                  <input
                    type="checkbox"
                    id="isRequired"
                    checked={this.state.required}
                    onChange={this.onToggleRequired}
                  />
                  <span className="toggle-slider" />
                </label>
                <h6 className="toggle-message">This is a required value</h6>
              </div>
              <div className="field-wrapper">
                <label htmlFor="add-key">variable</label>
                <input
                  data-test="params-add-key"
                  id="add-key"
                  value={key}
                  onChange={this.onChangeKey}
                  onKeyPress={this.handleKeyPress}
                  onPaste={this.handlePaste}
                />
              </div>
              <div className="field-wrapper">
                <label htmlFor="add-value">value</label>
                <input
                  data-test="params-add-value"
                  id="add-value"
                  value={value}
                  onChange={this.onChangeValue}
                  onKeyPress={this.handleKeyPress}
                  onPaste={this.handlePaste}
                />
              </div>

              <div className="icon-column">
                <Icon onClick={this.onAdd} icon="add" disabled={!key} />
              </div>
            </div>
            <div className="row paste-help">
              <div className="help">
                <img src="/images/icon-hint-large.svg" alt="" />
                <div>
                  <h5>
                    <span>Pro Tip: </span>
                    You can copy / paste multiple variables in the supported
                    format:
                  </h5>
                  <h5>
                    <b> THIS_IS_A_VARIABLE=this_is_a_value</b>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}

export default KintoBlockManageParamsField
