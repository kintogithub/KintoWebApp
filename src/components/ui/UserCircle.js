import React from 'react'
import PropTypes from 'prop-types'
import { truncate } from 'helpers/stringHelper'

import {
  ADMIN_ROLE,
  ADMIN_PERMISSION,
  OWNER_PERMISSION
} from '../../constants/permissions'

function getIconClassName(role) {
  if (role === ADMIN_ROLE || role === ADMIN_PERMISSION) {
    return 'admin-star'
  }
  if (role === OWNER_PERMISSION) {
    return 'owner'
  }
  return null
}

const UserCircle = ({ name, userType, size }) => {
  const iconClass = getIconClassName(userType)
  return (
    <div className={`avatar text ${size} uppercase`}>
      {iconClass && <div className={`highlight ${iconClass}`} />}
      {truncate(name, 2)}
    </div>
  )
}

UserCircle.propTypes = {
  name: PropTypes.string.isRequired,
  userType: PropTypes.string,
  size: PropTypes.string
}

export default UserCircle
