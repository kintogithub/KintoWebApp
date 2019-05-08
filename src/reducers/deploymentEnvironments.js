import { RECEIVE_DEPLOYMENT_ENVIRONMENTS_INFO } from 'actions/deploymentEnvironments'

/*
* data will look like the following
* {
*   "deploymentId" {
*     "environmentId": {
*       environmentId: 'envId',
*       deploymentType: 'DeploymentType', // env is live if deploymentType === DEPLOY
*       deploymentVersion: "1.0.0",
*       updatedAt: "Date",
*       lastStatus: "Status"
*     },
*     "environmentId2": null
*   }
* }
*/
export default function deploymentEnvironments(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DEPLOYMENT_ENVIRONMENTS_INFO: {
      const deploymentEnvironments =
        action.data &&
        action.data.reduce((acc, deployment) => {
          acc[deployment.deploymentId] = acc[deployment.deploymentId] || {}
          const lastWorkflow = deployment.workflows[0]
          if (lastWorkflow) {
            const existingDeployment = state[deployment.deploymentId] || {}
            const existingEnv =
              existingDeployment[deployment.environmentId] || {}
            if (action.isUpdateStatusOnly) {
              acc[deployment.deploymentId][deployment.environmentId] = {
                ...existingEnv,
                lastStatus: lastWorkflow.status
              }
            } else {
              acc[deployment.deploymentId][deployment.environmentId] = {
                ...lastWorkflow,
                lastStatus: existingEnv.lastStatus
              }
            }
          } else {
            acc[deployment.deploymentId][deployment.environmentId] = null
          }
          return acc
        }, {})

      return {
        ...state,
        ...deploymentEnvironments
      }
    }
    default:
      return state
  }
}
