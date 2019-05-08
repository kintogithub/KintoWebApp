import mergeWith from 'lodash/mergeWith'
import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'

function mergeStrategyEnchanced(options = {}) {
  return (objValue, srcValue) => {
    // we don't want to merge version objects
    //TODO: we need to find a better way to handle obj merging with different versions

    const isSrcVersion =
      isObject(srcValue) &&
      (srcValue.major || srcValue.minor || srcValue.revision)
    const isObjVersion =
      isObject(objValue) &&
      (objValue.major || objValue.minor || objValue.revision)
    if (isSrcVersion || isObjVersion) {
      // if there is already a version saved and new one is low priority return the old one
      if (options.lowPriority === 'version' && objValue) {
        return objValue
      } else {
        return srcValue
      }
    }
    if (isArray(objValue)) {
      // if there is no id don't merge arrays just return the updated one
      if (srcValue.every(s => !s.id)) {
        return srcValue
      }
      return srcValue.map(src => {
        return {
          ...objValue.find(o => o.id),
          ...src
        }
      })
    }
  }
}

export const hasValues = obj => Object.keys(obj).some(k => obj[k])
export const merge = (orig, data, options) => {
  return mergeWith({}, orig, data, mergeStrategyEnchanced(options))
}
