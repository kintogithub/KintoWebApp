import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { workspaceRoles, MEMBER_ROLE, ADMIN_ROLE } from 'constants/permissions'
import { PENDING } from 'constants/inviteStates'
import { required, email as emailValidation } from 'helpers/forms/validators'
import HelpTooltipContainer from 'containers/dashboard/ui/HelpTooltipContainer'
import { FieldValidation } from '../../forms'
import UserCircle from '../../ui/UserCircle'
import SimpleModal from '../../dashboard/ui/SimpleModal'

class WorkspaceMembers extends Component {
  static propTypes = {
    updateMemberTutorialFieldStatus: PropTypes.func.isRequired,
    refreshActiveItemInTutorial: PropTypes.func.isRequired,
    isTutorial: PropTypes.bool.isRequired,
    fields: PropTypes.object.isRequired,
    workspaceName: PropTypes.string.isRequired,
    workspaceMembers: PropTypes.array.isRequired
  }

  state = {
    email: '',
    role: MEMBER_ROLE,
    error: null,
    isRevokeAccessConfirmationShown: false,
    modalMember: '',
    modalIndex: ''
  }

  addRow = () => {
    const { role, email } = this.state
    const { fields } = this.props
    let emailError = emailValidation(email)
    if (!emailError) {
      emailError = required(email)
    }
    if (emailError) {
      return this.setState({ error: emailError })
    }
    const emailExist = fields
      .getAll()
      .some(f => f.email.toUpperCase() === email.toUpperCase())
    if (emailExist) {
      return this.setState({ error: 'Email already exists for this workspace' })
    }
    fields.push({ role, email })
    if (this.props.isTutorial) {
      this.props.refreshActiveItemInTutorial()
    }
    this.setState({
      role: MEMBER_ROLE,
      email: '',
      error: null
    })
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      this.addRow()
    }
  }

  findMember = id => {
    if (!id) {
      return {}
    }
    return this.props.workspaceMembers.find(m => m.id === id) || {}
  }

  getDisplay = member =>
    member.userName ? `${member.userName} (${member.email})` : member.email

  getIconDisplay = member => member.userName || '?'

  updateRole = event => {
    this.setState({
      role: event.target.value
    })
  }

  updateEmail = event => {
    this.setState({
      email: event.target.value
    })
  }

  openRevokeAccessConfirmation = (index, member) => {
    if (member.inviteState) {
      this.openRevokeModal(member, index)
    } else {
      this.removeMemberAndUpdateTutorial(index)
    }
  }

  openRevokeModal = (member, index) => {
    this.setState(prevState => ({
      isRevokeAccessConfirmationShown: !prevState.isRevokeAccessConfirmationShown,
      modalIndex: index,
      modalMember: member.userName
    }))
  }

  closeRevokeAccessModal = () => {
    this.setState({
      isRevokeAccessConfirmationShown: false,
      modalIndex: '',
      modalMember: ''
    })
  }

  removeMemberAndUpdateTutorial = index => {
    this.props.fields.remove(index)
    if (this.props.isTutorial) {
      this.props.updateMemberTutorialFieldStatus()
      this.props.refreshActiveItemInTutorial()
    }
    this.closeRevokeAccessModal()
  }

  resendInvite = memberEmail => {
    this.props.resendInvite(memberEmail)
  }

  render() {
    const { fields, meta, workspaceName } = this.props
    const { error, email, role } = this.state
    const hasError = (meta.dirty || meta.submitFailed) && meta.error

    return (
      <div className="form-body members-list">
        <div className="top">
          <ul className="unstyled-list">
            {fields.map((field, index) => {
              const member = fields.get(index) || {}
              let isDisabled = member.role === ADMIN_ROLE
              if (member.inviteState === PENDING) {
                isDisabled = false
              }

              return (
                <li key={index} className="members-added">
                  <UserCircle
                    name={this.getIconDisplay(member)}
                    highlightIcon={
                      member.role === ADMIN_ROLE ? 'admin-star' : null
                    }
                  />
                  <div className="email-and-invite-status">
                    <input
                      placeholder="Enter workspace member email"
                      value={this.getDisplay(member)}
                      disabled="true"
                    />
                    {member.inviteState === PENDING ? (
                      <button
                        type="button"
                        className="invite-state btn"
                        onClick={() => this.resendInvite(member.email)}
                      >
                        <span className="resend">RESEND</span>
                        <span className="pending">PENDING</span>
                      </button>
                    ) : (
                      <div>
                        {member.inviteState && (
                          <div className="invite-state">
                            {member.inviteState}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <Field
                    name={`${field}.role`}
                    component={FieldValidation}
                    validate={required}
                    type="select"
                    disabled={isDisabled}
                  >
                    {workspaceRoles.map((level, i) => (
                      <option key={i} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </Field>

                  {isDisabled && member.inviteState !== PENDING ? (
                    <div className="remove void" />
                  ) : (
                    <div
                      className="remove"
                      onClick={() =>
                        this.openRevokeAccessConfirmation(index, member)
                      }
                    />
                  )}
                </li>
              )
            })}
          </ul>

          {hasError && <div className="error-message">{meta.error}</div>}
        </div>
        <div className="bottom">
          <div className="avatar-placeholder">
            <HelpTooltipContainer fieldName="members" tutorialPosition="left" />
          </div>
          <div>
            <input
              name="email"
              placeholder="Enter workspace member email"
              onChange={this.updateEmail}
              value={email}
              onKeyPress={this.handleKeyPress}
            />
          </div>
          <select
            name="role"
            type="select"
            onChange={this.updateRole}
            value={role}
            onKeyPress={this.handleKeyPress}
          >
            {workspaceRoles.map((role, i) => (
              <option key={i} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
          <div className="add" onClick={this.addRow} />
          {error && (
            <div className="error-message error-message-only error-email">
              {error}
            </div>
          )}
        </div>
        <SimpleModal
          options={{
            isOpen: this.state.isRevokeAccessConfirmationShown,
            className: 'revoke-access',
            text: {
              title: 'Revoke Access',
              message: `Are you sure you want to revoke ${
                this.state.modalMember
              }'s access to ${workspaceName}? They will not be notified of the change.`,
              confirmText: 'Revoke Access',
              confirmClass: 'dark',
              cancelText: 'Cancel',
              cancelClass: 'secondary'
            },
            onConfirm: () =>
              this.removeMemberAndUpdateTutorial(this.state.modalIndex),
            onClose: this.closeRevokeAccessModal
          }}
        />
      </div>
    )
  }
}

export default WorkspaceMembers
