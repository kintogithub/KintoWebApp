import React, { Component } from 'react'
import Select, { components } from 'react-select'
import PropTypes from 'prop-types'
import Tooltip from 'rc-tooltip'
import HelpTooltipContainer from 'containers/dashboard/ui/HelpTooltipContainer'

class PrettySelect extends Component {
  static propTypes = {
    options: PropTypes.array,
    input: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    help: PropTypes.string,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.object,
    disabled: PropTypes.bool,
    tutorialPosition: PropTypes.string,
    changeFunction: PropTypes.func,
    fieldName: PropTypes.string
  }

  state = {
    value: ''
  }

  onInputChange = option => {
    if (this.props.hasLinkedDefaultValues) {
      this.props.onToggle(option.value)
    }
    if (this.props.changeFunction) {
      this.props.changeFunction(option.value)
    }
    this.props.input.onChange(option.value)
  }

  render() {
    const {
      options,
      input,
      label,
      help,
      placeholder,
      defaultValue,
      disabled,
      tutorialPosition,
      fieldName
    } = this.props
    const { value, name, onBlur } = input
    const inputVal = options
      ? options.find(o => o.value === value)
      : this.state.value
    const { touched, submitFailed, error } = this.props.meta
    const hasError = (touched || submitFailed) && error
    let className = this.props.className || ''
    if (hasError) {
      className += ' error'
    }

    return (
      <div className={`react-select ${className}`}>
        {tutorialPosition && (
          <HelpTooltipContainer
            fieldName={fieldName ? fieldName : input.name}
            tutorialPosition={tutorialPosition}
          />
        )}
        <label htmlFor={name}>
          {label}
          {help && (
            <Tooltip placement="top" overlay={help} trigger="click">
              <span className="tooltip" />
            </Tooltip>
          )}{' '}
        </label>
        <Select
          classNamePrefix="react-select"
          options={options}
          isSearchable={false}
          onChange={this.onInputChange}
          value={inputVal}
          onBlur={() => onBlur(inputVal ? inputVal.value : null)}
          defaultValue={defaultValue ? defaultValue : null}
          placeholder={placeholder}
          isDisabled={disabled}
          components={{
            Option: PrettySelectOption
          }}
        />
        {hasError && <div className="error-message">{error}</div>}
      </div>
    )
  }
}

const PrettySelectOption = props => {
  return (
    <components.Option {...props}>
      <div data-test-label={props.data.label}>
        {props.children}{' '}
        {props.data.isComingSoon ? (
          <span className="coming-soon-select">Coming Soon</span>
        ) : (
          ''
        )}
      </div>
    </components.Option>
  )
}

export default PrettySelect
