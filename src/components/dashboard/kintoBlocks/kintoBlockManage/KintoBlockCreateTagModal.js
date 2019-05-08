import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Field, Fields, reduxForm, FormSection } from 'redux-form'
import Tooltip from 'rc-tooltip'
import { timeDayMonthYearShort } from 'constants/dateFormat'
import {
  validateRules,
  required,
  minValue0,
  maxValue999
} from 'helpers/forms/validators'
import { number } from 'helpers/forms/parsers'
import { truncate } from 'helpers/stringHelper'
import {
  Button,
  VersionInputs,
  FormError,
  FieldValidation
} from '../../../forms'

class KintoBlockCreateTagModal extends Component {
  static propTypes = {
    submitting: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
    build: PropTypes.bool
  }

  render() {
    const {
      kintoBlock,
      build,
      submitting,
      handleSubmit,
      onClose,
      error
    } = this.props
    return (
      <div className="create-kb-tag-modal">
        <div className="kh-modal-title">Tag This Build</div>
        <div className="kh-modal-body">
          <form onSubmit={handleSubmit}>
            <div className="field-wrapper">
              <label className="uppercase">Branch</label>
              <input type="text" disabled value={kintoBlock.version.name} />
            </div>

            <div className="field-input-wrapper">
              <div className="label">latest build</div>
              <div className="disabled-input-effect">
                <div className="main-with-icon">
                  <Tooltip placement="top" overlay="Build" trigger="click">
                    <div className="icon build med-icon" />
                  </Tooltip>
                  <div>
                    <span className="uppercase">
                      {truncate(build.id, 5)} -{' '}
                    </span>
                    {moment(build.createdAt).format(timeDayMonthYearShort)}
                  </div>
                </div>
              </div>
            </div>

            <FormSection name="version">
              <Fields
                names={['major', 'minor', 'revision']}
                parse={number}
                component={VersionInputs}
              />
            </FormSection>

            <Field
              type="textarea"
              name="notes"
              label="Notes"
              component={FieldValidation}
              validate={required}
              className="tall"
            />

            <FormError error={error} />

            <div className="kh-modal-actions">
              <Button onClick={onClose} type="button" buttonType="secondary">
                Cancel
              </Button>
              <Button type="submit" buttonType="dark" disabled={submitting}>
                Tag Build
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const validate = values => {
  let version = values.version || {}
  let errors = {}
  errors.major = validateRules(version.major, [
    required,
    maxValue999,
    minValue0
  ])
  errors.minor = validateRules(version.minor, [
    required,
    maxValue999,
    minValue0
  ])
  errors.revision = validateRules(version.revision, [
    required,
    maxValue999,
    minValue0
  ])
  if (version.major === 0 && version.minor === 0 && version.revision === 0) {
    errors.major = 'Invalid Version'
    errors.minor = 'Invalid Version'
    errors.revision = 'Invalid Version'
  }
  return { version: errors }
}

export default reduxForm({ form: 'kintoBlockCreateTag', validate })(
  KintoBlockCreateTagModal
)
