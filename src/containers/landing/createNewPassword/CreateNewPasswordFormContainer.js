import { connect } from 'react-redux'
import CreateNewPasswordForm from '../../../components/logIn/CreateNewPasswordForm'
import { createNewPassword } from '../../../actions/auth'

function mapStateToProps(state, { token }) {
  return {
    token
  }
}

function mergeProps(stateProps, dispatchProps) {
  const token = stateProps.token
  return {
    ...stateProps,
    ...dispatchProps,
    onSubmit: data => dispatchProps.createNewPassword(data, token)
  }
}

export default connect(mapStateToProps, { createNewPassword }, mergeProps)(
  CreateNewPasswordForm
)
