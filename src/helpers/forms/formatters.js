export const lessThanFormat = max => (value, prevValue) => {
  if (!value) return null
  return parseInt(value, 10) <= max ? value : prevValue
}

export const allowNull = value => value || null

export const allowFalse = value => !!value
