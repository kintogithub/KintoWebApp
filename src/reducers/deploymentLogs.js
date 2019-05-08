import {
  RECEIVE_DEPLOYMENT_CONSOLE_LOGS,
  RECEIVE_DEPLOYMENT_REQUEST_CONSOLE_LOGS,
  RECEIVE_DEPLOYMENT_REQUEST_LOGS
} from 'actions/deploymentLogs'

const defaultState = {
  requestLogs: [],
  requestConsoleLogs: {},
  consoleLogs: { logs: [] }
}

const deploymentLogsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVE_DEPLOYMENT_REQUEST_LOGS:
      return {
        id: action.id,
        envId: action.envId,
        appVersion: action.appVersion,
        requestLogs: action.data,
        requestConsoleLogs: defaultState.requestConsoleLogs,
        consoleLogs: defaultState.consoleLogs
      }
    case RECEIVE_DEPLOYMENT_REQUEST_CONSOLE_LOGS:
      return {
        ...state,
        requestConsoleLogs: {
          ...state.requestConsoleLogs,
          [action.requestId]: action.data
        }
      }
    case RECEIVE_DEPLOYMENT_CONSOLE_LOGS:
      let logs = action.data
      if (action.isPolling) {
        logs = [...state.consoleLogs.logs, ...action.data]
      }
      return {
        id: action.id,
        envId: action.envId,
        appVersion: action.appVersion,
        requestConsoleLogs: defaultState.requestConsoleLogs,
        requestLogs: defaultState.requestLogs,
        consoleLogs: {
          blockName: action.blockName,
          logs
        }
      }
    default:
      return state
  }
}

export default deploymentLogsReducer
