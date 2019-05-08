import React from 'react'
import PropTypes from 'prop-types'

const FormError = ({ error, submitFailed }) =>
  !error || (error && submitFailed === false) ? null : (
    <div data-test="form-error" className="error-message-form error-message">
      {error}
    </div>
  )

FormError.propTypes = {
  error: PropTypes.string,
  submitFailed: PropTypes.bool
}

export default FormError
