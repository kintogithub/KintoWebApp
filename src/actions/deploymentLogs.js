import axios from 'axios'
import qs from 'query-string'

import { getServerUrl } from 'helpers/urlHelper'
import { LOGS } from 'constants/backendMicroservices'

export const RECEIVE_DEPLOYMENT_REQUEST_LOGS = 'RECEIVE_DEPLOYMENT_REQUEST_LOGS'
export const RECEIVE_DEPLOYMENT_REQUEST_CONSOLE_LOGS =
  'RECEIVE_DEPLOYMENT_REQUEST_CONSOLE_LOGS'
export const RECEIVE_DEPLOYMENT_CONSOLE_LOGS = 'RECEIVE_DEPLOYMENT_CONSOLE_LOGS'

export const deploymentRequestLogsReceive = (id, envId, appVersion, data) => ({
  type: RECEIVE_DEPLOYMENT_REQUEST_LOGS,
  id,
  envId,
  appVersion,
  data
})

export const deploymentConsoleLogsReceive = (
  id,
  appVersion,
  envId,
  releaseNumber,
  blockName,
  isPolling,
  data
) => ({
  type: RECEIVE_DEPLOYMENT_CONSOLE_LOGS,
  id,
  appVersion,
  envId,
  releaseNumber,
  blockName,
  isPolling,
  data
})

export const deploymentRequestConsoleLogsReceive = (
  id,
  envId,
  requestId,
  appVersion,
  data
) => ({
  type: RECEIVE_DEPLOYMENT_REQUEST_CONSOLE_LOGS,
  id,
  envId,
  requestId,
  appVersion,
  data
})

export const fetchDeploymentRequestLogs = (id, envId, appVersion) => (
  dispatch,
  getState
) => {
  const { workspaces } = getState()
  const workspaceId = workspaces.selectedWorkspace
  axios
    .get(
      getServerUrl(
        LOGS,
        `/${workspaceId}/kintoapps/${id}/versions/${appVersion}/environments/${envId}/requestlogs`
      ),
      { noSpinner: true }
    )
    .then(response => {
      dispatch(deploymentRequestLogsReceive(id, envId, appVersion, response))
    })
}

export const fetchDeploymentRequestConsoleLogs = (
  id,
  envId,
  requestId,
  appVersion
) => (dispatch, getState) => {
  const { workspaces } = getState()
  const workspaceId = workspaces.selectedWorkspace

  axios
    .get(
      getServerUrl(
        LOGS,
        `/${workspaceId}/kintoapps/${id}/versions/${appVersion}/environments/${envId}/requests/${requestId}/consolelogs`
      )
    )
    .then(response => {
      response.forEach(r => {
        r.log = JSON.stringify(r.log)
      })
      dispatch(
        deploymentRequestConsoleLogsReceive(
          id,
          envId,
          requestId,
          appVersion,
          response
        )
      )
    })
}

export const fetchDeploymentConsoleLogs = (
  id,
  appVersion,
  envId,
  releaseNumber,
  blockName,
  blockType,
  filterOptions
) => (dispatch, getState) => {
  const { workspaces } = getState()
  const workspaceId = workspaces.selectedWorkspace

  const queryOptions = qs.stringify({
    gt: filterOptions.startDate,
    lte: filterOptions.endDate
  })
  const isPollingRequest = !!filterOptions.startDate
  return axios
    .get(
      getServerUrl(
        LOGS,
        `/${workspaceId}/kintoblocks/${blockName}/environments/${envId}/deployments/${releaseNumber}/consolelogs?type=${blockType}&${queryOptions}`
      ),
      { noSpinner: isPollingRequest }
    )
    .then(data => {
      dispatch(
        deploymentConsoleLogsReceive(
          id,
          appVersion,
          envId,
          releaseNumber,
          blockName,
          isPollingRequest,
          data
        )
      )
    })
}
