import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { FieldValidation, Button, Password, FormError } from '../forms'
import { required } from 'helpers/forms/validators'

const LogInForm = ({
  handleSubmit,
  error,
  submitting,
  pristine,
  focusHere,
  forgotPasswordUrl
}) => (
  <form data-test="loginForm" onSubmit={handleSubmit} className="log-in-form">
    <h2>Log In</h2>
    <div className="line divider" />
    {/*
      <Button buttonType="dark" type="submit" image={githubIcon}>
      Log In with GitHub
      </Button>
      <TitleWithLines text="or" />
    */}
    <Field
      id="loginUsername"
      label="username / email"
      name="userName"
      placeholder="Enter username or email"
      component={FieldValidation}
      validate={required}
      className="input-lg"
      focusHere={focusHere}
    />
    <Field
      id="loginPassword"
      label="password"
      name="password"
      placeholder="Enter a password"
      component={Password}
      validate={required}
      className="input-lg"
    />
    <FormError error={error} />
    <Button
      buttonType="secondary"
      type="submit"
      disabled={pristine || submitting}
      className="btn-lg"
    >
      Log In
    </Button>
    <Link to={forgotPasswordUrl} className="forgot-password">
      Forgot Password?
    </Link>
  </form>
)
LogInForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  focusHere: PropTypes.bool,
  forgotPasswordUrl: PropTypes.string.isRequired
}

export default reduxForm({ form: 'logIn' })(LogInForm)
