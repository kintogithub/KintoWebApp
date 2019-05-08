import {
  KINTO_BLOCK_DOCUMENTATION_RECEIVE,
  KINTO_BLOCK_DOCUMENTATION_ENDPOINT_RECEIVE,
  KINTO_BLOCK_DOCUMENTATION_PROTOCOL_RECEIVE,
  KINTO_BLOCK_FOR_DOCUMENTATION_RECEIVE
} from '../actions/documentation'

const defaultState = {
  byId: {},
  allIds: [],
  selectedKintoBlock: {}
}

const documentationReducer = (state = defaultState, action) => {
  switch (action.type) {
    case KINTO_BLOCK_FOR_DOCUMENTATION_RECEIVE: {
      return {
        ...state,
        selectedKintoBlockId: action.id,
        selectedKintoBlock: action.data,
        selectedBuildId: action.data.activeBuild
          ? action.data.activeBuild.id
          : false,
        isEndpoint: true
      }
    }
    case KINTO_BLOCK_DOCUMENTATION_RECEIVE: {
      let allIds = []
      let byId = {}

      action.data.forEach(doc => {
        allIds.push(doc.id)
        byId[doc.id] = doc
      })
      return {
        ...state,
        byId,
        allIds,
        selectedKintoBlockId: action.id
      }
    }
    case KINTO_BLOCK_DOCUMENTATION_ENDPOINT_RECEIVE: {
      let allIds =
        state.allIds.indexOf[action.endpointId] === -1
          ? [...state.allIds, action.endpointId]
          : state.allIds

      return {
        ...state,
        byId: {
          ...state.byId,
          [action.endpointId]: action.data
        },
        allIds,
        selectedKintoBlockId: action.id
      }
    }
    case KINTO_BLOCK_DOCUMENTATION_PROTOCOL_RECEIVE: {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.endpointId]: {
            ...state.byId[action.endpointId],
            protocol: action.data
          }
        }
      }
    }
    default:
      return state
  }
}

export default documentationReducer
