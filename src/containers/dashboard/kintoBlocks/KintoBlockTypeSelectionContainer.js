import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import qs from 'query-string'
import { pages } from 'constants/pages'
import { getPageUrl } from 'helpers/urlHelper'
import { hasGitSourcesSelector } from 'selectors/workspaces'
import { addKintoBlockValidation } from 'selectors/limitations'
import { showAlert } from 'actions/pageOptions'
import KintoBlockTypeSelection from 'components/dashboard/kintoBlocks/KintoBlockTypeSelection'

function mapStateToProps(state, { location }) {
  const { showLinkModal } = qs.parse(location.search)
  const { selectedWorkspace } = state.workspaces
  const { isTutorial } = state.tutorial
  const hasGitSources = hasGitSourcesSelector(state)

  return {
    hasGitSources,
    isTutorial,
    workspaceId: selectedWorkspace,
    addKintoBlockValidation: addKintoBlockValidation(state),
    showLinkModal: !!showLinkModal
  }
}

function mergeProps(stateProps, dispatchProps) {
  const dashboardUrl = getPageUrl(pages.dashboardHome, {
    workspaceId: stateProps.workspaceId
  })
  return {
    ...stateProps,
    ...dispatchProps,
    redirectToDashboard: () => dispatchProps.push(dashboardUrl),
    throwOutIfReachLimit: () => {
      const validation = stateProps.addKintoBlockValidation
      if (validation.isValid) return
      dispatchProps.showAlert(validation.message)
      dispatchProps.push(
        getPageUrl(pages.dashboardKintoBlocksList, {
          workspaceId: stateProps.workspaceId
        })
      )
    }
  }
}

export default connect(mapStateToProps, { push, showAlert }, mergeProps)(
  KintoBlockTypeSelection
)
