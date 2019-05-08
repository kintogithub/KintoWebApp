import { connect } from 'react-redux'
import { WORKSPACE_MEMBERS } from 'constants/limitations'
import { ADMIN_ROLE } from 'constants/permissions'
import {
  updateTutorialFieldStatus,
  refreshActiveItemInTutorial
} from 'actions/tutorial'
import { createWorkspace, updateWorkspace } from 'actions/workspaces'
import WorkspaceForm from 'components/workspaces/WorkspaceForm'

function mapStateToProps(state, { workspace, isCreate }) {
  const { currentUser } = state
  const limitations = currentUser.limitations || {}
  workspace = workspace || {}
  let workspaceMembers
  if (isCreate) {
    workspaceMembers = [
      {
        id: currentUser.id,
        email: currentUser.email,
        userName: currentUser.userName,
        role: ADMIN_ROLE
      }
    ]
  } else {
    workspaceMembers = workspace.members
      ? workspace.members.map(member => {
          if (member.id === currentUser.id) {
            member = { ...member, inviteState: 'YOU' }
          }
          return member
        })
      : []
  }

  return {
    currentUserId: currentUser.id,
    workspace,
    workspaceMembers,
    isCreate,
    isTutorial: state.tutorial.isTutorial,
    membersLimit: limitations[WORKSPACE_MEMBERS],
    initialValues: {
      members: workspaceMembers,
      name: workspace.name
    }
  }
}

function mapDispatchToProps(dispatch, { isCreate, workspace }) {
  return {
    refreshActiveItemInTutorial: () => dispatch(refreshActiveItemInTutorial()),
    updateMemberTutorialFieldStatus: () =>
      dispatch(updateTutorialFieldStatus('WorkspaceFormCreate', 'members')),
    onSubmit: data => {
      if (isCreate) {
        return dispatch(createWorkspace(data))
      } else {
        return dispatch(updateWorkspace(workspace.workspaceId, data))
      }
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkspaceForm)
