import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import qs from 'query-string'
import { pages } from 'constants/pages'
import { MICROSERVICE } from 'constants/kintoBlockTypes'
import { getPageUrl } from 'helpers/urlHelper'
import { addKintoBlockValidation } from 'selectors/limitations'
import { hasGitSourcesSelector } from 'selectors/workspaces'
import { showAlert } from 'actions/pageOptions'
import { cancelTutorialMode } from 'actions/tutorial'
import KintoBlockCreate from 'components/dashboard/kintoBlocks/KintoBlockCreate'

function mapStateToProps(state, { location }) {
  const { kintoBlockType, showLinkModal } = qs.parse(location.search)
  const { selectedWorkspace } = state.workspaces
  const { isTutorial } = state.tutorial
  const hasGitSources = hasGitSourcesSelector(state)

  return {
    kintoBlockType: kintoBlockType ? kintoBlockType : MICROSERVICE,
    isTutorial,
    hasGitSources,
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

export default connect(
  mapStateToProps,
  { push, showAlert, cancelTutorialMode },
  mergeProps
)(KintoBlockCreate)
