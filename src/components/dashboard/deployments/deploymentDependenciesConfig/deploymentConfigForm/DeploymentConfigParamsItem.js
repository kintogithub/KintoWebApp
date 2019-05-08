import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { FieldValidation } from 'components/forms'

function getIsShownClass(visibleParams, key) {
  return !visibleParams.some(p => p.key === key) ? 'hide' : ''
}

const DeploymentConfigParamsItem = ({ fields, visibleParams, isDisabled }) => {
  return (
    <div className="form-body">
      {fields.length && visibleParams.length ? (
        <div>
          {fields.map((field, key) => {
            const data = fields.get(key)

            return (
              <div
                className={`param-row ${getIsShownClass(
                  visibleParams,
                  data.key
                )}`}
                key={key}
              >
                <Field
                  label={data.key}
                  name={`${field}.value`}
                  type="text"
                  component={FieldValidation}
                  className="grey"
                  inputTextOverlay={data.required ? 'Required' : null}
                  disabled={isDisabled}
                />
              </div>
            )
          })}
        </div>
      ) : (
        <div className="msg-empty">
          {!visibleParams || !visibleParams.length
            ? 'No matching result found'
            : 'No custom parameters added'}
        </div>
      )}
    </div>
  )
}
DeploymentConfigParamsItem.propTypes = {
  fields: PropTypes.object.isRequired,
  visibleParams: PropTypes.array.isRequired,
  isDisabled: PropTypes.bool.isRequired
}

export default DeploymentConfigParamsItem
