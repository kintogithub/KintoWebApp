import {
  getTokenLocalStorage,
  isUserLoggedInLocalStorage,
  getWSInviteLocalStorage,
  getRequestAccessStatus
} from 'helpers/authHelper'
export default () => ({
  auth: {
    token: getTokenLocalStorage(),
    isLoggedIn: isUserLoggedInLocalStorage(),
    hasRequestedAccess: getRequestAccessStatus()
  },
  pageOptions: {
    workspaceInviteToken: getWSInviteLocalStorage(),
    loadingStatus: {},
    alertModal: {}
  }
})
