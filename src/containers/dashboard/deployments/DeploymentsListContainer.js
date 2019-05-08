import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { pages } from 'constants/pages'
import { getPageUrl } from 'helpers/urlHelper'
import { getAllDeployments } from 'selectors/deployments'
import { fetchDeployments } from 'actions/deployments'
import DeploymentsList from 'components/dashboard/deployments/DeploymentsList'

function mapStateToProps(state) {
  const { selectedWorkspace } = state.workspaces
  const kintoAppCreateUrl = getPageUrl(pages.dashboardDeploymentsCreate, {
    workspaceId: selectedWorkspace
  })

  return {
    deployments: getAllDeployments(state),
    kintoAppCreateUrl
  }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...stateProps,
    ...ownProps,
    redirectToCreate: () => {
      dispatchProps.push(stateProps.kintoAppCreateUrl)
    },
    fetchDeployments: async () => {
      await dispatchProps.fetchDeployments()
      if (!stateProps.deployments.length) {
        dispatchProps.push(stateProps.kintoAppCreateUrl)
      }
    }
  }
}

export default connect(
  mapStateToProps,
  { fetchDeployments, push },
  mergeProps
)(DeploymentsList)
