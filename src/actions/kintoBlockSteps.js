export const RECEIVE_KINTOBLOCK_STEPS = 'RECEIVE_KINTOBLOCK_STEPS'

export const kintoBlockStepsReceive = (id, version, data) => ({
  type: RECEIVE_KINTOBLOCK_STEPS,
  id,
  version,
  data: data || []
})
