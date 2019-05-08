import React, { Component } from 'react'
import capitalize from 'lodash/capitalize'
import { CSSTransitionGroup } from 'react-transition-group'
import PropTypes from 'prop-types'
import UserCircle from '../../../ui/UserCircle'

class WorkspaceToolbarForm extends Component {
  static propTypes = {
    members: PropTypes.array.isRequired,
    admins: PropTypes.array.isRequired
  }

  addRemoveMember = (event, member) => {
    const fieldsMembers = this.props.fields.getAll()
    const index = fieldsMembers.findIndex(f => f === member.id)
    if (event.target.checked) {
      this.props.fields.push(member.id)
    } else {
      this.props.fields.remove(index)
    }
  }

  getDisplay = (name, email) => (name ? `${name} (${email})` : email)

  render() {
    const { members, admins } = this.props
    const noMembers = !members.length && !admins.length
    return (
      <ul className="unstyled-list">
        <CSSTransitionGroup
          transitionName="members"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          {noMembers && (
            <h4 className="center">No collaborators match your search query</h4>
          )}
          {admins ? (
            admins.map((admin, index) => {
              return (
                <li className="member-row" key={index}>
                  <UserCircle
                    name={admin.userName}
                    userType={admin.permission}
                  />
                  <input
                    type="text"
                    disabled
                    value={this.getDisplay(admin.userName, admin.email)}
                  />
                  <select
                    name="permission"
                    id="permission"
                    value={admin.permission}
                    disabled
                  >
                    <option value={admin.permission}>
                      {capitalize(admin.permission)}
                    </option>
                  </select>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked
                    disabled
                  />
                </li>
              )
            })
          ) : (
            <h4>No Workspace members match your query </h4>
          )}
          {members ? (
            members.map((member, index) => {
              return (
                <li className="member-row" key={index}>
                  <UserCircle name={member.userName} />

                  <input
                    type="text"
                    disabled
                    value={this.getDisplay(member.userName, member.email)}
                  />

                  <select defaultValue={member.permission}>
                    <option value={member.permission}>
                      {capitalize(member.permission)}
                    </option>
                  </select>

                  <input
                    type="checkbox"
                    className="checkbox"
                    defaultChecked={member.included}
                    onChange={e => this.addRemoveMember(e, member)}
                  />
                </li>
              )
            })
          ) : (
            <h4> No members match your search request </h4>
          )}
        </CSSTransitionGroup>
      </ul>
    )
  }
}

export default WorkspaceToolbarForm
