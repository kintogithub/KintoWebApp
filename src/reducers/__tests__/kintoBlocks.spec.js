import keyBy from 'lodash/keyBy'

import reducer from '../kintoBlocks'
import * as actions from '../../actions/kintoBlocks'
import { workspaceSelect } from '../../actions/workspaces'

const simpleBlocks = [
  { id: '1', name: 'first', simple: true },
  { id: '2', name: 'second', simple: true }
]
const detailedBlock = {
  id: '1',
  name: 'first',
  detailed: true
}

describe('KintoBlocks Reducer', () => {
  it('receiveKintoBlocks reset allIds with the new ids', () => {
    const newState = reducer(
      { byId: {}, allIds: ['3', '4'] },
      actions.kintoBlocksReceive(simpleBlocks)
    )
    expect(newState.allIds).toEqual(['1', '2'])
  })

  it('receiveKintoBlocks overwrite byId data for received entities', () => {
    const newState = reducer(
      {
        byId: { '1': { special: 'one' }, '2': { special: 'two' } },
        allIds: ['1', '2']
      },
      actions.kintoBlocksReceive(simpleBlocks)
    )
    expect(newState.byId['1']).toEqual({
      id: '1',
      name: 'first',
      simple: true
    })
    expect(newState.byId['2']).toEqual({
      id: '2',
      name: 'second',
      simple: true
    })
  })

  it('receiveKintoBlock add a new entity if there is no fetched kintoblocks', () => {
    const newState = reducer(
      undefined,
      actions.kintoBlockReceive('1', detailedBlock)
    )
    expect(newState.byId['1']).toEqual(detailedBlock)
  })

  it('receiveKintoBlock overwrites existing kintoblock with the new one', () => {
    const newState = reducer(
      {
        byId: keyBy(simpleBlocks, 'id'),
        allIds: ['1', '2']
      },
      actions.kintoBlockReceive('1', detailedBlock)
    )
    expect(newState.byId['1']).toEqual({
      id: '1',
      name: 'first',
      detailed: true
    })
  })

  it('kintoBlockUpdate merges result with existing kintoblock', () => {
    const newState = reducer(
      {
        byId: keyBy(simpleBlocks, 'id'),
        allIds: ['1', '2']
      },
      actions.kintoBlockUpdate('1', detailedBlock)
    )
    expect(newState.byId['1']).toEqual({
      id: '1',
      name: 'first',
      simple: true,
      detailed: true
    })
  })

  it('kintoBlockUpdateBuilds only updates builds property for kintoblocks', () => {
    const oldState = {
      byId: {
        '1': {
          id: '1',
          name: 'name',
          builds: 'old'
        }
      },
      allIds: ['1']
    }
    const action = actions.kintoBlockUpdateBuilds('1', {
      name: 'somethingelse',
      builds: 'data'
    })
    const newState = reducer(oldState, action)
    const updatedBlock = newState.byId['1']
    expect(updatedBlock.name).toEqual('name')
    expect(updatedBlock.builds).toEqual('data')
  })

  it('selectWorkspace removes all kintoblocks', () => {
    const oldState = {
      byId: { data: 'test' },
      allIds: [1, 2, 3]
    }
    const newState = reducer(oldState, workspaceSelect('1'))
    expect(newState.allIds.length).toBe(0)
    expect(newState.byId).toEqual({})
  })

  it('kintoBlockUpdateBuilds updates builds and activeBuilds', () => {
    const oldState = {
      byId: {
        '1': {
          id: '1',
          name: 'name',
          builds: 'old'
        }
      },
      allIds: ['1']
    }

    const action = actions.kintoBlockUpdateBuilds('1', {
      activeBuild: 'active',
      builds: 'builds'
    })
    const newState = reducer(oldState, action)
    expect(newState.byId['1'].activeBuild).toEqual('active')
    expect(newState.byId['1'].builds).toEqual('builds')
  })

  it('kintoBlockUpdateBuild updates build', () => {
    const oldState = {
      byId: {
        '1': {
          id: '1',
          name: 'name',
          builds: [
            { id: 'build1', name: 'oldbuild' },
            { id: 'build2', name: 'untouched' }
          ]
        }
      },
      allIds: ['1', '2']
    }
    const action = actions.kintoBlockUpdateBuild('1', 'build1', {
      id: 'build1',
      name: 'newbuild'
    })
    const newState = reducer(oldState, action)
    expect(newState.byId['1'].builds).toEqual([
      { id: 'build1', name: 'newbuild' },
      { id: 'build2', name: 'untouched' }
    ])
  })
})
