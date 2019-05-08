import flatMap from 'lodash/flatMap'

const defaultCompare = (item, field, filter) => {
  if (!filter) {
    return true
  }
  return item[field].toUpperCase().includes(filter.toUpperCase())
}

/**
 * generic function for filtering parent with nested children array
 * this will return the parents that didn't match if any of the children matches
 * accepts a comparer function or a field key and the filter value
 * @param {array} array the collection needed to be filtered
 * @param {string} childrenKey the key for the children collection on each parent
 * @param {string} fieldKeyOrComparer the key that needs to be filtered or you can pass a comparer function
 * @param {string} filter the filter text only passed if you are not using a comparer function
 * @return {array} filtered array
 */
export const filterArrayAndChildren = (
  array = [],
  childrenKey,
  fieldKeyOrComparer,
  filter
) => {
  const hasComparer = typeof fieldKeyOrComparer === 'function'
  let compareFn = fieldKeyOrComparer
  let field = null
  if (!hasComparer) {
    compareFn = defaultCompare
    field = fieldKeyOrComparer
  }

  const newArray = []
  array.forEach(parent => {
    const children = filterArray(
      parent[childrenKey],
      fieldKeyOrComparer,
      filter
    )
    // if parent and children are empty, then return
    if (!compareFn(parent, field, filter) && !children.length) {
      return
    }
    newArray.push({
      ...parent,
      [parent[childrenKey]]: children
    })
  })
  return newArray
}

/**
 * generic function for filtering arrays
 * accepts a comparer function or a field key and the filter value
 * @param {array} array the collection needed to be filtered
 * @param {string} keyOrComparer the key that needs to be filtered or if you want a comparer function, you pass it here
 * @param {string} filter the filter text only passed if you are not using a comparer function
 * @return {array} filtered array
 */
export const filterArray = (array = [], keyOrComparer, filter) => {
  const hasComparer = typeof keyOrComparer === 'function'
  let compareFn = keyOrComparer
  let field = null
  if (!hasComparer) {
    compareFn = defaultCompare
    field = keyOrComparer
  }

  return array.filter(i => {
    return compareFn(i, field, filter)
  })
}

export const flattenNestedToIds = (array = [], childrenKey, idKey) => {
  return flatMap(array, item => {
    const children = item[childrenKey] || []
    let childrenIds = children.map(c => c[idKey])
    childrenIds.unshift(item[idKey])
    return childrenIds
  })
}
