import axios from 'axios'
import { getServerUrl } from 'helpers/urlHelper'
import {
  getProgressFromStorage,
  completedOnboarding,
  initialiseProgressInStorage
} from 'helpers/onboardingHelper'
import { identifyLogIn } from 'helpers/mixpanelHelper'
import { AUTH } from 'constants/backendMicroservices'
import { REFRESH_PAGE } from 'constants/errorPageTypes'
import { showErrorPage } from './pageOptions'

export const RECEIVE_CURRENT_USER_INFO = 'RECEIVE_CURRENT_USER_INFO'
export const INITIALIZE_PROGRESS_INFORMATION = 'INITIALIZE_PROGRESS_INFORMATION'
export const UPDATE_PROGRESS_INFORMATION = 'UPDATE_PROGRESS_INFORMATION'

export const currentUserReceiveInfo = data => ({
  type: RECEIVE_CURRENT_USER_INFO,
  data
})

export const completeAction = (item, id) => {
  completedOnboarding(item, id)
  return { type: UPDATE_PROGRESS_INFORMATION, item }
}

export const getProgressInformation = id => {
  return {
    type: INITIALIZE_PROGRESS_INFORMATION,
    data: getProgressFromStorage(id)
  }
}

export const fetchCurrentUser = options => dispatch => {
  return axios.get(getServerUrl(AUTH, '/me'), options).then(
    response => {
      const { email, id, userName } = response.data
      identifyLogIn(email, id, userName)
      dispatch(currentUserReceiveInfo(response.data))
      initialiseProgressInStorage(id)
      dispatch(getProgressInformation(id))
    },
    () => {
      dispatch(showErrorPage(REFRESH_PAGE))
    }
  )
}
