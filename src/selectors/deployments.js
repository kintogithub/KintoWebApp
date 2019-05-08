import { createSelector } from 'reselect'
import { getDependencyInfo } from 'helpers/kintoBlocksHelper'
import { isBranchVersionEqual } from 'helpers/versionHelper'

export const getAllDeployments = createSelector(
  state => state.deployments.allIds.map(a => state.deployments.byId[a]),
  state => state.kintoBlocksDependenciesCache,
  (deployments = [], dependenciesCache) => {
    return deployments.map(app => {
      const dependencies = app.appDependencies || []
      return {
        ...app,
        dependencies: dependencies.map(d => {
          return getDependencyInfo(d, dependenciesCache, true)
        })
      }
    })
  }
)

export const getDeploymentDependenciesEnvConfig = createSelector(
  (state, { id }) => state.deployments.byId[id],
  (_, params) => params,
  (deployment, { env, ver }) => {
    if (!deployment || !deployment.dependenciesConfig) {
      return null
    }
    const { dependenciesConfig } = deployment
    // mismatch
    if (
      dependenciesConfig.envId !== env ||
      !isBranchVersionEqual(dependenciesConfig.version, ver, true)
    ) {
      return null
    }
    return dependenciesConfig.data
  }
)

export const getDeploymentDependencies = createSelector(
  (state, { id }) => state.deployments.byId[id],
  (_, params) => params,
  state => state.kintoBlocksDependenciesCache,
  (deployment = {}, { ver }, dependenciesCache) => {
    if (!isBranchVersionEqual(deployment.version, ver, true)) {
      return []
    }
    const dependencies = deployment.appDependencies || []
    return dependencies.map(d => {
      return getDependencyInfo(d, dependenciesCache)
    })
  }
)
