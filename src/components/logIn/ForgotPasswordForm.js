import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { FieldValidation, Button } from '../forms'
import { required } from 'helpers/forms/validators'

const ForgotPasswordForm = ({ handleSubmit }) => (
  <div className="content forgot-password-wrapper">
    <form onSubmit={handleSubmit} className="forgot-password">
      <h2>Password Reset</h2>
      <div className="line" />
      <Field
        label="username / email"
        name="forgotPassword"
        placeholder="Enter username or email"
        component={FieldValidation}
        validate={required}
      />
      <h6 className="byline">
        A confirmation link will be sent to the corresponding email address
      </h6>
      <Button type="submit" buttonType="secondary">
        Reset Password
      </Button>
    </form>
  </div>
)
ForgotPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({ form: 'forgotPassword' })(ForgotPasswordForm)
