import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import { email as emailValidator } from 'helpers/forms/validators'
import { logIn } from 'actions/auth'
import LogInForm from 'components/logIn/LogInForm'

function mapStateToProps(state) {
  const formSelector = formValueSelector('logIn')
  const email = formSelector(state, 'userName')
  const isValid = !emailValidator(email)
  let forgotPasswordUrl = '/forgot-password'
  if (isValid && email) {
    forgotPasswordUrl += `?email=${email}`
  }
  return {
    forgotPasswordUrl
  }
}

export default connect(mapStateToProps, { onSubmit: logIn })(LogInForm)
