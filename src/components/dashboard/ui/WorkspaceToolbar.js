import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { Toggle } from '../../forms'
import MemberListCircles from '../../ui/MemberListCircles'
import UserCircle from '../../ui/UserCircle'
import ComplexModal from '../../dashboard/ui/ComplexModal'
import WorkspaceToolbarModal from './workspaceToolbar/WorkspaceToolbarModal'
import { getPageUrl } from 'helpers/urlHelper'
import { pages } from 'constants/pages'

class WorkspaceToolbar extends Component {
  static propTypes = {
    currentUserInfo: PropTypes.object.isRequired,
    admins: PropTypes.array.isRequired,
    members: PropTypes.array.isRequired,
    allMembers: PropTypes.array.isRequired,
    isFormPublic: PropTypes.bool,
    canCurrentUserManage: PropTypes.bool.isRequired,
    selectedWorkspaceId: PropTypes.string,
    workspace: PropTypes.object,
    isDeployment: PropTypes.bool.isRequired,
    isCreate: PropTypes.bool.isRequired,
    kintoItem: PropTypes.object.isRequired
  }

  state = {
    isModalOpen: false
  }

  openWorkspaceModal = () => {
    this.setState({ isModalOpen: true })
  }

  onModalClose = () => {
    this.setState({ isModalOpen: false })
  }

  goToEditWorkspace = () => {
    this.props.push(
      getPageUrl(pages.workspaceEdit, {
        workspaceId: this.props.selectedWorkspaceId
      })
    )
  }

  render() {
    const {
      currentUserInfo,
      admins,
      members,
      allMembers,
      isFormPublic,
      canCurrentUserManage,
      workspace,
      isDeployment,
      isCreate,
      kintoItem
    } = this.props
    return (
      <div className="workspace-toolbar">
        <div className="user-section">
          <UserCircle
            name={currentUserInfo.userName}
            userType={currentUserInfo.permission}
          />
          <div className="dot small" />
          <MemberListCircles
            users={allMembers}
            editAction={this.openWorkspaceModal}
            canEdit={!isFormPublic && canCurrentUserManage}
            numberOfItemsShown={6}
            size="small"
          />
        </div>

        {canCurrentUserManage && (
          <div className="workspace-toggles">
            <div className="toggle public">
              <Field
                name="isPublic"
                id="public"
                component={Toggle}
                label={workspace.name}
                subLabel="All members can view & edit"
                className="reverse"
              />
            </div>
            {!isDeployment &&
              !isCreate && (
                <div className="toggle shared">
                  <Field
                    name="isShared"
                    id="isShared"
                    component={Toggle}
                    label="Public KintoBlock"
                    subLabel="Cannot be unshared"
                    help="Choose who can find and use your KintoBlock. They will be able to use your KintoBlock to build applications or other KintoBlocks."
                    className="reverse sublabel-disabled"
                    disabled={!!kintoItem.isShared}
                  />
                </div>
              )}
          </div>
        )}

        <ComplexModal
          className="workspace-modal"
          component={WorkspaceToolbarModal}
          isOpen={this.state.isModalOpen}
          onClose={this.onModalClose}
          actions={{ goToEdit: this.goToEditWorkspace }}
          data={{
            admins,
            members
          }}
        />
      </div>
    )
  }
}

export default WorkspaceToolbar
