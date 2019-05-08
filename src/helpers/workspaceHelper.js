import { getKey } from 'helpers/authHelper'

export const setWorkpaceIdInLocalStorage = workspaceId => {
  const key = getKey(`kintohub:workspaceId`)
  window.localStorage.setItem(key, workspaceId)
}

export const getWorkspaceIdFromLocalStorage = () => {
  return window.localStorage.getItem(getKey(`kintohub:workspaceId`))
}

export const setExitLocation = exitLocation => {
  const key = getKey(`kintohub:exitLocation`)
  window.localStorage.setItem(key, exitLocation)
}

export const getExitLocation = () => {
  const key = getKey(`kintohub:exitLocation`)
  const location = window.localStorage.getItem(key)
  window.localStorage.removeItem(key)
  return location
}

export const setTutorial = isTutorial => {
  const key = getKey(`kintohub:isTutorial`)
  const value = isTutorial ? 1 : 0
  window.localStorage.setItem(key, value)
}

export const getTutorial = () => {
  const key = getKey(`kintohub:isTutorial`)
  return !!+window.localStorage.getItem(key)
}
