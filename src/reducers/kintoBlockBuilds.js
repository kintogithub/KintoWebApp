import { RECEIVE_KINTOBLOCK_BUILDS } from 'actions/kintoBlockBuilds'

export default function kintoBlockBuilds(state = {}, action) {
  /*
   * data will look like the following
   * {
   *   "kintoBlockId": {
   *     master: {
   *       status: 'SUCCESS',
   *       buildId: 'buildId',
   *       commitSha: '..',
   *       commitMessage: '..',
   *       commitDate: '..'
   *     },
   *     dev: null
   *   }
   * }
   */
  switch (action.type) {
    case RECEIVE_KINTOBLOCK_BUILDS:
      const newBlocks = action.data.reduce((acc, block) => {
        acc[block.blockId] = acc[block.blockId] || {}
        acc[block.blockId][block.branchName] = block.builds[0] || null
        return acc
      }, {})
      return {
        ...state,
        ...newBlocks
      }
    default:
      return state
  }
}
