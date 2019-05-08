export const RECEIVE_DEPLOYMENT_ENVIRONMENTS_INFO =
  'RECEIVE_DEPLOYMENT_ENVIRONMENTS_INFO'

export const deploymentEnvironmentsReceiveInfo = (
  data,
  isUpdateStatusOnly
) => ({
  type: RECEIVE_DEPLOYMENT_ENVIRONMENTS_INFO,
  data,
  isUpdateStatusOnly
})
