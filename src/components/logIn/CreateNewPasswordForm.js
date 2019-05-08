import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { Button, Password } from '../forms'
import { required } from 'helpers/forms/validators'
import { signup } from 'helpers/forms/validationFields'

const validate = values => {
  const errors = {}
  if (values.createNewPassword !== values.createNewPasswordConfirm) {
    errors.createNewPasswordConfirm = 'Passwords do not match.'
  }
  return errors
}

const CreateNewPasswordForm = ({ handleSubmit }) => (
  <div className="content create-new-password-wrapper">
    <form onSubmit={handleSubmit} className="create-new-password">
      <h2>Create New Password</h2>
      <div className="line" />
      <Field
        name="createNewPassword"
        placeholder="Create new password"
        component={Password}
        validate={signup.password}
      />
      <div className="byline" />
      <h6>Between 8 - 20 Characters</h6>
      <Field
        name="createNewPasswordConfirm"
        placeholder="Enter your new password again"
        component={Password}
        validate={required}
      />
      <Button type="submit">Create New Password</Button>
    </form>
  </div>
)
CreateNewPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({ form: 'createNewPassword', validate })(
  CreateNewPasswordForm
)
