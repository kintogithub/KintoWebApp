import { createSelector } from 'reselect'
import { ADMIN_ROLE } from '../constants/permissions'

export const isCurrentUserAdminSelector = createSelector(
  state => state.currentUser.id,
  state => state.workspaces,
  (currentUserId, workspaces) =>
    isAdmin(workspaces.selectedWorkspace, currentUserId, workspaces.byId)
)

export const isAdmin = (workspaceId, userId, workspaces) => {
  if (!workspaceId || !userId) {
    return false
  }
  const workspace = workspaces[workspaceId] || {}
  const members = workspace.members || []
  return members.some(m => m.id === userId && m.role === ADMIN_ROLE)
}
