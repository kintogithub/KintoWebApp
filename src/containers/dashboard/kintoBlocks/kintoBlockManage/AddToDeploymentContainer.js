import { connect } from 'react-redux'
import AddToDeployment from 'components/dashboard/ui/AddToDeployment'
import { fetchDeployments } from 'actions/deployments'
import { push } from 'react-router-redux'
import { pages } from 'constants/pages'
import { getPageUrl } from 'helpers/urlHelper'

function mapStateToProps(state) {
  const { deployments, workspaces, kintoBlocks } = state
  const { allIds, byId } = deployments
  const { selectedWorkspace } = workspaces
  const { selectedKintoBlockId } = state.pageOptions
  const { versionName, version } = kintoBlocks.byId[selectedKintoBlockId] || {}
  const kintoBlockVersionType = version ? version.type : ''

  const deploymentArray = allIds.map(deploymentId => {
    const deployment = byId[deploymentId]
    const environmentsArray = deployment.environments
      ? deployment.environments.map(environment => {
          return {
            ...environment,
            url: getPageUrl(
              pages.dashboardDeploymentsManage,
              {
                workspaceId: selectedWorkspace,
                id: deployment.id,
                envId: environment.id
              },
              {
                kintoBlockId: selectedKintoBlockId,
                kintoBlockVersion: versionName,
                kintoBlockVersionType: kintoBlockVersionType,
                isPrefilled: true
              }
            )
          }
        })
      : []

    return {
      deploymentId,
      name: deployment.name,
      environments: environmentsArray
    }
  })

  return {
    deploymentArray,
    kintoBlockVersionName: versionName,
    kintoBlockVersionType,
    selectedKintoBlockId,
    selectedWorkspace
  }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    goToCreateDeployment: newDeploymentName =>
      dispatchProps.goToCreate(
        getPageUrl(
          pages.dashboardDeploymentsCreate,
          {
            workspaceId: stateProps.selectedWorkspace
          },
          {
            newDeploymentName: newDeploymentName,
            kintoBlockId: stateProps.selectedKintoBlockId,
            kintoBlockVersion: stateProps.kintoBlockVersionName,
            kintoBlockVersionType: stateProps.kintoBlockVersionType,
            isPrefilled: true
          }
        )
      )
  }
}

export default connect(
  mapStateToProps,
  {
    goToCreate: push,
    fetchDeployments
  },
  mergeProps
)(AddToDeployment)
