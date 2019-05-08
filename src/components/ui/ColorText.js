import React from 'react'
import PropTypes from 'prop-types'

// text must be an array in the following format;
// ex: `['hello', { text: 'world', color: 'orange' }, '!']
const ColorText = ({ text }) => {
  if (!text) {
    text = []
  }
  const coloredText = text.reduce((acc, val, i) => {
    if (typeof val === 'string') {
      return [...acc, val]
    }
    validateColor(val.color)
    return [
      ...acc,
      <span key={i} className={`${val.color} text-color code`}>
        {val.text}
      </span>
    ]
  }, [])

  return coloredText
}

ColorText.propTypes = {
  text: PropTypes.array
}

function validateColor(color) {
  const isValid = color === 'blue' || color === 'orange' || color === 'green'
  if (!isValid) {
    throw new Error(`<ColorText> unrecognized color '${color}'`)
  }
  return isValid
}

export default ColorText
