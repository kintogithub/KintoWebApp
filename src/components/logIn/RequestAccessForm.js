import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { FieldValidation, Button, FormError } from '../forms'
import { email } from 'helpers/forms/validationFields'

class RequestAccessForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string,
    submitting: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    focusHere: PropTypes.bool
  }

  render() {
    const {
      handleSubmit,
      focusHere,
      pristine,
      submitting,
      hasRequestedAccess,
      error,
      requestEmail
    } = this.props
    const inputText = requestEmail
      ? requestEmail
      : 'You have already submitted a request'
    return (
      <form
        data-test="requestAccessForm"
        onSubmit={handleSubmit}
        className="request-access-form"
      >
        <h2>Request Beta Access</h2>
        <div className="line divider" />

        <div className={`inner ${hasRequestedAccess ? 'submitted' : ''}`}>
          <div className="mail-image" />
          <Field
            id="requestAccessEmail"
            type="text"
            name="requestAccessEmail"
            label="Email"
            placeholder={
              hasRequestedAccess ? inputText : 'Enter your email address'
            }
            component={FieldValidation}
            validate={email}
            className="input-lg"
            focusHere={focusHere}
            disabled={hasRequestedAccess}
          />
          <FormError error={error} />
          <Button
            type="submit"
            disabled={pristine || submitting || hasRequestedAccess}
            className="btn-lg"
          >
            Request Access
          </Button>
        </div>
      </form>
    )
  }
}

export default reduxForm({ form: 'requestAccessForm' })(RequestAccessForm)
