import { setWSInviteToken, clearWSInviteToken } from 'helpers/authHelper'
import { deploymentScrollMarkers } from 'constants/scrollMarkers'

export const FORM_SUBMITTED = 'FORM_SUBMITTED'
export const SELECT_ENVIRONMENT = 'SELECT_ENVIRONMENT'
export const SELECT_ENVIRONMENT_RELEASE = 'SELECT_ENVIRONMENT_RELEASE'
export const SELECT_DEPLOYMENT = 'SELECT_DEPLOYMENT'
export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION'
export const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION'
export const SHOW_LOADING_SPINNER = 'SHOW_LOADING_SPINNER'
export const HIDE_LOADING_SPINNER = 'HIDE_LOADING_SPINNER'
export const SHOW_ERROR_PAGE = 'SHOW_ERROR_PAGE'
export const UPDATE_LOADING_STATUS = 'UPDATE_LOADING_STATUS'
export const STORE_WORKSPACE_INVITE_TOKEN = 'STORE_WORKSPACE_INVITE_TOKEN'
export const CLEAR_WORKSPACE_INVITE = 'CLEAR_WORKSPACE_INVITE'

export const SHOW_ALERT_MODAL = 'SHOW_ALERT_MODAL'
export const HIDE_ALERT_MODAL = 'HIDE_ALERT_MODAL'
export const TOGGLE_CONGRATS_MODAL = 'TOGGLE_CONGRATS_MODAL'
export const SET_TOP_PAGE_ITEM = 'SET_TOP_PAGE_ITEM'
export const TOGGLE_CAN_SAVE = 'TOGGLE_CAN_SAVE'

export const showErrorPage = (errorType, message) => ({
  type: SHOW_ERROR_PAGE,
  errorType,
  message
})

export const formSubmitted = () => ({ type: FORM_SUBMITTED })

export const environmentSelect = id => ({ type: SELECT_ENVIRONMENT, id })

export const setCongratsModal = modal => ({
  type: TOGGLE_CONGRATS_MODAL,
  modal
})

export const hideCongratsModal = () => ({
  type: TOGGLE_CONGRATS_MODAL,
  modal: false
})

export const releaseVersionSelect = id => ({
  type: SELECT_ENVIRONMENT_RELEASE,
  id
})

export const deploymentSelect = id => ({
  type: SELECT_DEPLOYMENT,
  id
})

export const showNotification = (type, message) => ({
  type: SHOW_NOTIFICATION,
  notificationType: type,
  message
})

export const closeNotification = () => ({
  type: CLOSE_NOTIFICATION
})

export const showSpinner = message => {
  if (!message) {
    message = [
      'Hello World',
      'KintoHub',
      'Live, Love, Code',
      'Spawning KintoHub with KintoHub',
      'Chiseling the KintoBlocks',
      'Riding the KintoCloud',
      'Kinto all the things!',
      'Hello there. Ready to build amazing things?',
      'May the Commits be ever in your Git',
      'We Kinto ❤️ you.',
      "Take a breath, relax. This won't take a minute.",
      'Making microservices simple',
      'Herding and petting the KintoBlocks'
    ]
  }

  return {
    type: SHOW_LOADING_SPINNER,
    message
  }
}

export const hideSpinner = () => ({
  type: HIDE_LOADING_SPINNER
})

export const updateLoadingStatus = (statusType, statusValue) => ({
  type: UPDATE_LOADING_STATUS,
  statusType,
  statusValue
})

export const showAlert = message => ({
  type: SHOW_ALERT_MODAL,
  message
})

export const hideAlert = () => ({
  type: HIDE_ALERT_MODAL
})

export const storeWorkspaceInviteToken = token => {
  setWSInviteToken(token)
  return {
    type: STORE_WORKSPACE_INVITE_TOKEN,
    token
  }
}

export const clearWorkspaceInvite = () => {
  clearWSInviteToken()
  return {
    type: CLEAR_WORKSPACE_INVITE
  }
}

export const initializeTopPageItem = topItem => {
  return {
    type: SET_TOP_PAGE_ITEM,
    topItem: topItem ? topItem : deploymentScrollMarkers[0].id
  }
}

export const setTopPageItem = id => {
  return {
    type: SET_TOP_PAGE_ITEM,
    topItem: id
  }
}

export const toggleCanSave = canSave => {
  return {
    type: TOGGLE_CAN_SAVE,
    canSave
  }
}

// export const selectBranch
