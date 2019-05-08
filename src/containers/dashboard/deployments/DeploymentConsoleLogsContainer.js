import { connect } from 'react-redux'
import { pages } from 'constants/pages'
import { getPageUrl } from 'helpers/urlHelper'
import { getDeploymentDependencies } from 'selectors/deployments'
import { getEnvironmentsWithStatus } from 'selectors/deploymentEnvironments'
import { fetchDeploymentConsoleLogs } from 'actions/deploymentLogs'
import { getDeploymentEnvironments, fetchDeployment } from 'actions/deployments'
import {
  deploymentSelect,
  environmentSelect,
  releaseVersionSelect
} from 'actions/pageOptions'
import DeploymentConsoleLogs from 'components/dashboard/deployments/DeploymentConsoleLogs'

function mapStateToProps(state, { match }) {
  const { id, version, envId, releaseNumber } = match.params
  const { selectedWorkspace } = state.workspaces
  const deployment = state.deployments.byId[id] || {}
  const environments = deployment.environments || []
  const environment = environments.find(e => e.id === envId) || {}
  const { logs, blockName } = state.deploymentLogs.consoleLogs
  const lastLogDate = logs.length ? logs[logs.length - 1].date : null
  const status = getEnvironmentsWithStatus(state, id).status
  return {
    id,
    state: status || '',
    version,
    envId,
    releaseNumber,
    environment,
    consoleLogs: logs,
    lastLogDate,
    logBlockName: blockName,
    deployment,
    kintoBlockOptions: getDeploymentDependencies(state, {
      id,
      ver: version
    }).map(d => ({
      label: d.name,
      value: d.name.toLowerCase(),
      type: d.type
    })),
    requestLogsUrl: getPageUrl(pages.dashboardDeploymentsRequestLogs, {
      workspaceId: selectedWorkspace,
      id,
      version,
      envId,
      releaseNumber
    })
  }
}

function mergeProps(stateProps, dispatchProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    getDeploymentEnvironments: () =>
      dispatchProps.getDeploymentEnvironments(stateProps.id)
  }
}

export default connect(
  mapStateToProps,
  {
    fetchDeployment,
    fetchDeploymentConsoleLogs,
    getDeploymentEnvironments,
    deploymentSelect,
    environmentSelect,
    releaseVersionSelect
  },
  mergeProps
)(DeploymentConsoleLogs)
