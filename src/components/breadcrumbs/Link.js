import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const LinkComponent = ({ disabled, text, url }) => {
  return disabled || !url ? (
    <span className="disabled">{text}</span>
  ) : (
    <Link to={url}>{text}</Link>
  )
}

LinkComponent.propTypes = {
  disabled: PropTypes.bool,
  text: PropTypes.string,
  url: PropTypes.string
}

export default LinkComponent
