import React from 'react'
import PropTypes from 'prop-types'

const CheckBox = ({ input, id, label, meta, disabled }) => {
  const { touched, submitFailed, error } = meta
  const hasError = (touched || submitFailed) && error
  let className = input.className || ''
  if (hasError) {
    className += ' error'
  }

  return (
    <div className="field-wrapper">
      <div className="checked-field-wrapper">
        <input
          {...input}
          className={`checkbox ${input.value ? 'checked' : ''} ${className}`}
          type="checkbox"
          id={id || input.name}
          disabled={disabled}
        />
        <label className="checkbox-message" htmlFor={id || input.name}>
          <h6>{label}</h6>
        </label>
      </div>
      {hasError && <div className="error-message">{error}</div>}
    </div>
  )
}
CheckBox.propType = {
  input: PropTypes.object,
  id: PropTypes.string,
  label: PropTypes.string,
  meta: PropTypes.object
}

export default CheckBox
