import axios from 'axios'
import { push } from 'react-router-redux'
import { AUTH } from 'constants/backendMicroservices'
import { SIGNUP_WELCOME } from 'constants/congratsModals'
import { INFO } from 'constants/notificationTypes'
import {
  setToken,
  setIsLoggedIn,
  getAppCredentials,
  setConfirmAccessRequested
} from 'helpers/authHelper'
import { getServerUrl } from 'helpers/urlHelper'
import {
  setCongratsModal,
  storeWorkspaceInviteToken,
  showNotification
} from './pageOptions'
import { trackLogIn, trackSignUp } from 'helpers/mixpanelHelper'

export const UPDATE_TOKEN = 'UPDATE_TOKEN'
export const LOGOUT = 'LOGOUT'
export const LOGIN = 'LOGIN'
export const CONFIRM_ACCESS_REQUESTED = 'CONFIRM_ACCESS_REQUESTED'

export const tokenUpdate = token => {
  setToken(token)
  return { type: UPDATE_TOKEN, token }
}

export const login = () => {
  setIsLoggedIn(true)
  trackLogIn()
  return { type: LOGIN }
}

export const logout = () => {
  setToken(null)
  setIsLoggedIn(null)
  return { type: LOGOUT }
}

export const confirmAccessRequested = email => {
  return {
    type: CONFIRM_ACCESS_REQUESTED,
    email
  }
}

export const forgotPassword = (data, onSuccess) => dispatch => {
  return axios
    .post(getServerUrl(AUTH, '/requestResetPassword'), {
      userName: data.forgotPassword
    })
    .then(onSuccess)
}

export const createNewPassword = (data, token) => dispatch => {
  return axios
    .put(getServerUrl(AUTH, '/resetPassword'), {
      token: token,
      newPassword: data.createNewPassword
    })
    .then(() => {
      dispatch(push('/log-in'))
    })
}

export const activateAccount = token => () => {
  return axios.put(getServerUrl(AUTH, '/validate'), { token })
}

export const signUp = data => dispatch => {
  return axios.post(getServerUrl(AUTH, '/register'), data).then(() => {
    trackSignUp(data.email)
    dispatch(login())
    dispatch(setCongratsModal(SIGNUP_WELCOME))
    dispatch(push('/app'))
  })
}

export const logIn = data => (dispatch, getState) => {
  const { workspaceInviteToken } = getState().pageOptions
  if (workspaceInviteToken) {
    dispatch(storeWorkspaceInviteToken(workspaceInviteToken))
  }

  return pureLogin(data, dispatch).then(null, async r => {
    //TODO: change the backend to send a flag instead of an error message
    if (
      r.response &&
      r.response.data &&
      r.response.data.error === 'Cannot login when already logged in!'
    ) {
      await dispatch(authApp())
      return pureLogin(data, dispatch)
    }
    return Promise.reject(r)
  })
}

export const authApp = () => dispatch => {
  return axios
    .post(getServerUrl(null, '/authorize'), getAppCredentials())
    .then(response => {
      const token = response.data.token
      dispatch(tokenUpdate(token))
    })
}

const pureLogin = (data, dispatch) => {
  return axios.post(getServerUrl(AUTH, '/login'), data).then(() => {
    dispatch(login())
    dispatch(push('/app'))
  })
}

export const resendVerificationEmail = () => (dispatch, getState) => {
  const { email, userName } = getState().currentUser
  return axios
    .put(getServerUrl(AUTH, '/resendEmail'), { email, userName })
    .then(response => {
      const message = `A verification email has been sent, please check the inbox for ${email}`
      dispatch(showNotification(INFO, message))
    })
}

export const requestAccess = data => dispatch => {
  const { requestAccessEmail } = data
  return axios
    .post(getServerUrl(AUTH, '/demo/request'), data)
    .then(response => {
      dispatch(confirmAccessRequested(response.data.requestAccessEmail))
      setConfirmAccessRequested(requestAccessEmail)
    })
}
