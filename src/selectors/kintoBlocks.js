import { createSelector } from 'reselect'

export const getAllKintoBlocks = createSelector(
  state => state.kintoBlocks,
  kintoBlocks => {
    return kintoBlocks.allIds.map(id => kintoBlocks.byId[id])
  }
)
