import React from 'react'
import PropTypes from 'prop-types'
import UserCircle from './UserCircle'

// TODO: write tests for this component
// TODO fix anchor and replace with buttons
/* eslint-disable jsx-a11y/anchor-is-valid */
const MemberListCircles = ({
  users,
  canEdit,
  editAction,
  numberOfItemsShown,
  size
}) => {
  // the edit circle will take a spot
  if (canEdit) {
    numberOfItemsShown = numberOfItemsShown - 1
  }
  let plusCount = null
  // because we are gonna show a +number icon
  if (users.length > numberOfItemsShown) {
    numberOfItemsShown = numberOfItemsShown - 1
    plusCount = users.length - numberOfItemsShown
  }
  return (
    <div className="member-list-circles">
      {users.slice(0, numberOfItemsShown).map((member, index) => (
        <UserCircle
          name={member.userName || member.email}
          userType={member.role || member.permission}
          size={size}
          key={index}
        />
      ))}
      {plusCount && <div className={`avatar ${size} plus`}>+{plusCount}</div>}
      {canEdit && (
        <a className={`avatar ${size} edit hide-text`} onClick={editAction}>
          edit
        </a>
      )}
    </div>
  )
}

MemberListCircles.propTypes = {
  users: PropTypes.array.isRequired,
  canEdit: PropTypes.bool.isRequired,
  editAction: PropTypes.func,
  numberOfItemsShown: PropTypes.number.isRequired
}

export default MemberListCircles
