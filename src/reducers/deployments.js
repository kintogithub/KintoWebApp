import { arrayMove } from 'react-sortable-hoc'

import {
  RECEIVE_DEPLOYMENTS,
  RECEIVE_DEPLOYMENT,
  UPDATE_DEPLOYMENT,
  ADD_DEPLOYMENT,
  RECEIVE_DEPLOYMENT_ENVIRONMENTS,
  RECEIVE_DEPLOYMENT_ENVIRONMENT,
  RECEIVE_DEPLOYMENT_DEPENDENCIES_CONFIG,
  DEPLOYMENT_ENVIRONMENT_LIST_REORDER,
  NEW_ENVIRONMENT_RECEIVE,
  ADD_TAG,
  DEPLOYMENT_ENVIRONMENT_UPDATE,
  DEPLOYMENT_CHANGELOG_RECEIVE,
  RECEIVE_DEPLOYMENT_DEPENDENCY_DEFAULT
} from '../actions/deployments'

import { SELECT_WORKSPACE } from '../actions/workspaces'

const defaultState = {
  byId: {},
  allIds: []
}

const deploymentsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVE_DEPLOYMENT: {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: action.data
        }
      }
    }

    case ADD_DEPLOYMENT: {
      return {
        allIds: [...state.allIds, action.id],
        byId: {
          ...state.byId,
          [action.id]: action.data
        }
      }
    }

    case RECEIVE_DEPLOYMENTS: {
      let allIds = []
      let byId = {}

      action.data.length &&
        action.data.forEach(app => {
          allIds.push(app.id)
          byId[app.id] = app
        })

      return {
        byId,
        allIds
      }
    }

    case RECEIVE_DEPLOYMENT_ENVIRONMENT: {
      const { envId, appId, dependencies } = action
      const updatedEnvironments = state.byId[appId].environments.map(i => {
        if (i.id !== envId) {
          return i
        }
        return {
          ...i,
          dependencies
        }
      })
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.appId]: {
            ...state.byId[action.appId],
            environments: updatedEnvironments
          }
        }
      }
    }

    case RECEIVE_DEPLOYMENT_ENVIRONMENTS:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            environments: action.data
          }
        }
      }
    case RECEIVE_DEPLOYMENT_DEPENDENCIES_CONFIG:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            dependenciesConfig: {
              envId: action.envId,
              version: action.ver,
              data: action.data
            }
          }
        }
      }
    case RECEIVE_DEPLOYMENT_DEPENDENCY_DEFAULT:
      const dependencyData =
        state.byId[action.deploymentId].dependenciesConfig.data

      const updatedData = dependencyData.map(dependency => {
        if (dependency.blockId !== action.blockId) {
          return dependency
        }
        return action.data
      })

      return {
        ...state,
        byId: {
          ...state.byId,
          [action.deploymentId]: {
            ...state.byId[action.deploymentId],
            dependenciesConfig: {
              ...state.byId[action.deploymentId].dependenciesConfig,
              data: updatedData
            }
          }
        }
      }

    case DEPLOYMENT_ENVIRONMENT_LIST_REORDER:
      const oldOrder = [...state.byId[action.id].environments]
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            environments: arrayMove(oldOrder, action.oldIndex, action.newIndex)
          }
        }
      }
    case NEW_ENVIRONMENT_RECEIVE:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            environments: [...state.byId[action.id].environments, action.data]
          }
        }
      }

    case ADD_TAG:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            versions: [
              ...state.byId[action.id].versions,
              { name: action.name, type: action.versionType }
            ]
          }
        }
      }

    case DEPLOYMENT_ENVIRONMENT_UPDATE:
      const { data } = action
      const updatedEnvironments = state.byId[action.id].environments.map(i => {
        if (i.id !== data.id) {
          return i
        }
        return {
          ...i,
          ...data
        }
      })

      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            environments: updatedEnvironments
          }
        }
      }
    case UPDATE_DEPLOYMENT:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: action.data
        }
      }
    case DEPLOYMENT_CHANGELOG_RECEIVE:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            changelog: {
              oldVersion: action.oldVersion,
              newVersion: action.newVersion,
              data: action.data
            }
          }
        }
      }
    case SELECT_WORKSPACE:
      return defaultState
    default:
      return state
  }
}

export default deploymentsReducer
