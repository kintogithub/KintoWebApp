import toArray from 'lodash/toArray'

export const truncate = (text, numberOfChars = 2) => {
  // this method was changed to use toArray for Emoji support.
  const textArray = text ? toArray(text) : []
  return textArray.length ? textArray.slice(0, numberOfChars) : ''
}

export function format(str, ...args) {
  return str.replace(/{(\d+)}/g, function(match, number) {
    return typeof args[number] !== 'undefined' ? args[number] : match
  })
}

// secondsToMins(8)       //   0:08
// secondsToMins(3661)    //  61:01
// secondsToMins('7425')  // 123:45
export function secondsToMins(s) {
  return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s
}

export function secondsToHumanMins(s) {
  if (s <= 60) {
    return `${s}s`
  }
  const min = Math.floor(s / 60)
  return `${min}m`
}

export const replaceCharactersForId = string => {
  const edited = string ? string.replace(/\./g, '').replace('~', '_') : ''
  return edited
}

export const replaceCharactersForDisplay = string => {
  const edited = string ? string.replace('~', '/') : ''
  return edited
}
