import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { pages } from 'constants/pages'
import { getPageUrl } from 'helpers/urlHelper'
import { getVersionType } from 'helpers/versionHelper'
import { deleteDeployment, fetchDeployments } from 'actions/deployments'
import DeploymentCard from '../../../../components/dashboard/deployments/deploymentsList/DeploymentCard'
import { getLiveEnvironments } from 'selectors/deploymentEnvironments'

function mapStateToProps(state, { deployment, index }) {
  const workspaceId = state.workspaces.selectedWorkspace
  const deploymentDependencies = deployment.dependencies
    ? deployment.dependencies.map(d => {
        let dependency = {
          name: d.name,
          url: getPageUrl(pages.dashboardKintoBlocksManage, {
            id: d.blockId,
            version: d.version.name,
            type: getVersionType(d.version),
            workspaceId
          }),
          iconImageName: d.iconImageName,
          type: d.type
        }
        return dependency
      })
    : []

  const currentLiveEnvironments = getLiveEnvironments(state, deployment.id)

  return {
    deployment,
    deploymentId: deployment.id,
    deploymentDependencies,
    selectedWorkspace: workspaceId,
    dropdownId: `id-${index}`,
    dropdownDependencyId: `idd-${index}`,
    currentLiveEnvironments,
    url: getPageUrl(pages.dashboardDeploymentsManage, {
      workspaceId,
      id: deployment.id,
      envId: deployment.environments[deployment.environments.length - 1].id
    })
  }
}

function mergeProps(stateProps, dispatchProps) {
  const changelogUrl = getPageUrl(pages.dashboardDeploymentsChangelogs, {
    id: stateProps.deployment.id,
    workspaceId: stateProps.selectedWorkspace
  })
  return {
    ...stateProps,
    ...dispatchProps,
    goToDraft: () => dispatchProps.push(stateProps.url),
    goToDependencyManage: url => dispatchProps.push(url),
    goToChangelog: () => dispatchProps.push(changelogUrl)
  }
}

export default connect(
  mapStateToProps,
  { push, deleteDeployment, fetchDeployments },
  mergeProps
)(DeploymentCard)
