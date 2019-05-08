import {
  RECEIVE_KINTO_BLOCK,
  RECEIVE_KINTO_BLOCKS,
  RECEIVE_KINTO_BLOCK_DEPENDENCIES
} from '../actions/kintoBlocks'

import {
  RECEIVE_DEPLOYMENT,
  RECEIVE_DEPLOYMENTS,
  ADD_DEPLOYMENT
} from '../actions/deployments'

import { SELECT_WORKSPACE } from '../actions/workspaces'

const kintoBlocksDependenciesCacheReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_DEPLOYMENTS:
    case RECEIVE_DEPLOYMENT:
    case RECEIVE_KINTO_BLOCK:
    case RECEIVE_KINTO_BLOCKS:
    case RECEIVE_KINTO_BLOCK_DEPENDENCIES:
    case ADD_DEPLOYMENT:
      if (!action.metadata || !action.metadata.dependencies) {
        return state
      }
      let newState = { ...state }
      let { dependencies } = action.metadata
      Object.keys(dependencies).forEach(d => {
        newState[d] = {
          ...newState[d],
          ...dependencies[d]
        }
      })
      return newState
    case SELECT_WORKSPACE:
      return {}
    default:
      return state
  }
}

export default kintoBlocksDependenciesCacheReducer
