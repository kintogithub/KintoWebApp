import { connect } from 'react-redux'
import Auth from '../components/Auth'
import { logout, authApp } from '../actions/auth'
import { showErrorPage } from '../actions/pageOptions'

function mapStateToProps(state) {
  return {
    token: state.auth.token
  }
}

export default connect(mapStateToProps, {
  logout,
  authApp,
  showErrorPage
})(Auth)
