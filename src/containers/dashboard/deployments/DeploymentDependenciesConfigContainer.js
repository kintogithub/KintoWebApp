import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import qs from 'query-string'
import {
  fetchDeployment,
  fetchDeploymentDependenciesConfig
} from 'actions/deployments'
import { environmentSelect } from 'actions/pageOptions'
import { getDependencyConfigDefault } from 'actions/kintoBlocks'
import { getDeploymentDependencies } from 'selectors/deployments'
import { pages } from 'constants/pages'
import DeploymentDependenciesConfig from 'components/dashboard/deployments/DeploymentDependenciesConfig'

function mapStateToProps(state, { match, location }) {
  const query = qs.parse(location.search)
  const { selectedWorkspace } = state.workspaces

  const { id, ver, env } = match.params
  const dependencies = getDeploymentDependencies(state, match.params)
  return {
    selectedWorkspace,
    dependencies,
    deploymentId: id,
    deploymentVersion: ver,
    envId: env,
    filteredDependency: query.dependency
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDeployment: (id, ver) => dispatch(fetchDeployment(id, ver)),
    fetchDeploymentDependenciesConfig: (id, ver, env) =>
      dispatch(fetchDeploymentDependenciesConfig(id, ver, env)),
    goToCreatePage: workspaceId =>
      dispatch(
        push(pages.dashboardDeploymentsCreate, { workspaceId: workspaceId })
      ),
    //todo fix the url here this seems old
    environmentSelect: id => dispatch(environmentSelect(id)),
    getDependencyConfigDefault: (
      deploymentId,
      dependencyId,
      blockId,
      blockVersion,
      blockType
    ) =>
      dispatch(
        getDependencyConfigDefault(
          deploymentId,
          dependencyId,
          blockId,
          blockVersion,
          blockType
        )
      )
  }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    goToCreatePage: () =>
      dispatchProps.goToCreatePage(stateProps.selectedWorkspace),
    getDefaults: (blockId, dependencyId, blockVersion, blockType) =>
      dispatchProps.getDependencyConfigDefault(
        stateProps.deploymentId,
        dependencyId,
        blockId,
        blockVersion,
        blockType
      )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DeploymentDependenciesConfig)
