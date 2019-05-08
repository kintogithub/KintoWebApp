import { connect } from 'react-redux'
import RequestAccessForm from 'components/logIn/RequestAccessForm'
import { requestAccess } from 'actions/auth'

function mapStateToProps(state) {
  const { hasRequestedAccess, requestEmail } = state.auth
  return {
    hasRequestedAccess,
    requestEmail
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: data => dispatch(requestAccess(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestAccessForm)
