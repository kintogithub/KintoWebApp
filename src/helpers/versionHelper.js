import isNumber from 'lodash/isNumber'
import isObject from 'lodash/isObject'
import moment from 'moment'
import { TAG } from 'constants/version'
import { timeDayMonthYearShort } from 'constants/dateFormat'

export const normalizeVersionObject = v => ({
  major: v.major || 0,
  minor: v.minor || 0,
  revision: v.revision || 0,
  build: v.build || 0
})

export const getVersionAsText = v => {
  if (isObject(v)) {
    v = normalizeVersionObject(v)
  }
  if (!v || !isNumber(v.major) || !isNumber(v.minor) || !isNumber(v.revision)) {
    return undefined
  }
  return `${v.major || 0}.${v.minor || 0}.${v.revision || 0}`
}

export const getVersionType = v => (v && v.type ? v.type.toLowerCase() : null)

export const asTextList = (versions = []) => {
  return versions.map(v => getVersionAsText(v))
}

export const getVersionStateClassName = version => {
  if (!version || !version.state) return ''
  switch (version.state) {
    case 'PENDING':
      return 'orange'
    case 'PUBLISHED':
      return 'green'
    case 'DRAFT':
      return 'purple'
    default:
      throw new Error('unknown version state')
  }
}

export const textToObject = v => {
  const regex = /(\d+)\.(\d+)\.(\d+)/
  const match = regex.exec(v)
  if (!match) return null
  return {
    major: parseInt(match[1], 10),
    minor: parseInt(match[2], 10),
    revision: parseInt(match[3], 10)
  }
}

export const isBranchVersionEqual = (a, b, matchNameOnly) => {
  if (!a || !b) {
    return false
  }
  // if match only can pass strings
  if (matchNameOnly) {
    a = a.name ? a.name : a
    b = b.name ? b.name : b
    return a === b
  }

  return a.type.toUpperCase() === b.type.toUpperCase() && a.name === b.name
}

// backend replaces / with ~ in the name, we need to replace it back only when displaying
export const getVersionName = v => (v ? v.replace('~', '/') : '')

export const getVersionInfo = (kbId, version, kintoBlockBuilds) => {
  const buildInfo =
    kintoBlockBuilds[kbId] && kintoBlockBuilds[kbId][version.name]
  // TODO: temp untill data is migratedd old data for braches were saved like tags
  // remove the "or branch condition" after two weeks of our next production release
  if (version.type === TAG || !buildInfo) {
    return {
      buildId: version.activeBuildId,
      note: version.note,
      lastUpdated: version.lastUpdated
        ? moment(version.lastUpdated).format(timeDayMonthYearShort)
        : ''
    }
  }
  // TODO: this will never happen until the condition above is removed '|| !buildInfo'
  if (!buildInfo) {
    return {}
  }
  return {
    buildId: buildInfo.buildId,
    note: buildInfo.commitMessage,
    lastUpdated: moment(buildInfo.commitDate).format(timeDayMonthYearShort)
  }
}
