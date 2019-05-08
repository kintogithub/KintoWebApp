import reducer from '../deployments'
import isArray from 'lodash/isArray'

import * as actions from '../../actions/deployments'
import { workspaceSelect } from '../../actions/workspaces'

const mockStore = {
  byId: {
    '1': {
      id: '1',
      name: 'OriginalStore',
      yourMum: true
    },
    '2': {
      id: '2',
      name: 'OriginalStore2'
    }
  },
  allIds: ['1', '2']
}

describe('deployments Reducer', () => {
  it('deploymentsReceive should store allIds as an array', () => {
    const sampleResponseData = {
      data: [
        {
          id: '1'
        }
      ]
    }

    const newState = reducer(
      undefined,
      actions.deploymentsReceive(sampleResponseData)
    )
    expect(isArray(newState.allIds)).toBe(true)
  })

  it('deploymentsReceive should update the list of Deployments allIds in the store, and replace what was there', () => {
    const kintoAppsMockState = {
      allIds: ['666', '777'],
      byId: {}
    }

    const sampleResponseData = {
      data: [
        {
          id: 'abc'
        }
      ]
    }

    const newState = reducer(
      kintoAppsMockState,
      actions.deploymentsReceive(sampleResponseData)
    )

    expect(newState.allIds[0]).toBe('abc')
    expect(newState.allIds.length).toBe(1)
  })

  it('deploymentReceive should update the correct KintoApp in the byId object, and leave the other items unchanged', () => {
    const sampleSingleResponseData = {
      data: {
        id: '1',
        name: 'SingleApp',
        sausages: true
      }
    }
    const newState = reducer(
      mockStore,
      actions.deploymentReceive('1', sampleSingleResponseData.data)
    )
    expect(newState.byId['1'].name).toBe('SingleApp')
    expect(newState.byId['2'].name).toBe('OriginalStore2')
  })

  it('deploymentReceive overwrites existing deployment with the received entity', () => {
    const oldState = {
      byId: {
        '1': {
          name: 'old app',
          simple: true
        }
      },
      allIds: ['1']
    }
    const newState = reducer(
      oldState,
      actions.deploymentReceive('1', {
        id: '1',
        name: 'app',
        detailed: true
      })
    )

    expect(newState.byId['1']).toEqual({
      id: '1',
      name: 'app',
      detailed: true
    })
  })

  it('deploymentEnvironmentsReceive should add an object containing all environments belonging to a single deployment to the store', () => {
    const kintoAppMockState = {
      byId: {
        '20': {
          id: '20',
          name: 'KintoApp'
        }
      }
    }

    const environmentsData = [
      {
        id: '1',
        name: 'EnvironmentName'
      },
      {
        id: '2',
        name: 'Sausages'
      }
    ]

    const newState = reducer(
      kintoAppMockState,
      actions.deploymentEnvironmentsReceive('1', environmentsData)
    )

    expect(newState.byId['1'].environments[0].name).toBe('EnvironmentName')
    expect(newState.byId['1'].environments.length).toBe(2)
  })

  it('deploymentEnvironmentReceive should update the dependencies section for the env', () => {
    const kintoAppMockState = {
      byId: {
        '1': {
          id: '1',
          name: 'KintoApp',
          environments: [
            {
              id: '2',
              name: 'EnvironmentName'
            },
            {
              id: '3',
              name: 'Sausages'
            }
          ]
        }
      }
    }
    const newState = reducer(
      kintoAppMockState,
      actions.deploymentEnvironmentReceive('2', '1', ['dep1'])
    )
    expect(
      newState.byId['1'].environments.find(e => e.id === '2').dependencies
    ).toEqual(['dep1'])
  })

  it('deploymentEnvironmentsReceive should override the list of environments currently in the store', () => {
    const environmentMockState = {
      byId: {
        '20': {
          id: '20',
          name: 'kintocloud',
          environments: [
            {
              id: '1',
              name: 'original_environment'
            },
            {
              id: '2',
              name: 'original_environment2'
            },
            {
              id: '3',
              name: 'original_environment3'
            }
          ]
        }
      }
    }

    const environmentsData = [
      {
        id: '1',
        name: 'EnvironmentName'
      },
      {
        id: '2',
        name: 'Sausages'
      }
    ]

    const newState = reducer(
      environmentMockState,
      actions.deploymentEnvironmentsReceive('1', environmentsData)
    )

    expect(newState.byId['1'].environments[0].name).toBe('EnvironmentName')
    expect(newState.byId['1'].environments.length).toBe(2)
  })

  it('deploymentEnvironmentListReorder should change the order of environments belonging to a single app in the store', () => {
    const environmentMockState = {
      byId: {
        '20': {
          id: '20',
          name: 'kintocloud',
          environments: [
            {
              id: '1',
              name: 'FIRST_ENVIRONMENT'
            },
            {
              id: '2',
              name: 'SECOND_ENVIRONMENT'
            }
          ]
        }
      }
    }

    const newState = reducer(
      environmentMockState,
      actions.deploymentEnvironmentListReorder('20', 0, 1)
    )

    expect(newState.byId['20'].environments[0].name).toBe('SECOND_ENVIRONMENT')
  })

  it('newEnvironmentReceive should add a new environment to the array of environments belonging to a KintoApp in the store', () => {
    const environmentMockState = {
      byId: {
        '20': {
          id: '20',
          name: 'kintocloud',
          environments: [
            {
              id: '1',
              name: 'FIRST_ENVIRONMENT'
            },
            {
              id: '2',
              name: 'SECOND_ENVIRONMENT'
            }
          ]
        }
      }
    }

    const sampleSingleResponseData = {
      data: {
        id: '1',
        name: 'NewEnvironment'
      }
    }

    const newState = reducer(
      environmentMockState,
      actions.newEnvironmentReceive('20', sampleSingleResponseData)
    )

    expect(newState.byId['20'].environments.length === 3)
  })

  it('selectWorkspace removes all kintoapps', () => {
    const oldState = {
      byId: { data: 'test' },
      allIds: [1, 2, 3]
    }
    const newState = reducer(oldState, workspaceSelect('1'))
    expect(newState.allIds.length).toBe(0)
    expect(newState.byId).toEqual({})
  })

  it('getDependencyConfigDefault replaces the config params with the default params', () => {
    const oldState = {
      byId: {
        1: {
          dependenciesConfig: {
            data: [
              {
                blockId: '2',
                dependencyId: 'dependency1',
                params: [{ key: 'thisKey', value: 'thisValue' }]
              }
            ]
          }
        }
      }
    }

    const sampleResponseData = {
      blockId: '2',
      dependencyId: 'dependency1',
      params: [{ key: 'thatKey', value: 'thatValue' }]
    }

    const newState = reducer(
      oldState,
      actions.deploymentDependencyConfigDefaultReceive(
        '1',
        '2',
        sampleResponseData
      )
    )
    expect(newState.byId[1].dependenciesConfig.data[0].params).toEqual([
      { key: 'thatKey', value: 'thatValue' }
    ])
  })
})
