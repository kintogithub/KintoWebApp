import reducer from '../kintoBlockBuilds'
import { kintoBlockBuildsReceive } from 'actions/kintoBlockBuilds'

describe('kintoBlockBuilds reducer', () => {
  it('kintoBlockBuildsReceive groups the data by kintoblock id', () => {
    const newState = reducer(
      undefined,
      kintoBlockBuildsReceive([
        {
          blockId: '1',
          branchName: 'master',
          builds: []
        },
        {
          blockId: '1',
          branchName: 'dev',
          builds: []
        },
        {
          blockId: '2',
          branchName: 'dev',
          builds: []
        }
      ])
    )
    expect(newState).toEqual({
      '1': {
        dev: null,
        master: null
      },
      '2': {
        dev: null
      }
    })
  })

  it('kintoBlockBuildsReceive adds build data to each branch', () => {
    const newState = reducer(
      undefined,
      kintoBlockBuildsReceive([
        {
          blockId: '1',
          branchName: 'master',
          builds: [{ name: 'build' }]
        }
      ])
    )
    expect(newState).toEqual({
      '1': {
        master: { name: 'build' }
      }
    })
  })
})
