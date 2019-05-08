import {
  RECEIVE_CURRENT_USER_INFO,
  INITIALIZE_PROGRESS_INFORMATION,
  UPDATE_PROGRESS_INFORMATION
} from '../actions/currentUser'
import { RECEIVE_WORKSPACE } from '../actions/workspaces'

export default function currentUser(state = {}, action) {
  switch (action.type) {
    default:
      return state
    case RECEIVE_CURRENT_USER_INFO:
      return action.data
    case RECEIVE_WORKSPACE:
      return {
        ...state,
        limitations: action.data.limitations
      }
    case INITIALIZE_PROGRESS_INFORMATION:
      return {
        ...state,
        onboarding: { ...action.data }
      }
    case UPDATE_PROGRESS_INFORMATION:
      return {
        ...state,
        onboarding: { ...state.onboarding, [action.item]: true }
      }
  }
}
