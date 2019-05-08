import { connect } from 'react-redux'
import { WORKSPACE_FIRST_SUCCESS } from 'constants/congratsModals'
import { hasGitSourcesSelector } from 'selectors/workspaces'
import { GITHUB, BITBUCKET } from 'constants/gitRepos'
import { hideCongratsModal } from 'actions/pageOptions'
import { resendWorkspaceInvite } from 'actions/workspaces'
import WorkspaceEdit from 'components/workspaces/WorkspaceEdit'

function mapStateToProps(state, { match }) {
  const { selectedWorkspace, byId } = state.workspaces
  const { isTutorial } = state.tutorial
  const workspace = byId[selectedWorkspace]
  const hasGitSources = hasGitSourcesSelector(state)
  const bitbucketSource = workspace.gitSources[BITBUCKET] || {}
  const githubSource = workspace.gitSources[GITHUB] || {}
  return {
    workspace,
    isTutorial,
    isCongratsModalShown:
      state.pageOptions.congratsModal === WORKSPACE_FIRST_SUCCESS,
    hasGitSources,
    githubSource,
    bitbucketSource,
    selectedWorkspace
  }
}

function mergeProps(stateProps, dispatchProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    resendInvite: memberEmail =>
      dispatchProps.resendWorkspaceInvite(
        memberEmail,
        stateProps.selectedWorkspace
      )
  }
}

export default connect(
  mapStateToProps,
  {
    hideCongratsModal,
    resendWorkspaceInvite
  },
  mergeProps
)(WorkspaceEdit)
