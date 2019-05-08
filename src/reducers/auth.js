import {
  UPDATE_TOKEN,
  LOGOUT,
  LOGIN,
  CONFIRM_ACCESS_REQUESTED
} from 'actions/auth'

export default function pageOptions(state = {}, action) {
  switch (action.type) {
    case UPDATE_TOKEN:
      return {
        token: action.token
      }
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true
      }
    case LOGOUT:
      return {}
    case CONFIRM_ACCESS_REQUESTED:
      return {
        ...state,
        hasRequestedAccess: true,
        requestEmail: action.email
      }
    default:
      return state
  }
}
