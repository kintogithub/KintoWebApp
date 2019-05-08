import { connect } from 'react-redux'
import { getWorkflowGroups } from 'selectors/workflows'
import { FAILED } from 'constants/buildStates'
import { getEnvironmentsWithStatus } from 'selectors/deploymentEnvironments'
import { fetchDeployment, deployEnvironment } from 'actions/deployments'
import StatusAndHistory from 'components/dashboard/deployments/deploymentManage/StatusAndHistory'

function mapStateToProps(state, { deployment }) {
  const { selectedEnvironmentId } = state.pageOptions
  const { selectedWorkspace } = state.workspaces
  const {
    workflows,
    percentageProgress,
    workflowStatus,
    workflowEndTime
  } = getWorkflowGroups(state)
  const lastWorkflow = workflows[0] || {}
  const getCurrentVersion = () => {
    const environment =
      deployment.environments.find(e => e.id === selectedEnvironmentId) || {}
    const environmentInfo = environment.id
      ? getEnvironmentsWithStatus(state, deployment.id).find(
          e => e.environmentId === environment.id
        )
      : getEnvironmentsWithStatus(state, deployment.id)[0]

    return {
      releaseVersion: environmentInfo.deploymentVersion,
      releases: environment.releases || [],
      lastDeploymentType: environmentInfo.deploymentType
    }
  }

  return {
    selectedEnvironmentId,
    deployment,
    workflows,
    lastWorkflow,
    percentageProgress,
    hasWorkflowFailed: workflowStatus === FAILED ? true : false,
    workflowEndTime,
    workflowStatus,
    currentVersion: getCurrentVersion().releaseVersion,
    releases: getCurrentVersion().releases,
    lastDeploymentType: getCurrentVersion().lastDeploymentType,
    selectedWorkspace
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDeploymentForRollback: (id, envId, deploymentVersion) =>
      dispatch(fetchDeployment(id, envId, deploymentVersion)),
    rollback: (id, envId, data) => dispatch(deployEnvironment(id, envId, data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusAndHistory)
