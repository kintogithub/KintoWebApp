import { RECEIVE_DEPLOYMENT_WORKFLOW } from '../actions/deploymentWorkflow'

const defaultState = {
  workflow: { workflowData: [], appId: '', envId: '' }
}

export default function deploymentWorkflow(state = defaultState, action) {
  switch (action.type) {
    case RECEIVE_DEPLOYMENT_WORKFLOW:
      return {
        ...state,
        workflow: {
          workflowData: action.data,
          appId: action.appId,
          envId: action.envId
        }
      }
    default:
      return state
  }
}
