import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import qs from 'query-string'
import LogIn from '../components/LogIn'

function mapStateToProps(state, { match, location }) {
  const queryData = qs.parse(location.search)
  const showSignup = process.env.REACT_APP_SHOW_SIGNUP

  return {
    showSignup,
    queryData,
    isLoggedIn: state.auth.isLoggedIn
  }
}

export default connect(
  mapStateToProps,
  { push }
)(LogIn)
