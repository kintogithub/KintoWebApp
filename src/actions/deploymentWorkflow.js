export const RECEIVE_DEPLOYMENT_WORKFLOW = 'RECEIVE_DEPLOYMENT_WORKFLOW'

export const deploymentWorkflowReceive = (data, appId, envId) => ({
  type: RECEIVE_DEPLOYMENT_WORKFLOW,
  data,
  appId,
  envId
})
