import { connect } from 'react-redux'
import { updateDeployment } from 'actions/deployments'
import DeploymentBasicInfoModal from 'components/dashboard/deployments/deploymentManage/DeploymentBasicInfoModal'

function mapStateToProps(state) {
  const { selectedEnvironmentId, selectedDeploymentId } = state.pageOptions
  const deployment = state.deployments.byId[selectedDeploymentId]
  const environment = deployment.environments.find(
    e => e.id === selectedEnvironmentId
  )

  return {
    deployment,
    environment,
    selectedEnvironmentId,
    selectedDeploymentId,
    initialValues: {
      environmentName: environment.name,
      name: deployment.name,
      shortDescription: deployment.shortDescription
    }
  }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const deploymentId = stateProps.selectedDeploymentId
  const version = stateProps.deployment.version.name
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    onSubmit: data =>
      dispatchProps.onSubmit(deploymentId, version, {
        ...data,
        environmentId: stateProps.selectedEnvironmentId
      })
  }
}

export default connect(
  mapStateToProps,
  { onSubmit: updateDeployment },
  mergeProps
)(DeploymentBasicInfoModal)
