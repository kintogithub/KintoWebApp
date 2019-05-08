import { connect } from 'react-redux'
import ForgotPasswordForm from '../../../components/logIn/ForgotPasswordForm'
import { forgotPassword } from '../../../actions/auth'

function mapStateToProps(state, { email }) {
  return {
    initialValues: {
      forgotPassword: email
    }
  }
}

function mapDispatchToProps(dispatch, { onSuccess }) {
  return {
    onSubmit: data => dispatch(forgotPassword(data, onSuccess))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordForm)
