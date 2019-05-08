import {
  FETCH_WORKSPACES,
  RECEIVE_WORKSPACES,
  RECEIVE_WORKSPACE,
  SELECT_WORKSPACE,
  RECEIVE_SERVICE
} from '../actions/workspaces'

import { PENDING } from 'constants/inviteStates'

const defaultState = {
  selectedWorkspace: null,
  byId: {},
  allIds: []
}

const workspacesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SELECT_WORKSPACE:
      return {
        ...state,
        selectedWorkspace: action.workspaceId
      }
    case FETCH_WORKSPACES:
      return {
        ...state
      }
    case RECEIVE_WORKSPACES: {
      let allIds = []
      let byId = {}
      action.data.forEach(workspace => {
        allIds.push(workspace.workspaceId)
        byId[workspace.workspaceId] = workspace
      })
      return {
        ...state,
        byId,
        allIds
      }
    }
    case RECEIVE_WORKSPACE: {
      const workspace = action.data
      const members = workspace.members.concat().sort((a, b) => {
        if (a.inviteState !== b.inviteState) {
          if (a.inviteState === PENDING) {
            return 1
          }
          if (b.inviteState === PENDING) {
            return -1
          }
        }
        if (a.role !== b.role) {
          return a.role.localeCompare(b.role)
        }
        const aname = a.userName ? a.userName.toUpperCase() : ''
        const bname = b.userName ? b.userName.toUpperCase() : ''
        return aname.localeCompare(bname)
      })

      let { allIds } = state
      if (action.isAdd) {
        allIds = [...allIds, action.workspaceId]
      }

      return {
        ...state,
        allIds,
        byId: {
          ...state.byId,
          [action.workspaceId]: {
            ...workspace,
            members
          }
        }
      }
    }
    case RECEIVE_SERVICE: {
      const service = action.data
      const workspace = state.byId[action.workspaceId]
      const services = workspace.services.filter(
        item => item.service !== service.service
      )
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.workspaceId]: {
            ...state.byId[action.workspaceId],
            services: [...services, service]
          }
        }
      }
    }
    default:
      return state
  }
}

export default workspacesReducer
