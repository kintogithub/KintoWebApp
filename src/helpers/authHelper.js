export const getKey = key => {
  let appendKey = process.env.REACT_APP_LOCAL_STORAGE_KEY_APPEND
  return appendKey ? `${key}-${appendKey}` : key
}

export const getTokenLocalStorage = () => {
  return window.localStorage.getItem(getKey('kintohub:auth'))
}

export const getWSInviteLocalStorage = () => {
  return window.localStorage.getItem(getKey('kintohub:workspaceInviteToken'))
}

export const isUserLoggedInLocalStorage = () => {
  return !!window.localStorage.getItem(getKey('kintohub:auth:isloggedin'))
}

export const setToken = token => {
  const key = getKey('kintohub:auth')
  if (token) {
    window.localStorage.setItem(key, token)
  } else {
    window.localStorage.removeItem(key)
  }
}

export const setWSInviteToken = token => {
  window.localStorage.setItem(getKey('kintohub:workspaceInviteToken'), token)
}

export const clearWSInviteToken = () => {
  window.localStorage.removeItem(getKey('kintohub:workspaceInviteToken'))
}

export const setIsLoggedIn = isLoggedIn => {
  const key = getKey('kintohub:auth:isloggedin')
  if (isLoggedIn) {
    window.localStorage.setItem(key, true)
  } else {
    window.localStorage.removeItem(key)
  }
}

export const getAppCredentials = () => {
  const { REACT_APP_AUTH_APP_ID, REACT_APP_AUTH_APP_SECRET } = process.env
  return {
    clientId: REACT_APP_AUTH_APP_ID,
    clientSecret: REACT_APP_AUTH_APP_SECRET
  }
}

export const setConfirmAccessRequested = () => {
  const key = getKey('kintohub:auth:hasrequestedaccess')
  window.localStorage.setItem(key, true)
}

export const getRequestAccessStatus = () => {
  return window.localStorage.getItem(getKey('kintohub:auth:hasrequestedaccess'))
}
