import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { activateAccount } from '../actions/auth'
import { showNotification } from '../actions/pageOptions'
import { INFO, ERROR } from '../constants/notificationTypes'
import AccountActivate from '../components/AccountActivate'

function mapStateToProps(state, { match }) {
  const { isLoggedIn } = state.auth
  const { token } = match.params
  return {
    isLoggedIn,
    token
  }
}

function mergeProps(stateProps, dispatchProps) {
  const notificationMessage = stateProps.isLoggedIn
    ? 'Account activated. You can now create and deploy custom KintoBlocks.'
    : 'Account activated. Please log in again.'

  return {
    ...stateProps,
    ...dispatchProps,
    activateAccount: () => {
      dispatchProps.activateAccount(stateProps.token).then(
        () => {
          dispatchProps.showNotification(INFO, notificationMessage)
          if (stateProps.isLoggedIn) {
            dispatchProps.push('/app')
          } else {
            dispatchProps.push('/log-in')
          }
        },
        () => {
          dispatchProps.showNotification(ERROR, 'Invalid Token')
          dispatchProps.push('/log-in')
        }
      )
    }
  }
}

export default connect(
  mapStateToProps,
  { activateAccount, showNotification, push },
  mergeProps
)(AccountActivate)
