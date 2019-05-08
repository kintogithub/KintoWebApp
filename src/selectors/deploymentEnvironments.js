import { createSelector } from 'reselect'
import { deploymentType } from 'constants/deploymentStates'
import { getLastStateAndTag } from 'helpers/environmentHelper'

export const getEnvironmentsWithStatus = createSelector(
  (state, deploymentId) => state.deployments.byId[deploymentId],
  state => state.deploymentEnvironments,
  (deployment, deploymentEnvironments) => {
    if (!deployment) {
      return [{}]
    }
    const environmentsFromPrisma = deployment.id
      ? deploymentEnvironments[deployment.id]
      : {}

    return deployment.environments.map(env => {
      const environmentInfo = environmentsFromPrisma
        ? environmentsFromPrisma[env.id]
        : null

      if (environmentInfo) {
        return {
          environmentId: env.id,
          name: env.name,
          lastStatus: environmentInfo.lastStatus,
          deploymentVersion: environmentInfo.deploymentVersion,
          deploymentType: environmentInfo.deploymentType,
          isLive: environmentInfo.deploymentType === deploymentType.deploy,
          completionTime: environmentInfo.updatedAt
        }
      } else {
        // TODO: if the data is not in prisma try to read it the old way for backward compatibility (need to be removed later)
        const envStateInfo = getLastStateAndTag(env)
        return {
          environmentId: env.id,
          name: env.name,
          lastStatus: envStateInfo.state,
          deploymentVersion: envStateInfo.versionName,
          deploymentType: envStateInfo.isLive ? deploymentType.deploy : null,
          isLive: envStateInfo.isLive,
          completionTime: envStateInfo.completionTime
        }
      }
    })
  }
)

export const getLiveEnvironments = createSelector(
  getEnvironmentsWithStatus,
  environments => {
    return environments.filter(e => e.isLive).map(e => ({
      environmentId: e.environmentId,
      name: e.name,
      deploymentVersion: e.deploymentVersion
    }))
  }
)

export const getLiveEnvironmentCountForDeployments = createSelector(
  state => state,
  state => state.deployments,
  (state, deployments) => {
    const deploymentDetails = deployments.allIds.map(a => deployments.byId[a])
    return deploymentDetails.reduce(
      (acc, deployment) =>
        acc + getLiveEnvironments(state, deployment.id).length,
      0
    )
  }
)
