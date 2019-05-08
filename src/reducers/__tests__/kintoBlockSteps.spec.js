import reducer from '../kintoBlockSteps'
import { kintoBlockStepsReceive } from 'actions/kintoBlockSteps'

describe('kintoBlockSteps reducer', () => {
  it('kintoBlockStepsReceive stores the builds data, id and version', () => {
    const newState = reducer(
      undefined,
      kintoBlockStepsReceive(1, 'master', ['1', '2'])
    )

    expect(newState).toEqual({
      blockId: 1,
      version: 'master',
      builds: ['1', '2']
    })
  })

  it('kintoBlockStepsReceive default builds to [] when its null', () => {
    const newState = reducer(
      undefined,
      kintoBlockStepsReceive(1, 'master', null)
    )

    expect(newState).toEqual({
      blockId: 1,
      version: 'master',
      builds: []
    })
  })
})
