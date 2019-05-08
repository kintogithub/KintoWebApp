import React from 'react'
import PropTypes from 'prop-types'
import { truncate } from 'helpers/stringHelper'

const BlockIcon = ({
  icon,
  name,
  defaultIcon,
  iconClass = 'icon',
  letterClass = 'large-letter'
}) => (
  <div className={iconClass}>
    <img src={`/images/${icon || defaultIcon}`} alt="kintoblock icon" />
    <h3 className={letterClass}>{truncate(name, 1)}</h3>
  </div>
)

BlockIcon.propTypes = {
  icon: PropTypes.string,
  name: PropTypes.string,
  defaultIcon: PropTypes.string,
  iconClass: PropTypes.string,
  letterClass: PropTypes.string
}

export default BlockIcon
