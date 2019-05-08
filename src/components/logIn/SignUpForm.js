import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { FieldValidation, Button, Password, FormError } from '../forms'
import { signup, email } from 'helpers/forms/validationFields'

class SignUpForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string,
    submitting: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    focusHere: PropTypes.bool,
    logInDirectly: PropTypes.func.isRequired,
    autoSignUp: PropTypes.bool
  }

  componentDidMount() {
    if (this.props.autoSignUp) {
      this.props.logInDirectly()
    }
  }

  render() {
    const { handleSubmit, error, submitting, pristine, focusHere } = this.props
    return (
      <form
        data-test="signupForm"
        onSubmit={handleSubmit}
        className="sign-up-form"
      >
        <h2>Sign Up</h2>
        <div className="line divider" />
        <div>
          <Field
            id="signupUsername"
            type="text"
            name="userName"
            label="Username"
            placeholder="Enter username"
            component={FieldValidation}
            validate={signup.username}
            className="input-lg"
            focusHere={focusHere}
          />
          <Field
            id="signupEmail"
            type="email"
            name="email"
            label="email"
            placeholder="Enter your email address"
            component={FieldValidation}
            validate={email}
            className="input-lg"
          />
          <Field
            id="signupPassword"
            name="password"
            placeholder="Create a password"
            component={Password}
            validate={signup.password}
            className="input-lg"
          />
          <div className="byline">
            <h6>Between 8 - 128 Characters</h6>
          </div>
          <FormError error={error} />
          <Button
            type="submit"
            disabled={pristine || submitting}
            className="btn-lg"
          >
            Sign Up
          </Button>
          {/* <div className="byline">
            <h6>
            By clicking "Sign Up" you agree to our{' '}
            <a href="#">Terms of Service</a> and{' '}
            <a href="#">Privacy Policy</a>.
            </h6>
          </div> */}
        </div>
      </form>
    )
  }
}

export default reduxForm({ form: 'signUp' })(SignUpForm)
