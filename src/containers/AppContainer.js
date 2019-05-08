import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchWorkspaces } from '../actions/workspaces'
import { fetchCurrentUser } from '../actions/currentUser'
import App from '../components/App'

function mapStateToProps(state) {
  const { auth, currentUser, workspaces, pageOptions } = state
  return {
    hasInviteToken: !!pageOptions.workspaceInviteToken,
    isLoggedIn: auth.isLoggedIn,
    token: auth.token,
    blockNavigate: pageOptions.canSave,
    isLoaded: workspaces.isLoaded && currentUser.isBasicLoaded,
    firstWorkspaceId: workspaces.allIds[0],
    isNotification: pageOptions.notification
      ? pageOptions.notification.isShown
      : false
  }
}

function mapDispatchToProps(dispatch) {
  return {
    goToLogin: () => dispatch(push('/log-in')),
    fetchWorkspaces: () =>
      dispatch(fetchWorkspaces({ isInitialRequest: true })), // used to update a different loading status
    fetchCurrentUser: () =>
      dispatch(fetchCurrentUser({ isInitialRequest: true }))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
