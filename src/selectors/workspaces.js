import { createSelector } from 'reselect'
import { GITHUB, BITBUCKET } from 'constants/gitRepos'

export const hasGitSourcesSelector = createSelector(
  state => state.workspaces.selectedWorkspace,
  state => state.workspaces,
  (workspaceId, workspaces) => {
    const selectedWorkspace = workspaces.byId[workspaceId] || {}
    const gitSources = selectedWorkspace.gitSources || {}
    return !!(gitSources[GITHUB] || gitSources[BITBUCKET])
  }
)
