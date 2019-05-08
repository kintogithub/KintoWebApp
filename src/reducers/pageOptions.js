import { actionTypes } from 'redux-form'
import { LOCATION_CHANGE } from 'react-router-redux'
import { getActivePageKey } from 'helpers/pageHelper'
import forms from 'constants/forms'
import {
  FORM_SUBMITTED,
  SELECT_ENVIRONMENT,
  SELECT_ENVIRONMENT_RELEASE,
  SELECT_DEPLOYMENT,
  CLOSE_NOTIFICATION,
  SHOW_NOTIFICATION,
  SHOW_LOADING_SPINNER,
  HIDE_LOADING_SPINNER,
  SHOW_ERROR_PAGE,
  UPDATE_LOADING_STATUS,
  SHOW_ALERT_MODAL,
  HIDE_ALERT_MODAL,
  TOGGLE_CONGRATS_MODAL,
  STORE_WORKSPACE_INVITE_TOKEN,
  CLEAR_WORKSPACE_INVITE,
  SET_TOP_PAGE_ITEM,
  TOGGLE_CAN_SAVE
} from '../actions/pageOptions'
import {
  RECEIVE_DEPLOYMENT,
  RECEIVE_DEPLOYMENT_ENVIRONMENTS
} from 'actions/deployments'
import {
  RECEIVE_DEPLOYMENT_REQUEST_LOGS,
  RECEIVE_DEPLOYMENT_CONSOLE_LOGS
} from 'actions/deploymentLogs'
import {
  KINTO_BLOCK_DOCUMENTATION_RECEIVE,
  KINTO_BLOCK_FOR_DOCUMENTATION_RECEIVE
} from 'actions/documentation'
import { RECEIVE_KINTO_BLOCK } from 'actions/kintoBlocks'

const defaultState = {
  loadingStatus: {},
  alertModal: {}
}

export default function pageOptions(state = defaultState, action) {
  switch (action.type) {
    case RECEIVE_DEPLOYMENT:
    case RECEIVE_DEPLOYMENT_ENVIRONMENTS:
      return {
        ...state,
        selectedDeploymentId: action.id
      }
    case KINTO_BLOCK_FOR_DOCUMENTATION_RECEIVE:
      if (action.depId) {
        return {
          ...state,
          selectedKintoBlockId: action.id,
          selectedDeploymentId: action.depId,
          selectedEnvironmentId: action.envId
        }
      } else {
        return {
          ...state,
          selectedKintoBlockId: action.id
        }
      }
    case RECEIVE_KINTO_BLOCK:
    case KINTO_BLOCK_DOCUMENTATION_RECEIVE:
      return {
        ...state,
        selectedKintoBlockId: action.id
      }
    case SELECT_ENVIRONMENT:
      return {
        ...state,
        selectedEnvironmentId: action.id
      }
    case SELECT_ENVIRONMENT_RELEASE:
      return {
        ...state,
        selectedReleaseVersion: action.id
      }
    case SELECT_DEPLOYMENT:
      return {
        ...state,
        selectedDeploymentId: action.id
      }
    case RECEIVE_DEPLOYMENT_REQUEST_LOGS:
      return {
        ...state,
        selectedDeploymentId: action.id,
        selectedEnvironmentId: action.envId,
        selectedReleaseVersion: action.appVersion
      }
    case RECEIVE_DEPLOYMENT_CONSOLE_LOGS:
      return {
        ...state,
        selectedDeploymentId: action.id,
        selectedEnvironmentId: action.envId,
        selectedReleaseVersion: action.appVersion
      }
    case actionTypes.CHANGE:
    case actionTypes.ARRAY_REMOVE:
    case actionTypes.ARRAY_PUSH:
      if (
        forms[state.activePage] &&
        forms[state.activePage].formName === action.meta.form
      ) {
        return {
          ...state,
          canSave: true,
          scrollToError: false
        }
      }
      return state
    case actionTypes.SET_SUBMIT_FAILED:
      if (
        forms[state.activePage] &&
        forms[state.activePage].formName === action.meta.form
      ) {
        return {
          ...state,
          scrollToError: true
        }
      }
      return state
    case LOCATION_CHANGE:
      const url = action.payload.pathname
      const isDashboard = !url.startsWith('/app/market')
      const activePage = getActivePageKey(url, isDashboard)
      return {
        ...state,
        canSave: false,
        scrollToError: false,
        activePage,
        isDashboard
      }
    case FORM_SUBMITTED:
      return {
        ...state,
        canSave: false
      }
    case SHOW_NOTIFICATION:
      return {
        ...state,
        notification: {
          type: action.notificationType,
          message: action.message,
          isShown: true
        }
      }
    case CLOSE_NOTIFICATION:
      return {
        ...state,
        notification: {
          isShown: false
        }
      }
    case SHOW_LOADING_SPINNER:
      return {
        ...state,
        loadingSpinner: {
          isShown: true,
          message: action.message
        }
      }
    case HIDE_LOADING_SPINNER:
      return {
        ...state,
        loadingSpinner: {
          isShown: false
        }
      }
    case SHOW_ERROR_PAGE:
      return {
        ...state,
        errorPageType: action.errorType,
        errorPageMessage: action.message
      }
    case UPDATE_LOADING_STATUS:
      return {
        ...state,
        loadingStatus: {
          ...state.loadingStatus,
          [action.statusType]: action.statusValue
        }
      }
    case SHOW_ALERT_MODAL:
      return {
        ...state,
        alertModal: {
          isShown: true,
          message: action.message
        }
      }
    case HIDE_ALERT_MODAL:
      return {
        ...state,
        alertModal: { isShown: false }
      }
    case TOGGLE_CONGRATS_MODAL:
      return {
        ...state,
        congratsModal: action.modal
      }
    case STORE_WORKSPACE_INVITE_TOKEN:
      return {
        ...state,
        workspaceInviteToken: action.token
      }
    case CLEAR_WORKSPACE_INVITE:
      return {
        ...state,
        workspaceInviteToken: null
      }
    case SET_TOP_PAGE_ITEM:
      return {
        ...state,
        topPageItem: action.topItem
      }
    case TOGGLE_CAN_SAVE:
      return {
        ...state,
        canSave: action.canSave
      }
    default:
      return state
  }
}
