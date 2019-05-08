export const number = value => {
  if (value === undefined) {
    return undefined
  }
  const result = parseInt(value, 10)
  if (isNaN(result)) {
    return null
  }
  return result
}

export const boolean = val => val === 'true'
