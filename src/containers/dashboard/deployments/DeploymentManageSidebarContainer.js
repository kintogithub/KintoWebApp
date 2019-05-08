import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getEnvironmentsWithStatus } from 'selectors/deploymentEnvironments'
import DeploymentManageSidebar from 'components/dashboard/deployments/DeploymentManageSidebar'
import {
  addNewEnvironment,
  reorderEnvironments,
  deployEnvironmentFromTag
} from 'actions/deployments'

function mapStateToProps(state) {
  const {
    topPageItem,
    selectedEnvironmentId,
    selectedDeploymentId
  } = state.pageOptions
  const { selectedWorkspace } = state.workspaces
  const deployment = state.deployments.byId[selectedDeploymentId] || {}
  const environments = getEnvironmentsWithStatus(state, deployment.id)

  return {
    environments,
    deployment,
    selectedDeploymentId,
    selectedEnvironmentId,
    selectedWorkspace,
    topPageItem
  }
}

export default connect(
  mapStateToProps,
  { addNewEnvironment, push, reorderEnvironments, deployEnvironmentFromTag }
)(DeploymentManageSidebar)
