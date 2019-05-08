import { steps } from '../constants/onboarding.js'

export const initialiseProgressInStorage = id => {
  if (localStorage.getItem(`kintohub:progress:details-${id}`) === null) {
    window.localStorage.setItem(
      `kintohub:progress:details-${id}`,
      JSON.stringify({
        kintoBlocks: false,
        deployments: false,
        workspaces: false,
        documentation: false
      })
    )
  }
}

export const completedOnboarding = (item, id) => {
  const oldLocalStorage = JSON.parse(
    window.localStorage.getItem(`kintohub:progress:details-${id}`)
  )
  const newLocalStorage = { ...oldLocalStorage, [item]: true }

  window.localStorage.setItem(
    `kintohub:progress:details-${id}`,
    JSON.stringify(newLocalStorage)
  )
}

export const getProgressFromStorage = id => {
  return JSON.parse(
    window.localStorage.getItem(`kintohub:progress:details-${id}`)
  )
}

export const calculatePercentageProgress = data => {
  let arrPassed = []
  steps.forEach(s => {
    data[s] === true && arrPassed.push(1)
  })

  return arrPassed.length
    ? (arrPassed.reduce((a, v) => a + v) / steps.length) * 100
    : 0
}
