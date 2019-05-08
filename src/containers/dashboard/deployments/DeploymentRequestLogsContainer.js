import { connect } from 'react-redux'
import { pages } from 'constants/pages'
import { getPageUrl } from 'helpers/urlHelper'
import { getDeploymentEnvironments } from 'actions/deployments'
import { fetchDeploymentRequestLogs } from 'actions/deploymentLogs'
import {
  deploymentSelect,
  environmentSelect,
  releaseVersionSelect
} from 'actions/pageOptions'
import DeploymentRequestLogs from 'components/dashboard/deployments/DeploymentRequestLogs'

function mapStateToProps(state, { match }) {
  const { id, envId, appVersion } = match.params
  const { selectedWorkspace } = state.workspaces
  const deployment = state.deployments.byId[id] || {}
  const environments = deployment.environments || []
  const environment = environments.find(e => e.id === envId) || {}
  const requestLogs = state.deploymentLogs.requestLogs

  return {
    id,
    envId,
    appVersion,
    environment,
    requestLogs,
    consoleLogsUrl: getPageUrl(pages.dashboardDeploymentsConsoleLogs, {
      workspaceId: selectedWorkspace,
      id,
      envId,
      appVersion
    })
  }
}

export default connect(
  mapStateToProps,
  {
    getDeploymentEnvironments,
    fetchDeploymentRequestLogs,
    deploymentSelect,
    environmentSelect,
    releaseVersionSelect
  }
)(DeploymentRequestLogs)
