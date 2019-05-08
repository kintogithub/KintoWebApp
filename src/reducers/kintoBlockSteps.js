import { RECEIVE_KINTOBLOCK_STEPS } from 'actions/kintoBlockSteps'

export default function kintoBlockSteps(state = {}, action) {
  switch (action.type) {
    case RECEIVE_KINTOBLOCK_STEPS:
      return {
        blockId: action.id,
        version: action.version,
        builds: action.data
      }
    default:
      return state
  }
}
