import reducer from '../workspaces'
import { PENDING, ACCEPTED } from 'constants/inviteStates'

import * as actions from '../../actions/workspaces'

describe('workspaces reducer', () => {
  it('workspaceSelect updates the selected workspace', () => {
    const newState = reducer(undefined, actions.workspaceSelect('1'))
    expect(newState.selectedWorkspace).toBe('1')
  })

  it('workspaceReceive updates the correct workspace', () => {
    const oldState = {
      byId: { id: '1', name: 'test' },
      allIds: ['1']
    }
    const action = actions.workspaceReceive('1', {
      id: '1',
      name: 'test',
      members: [1, 2]
    })
    const newState = reducer(oldState, action)
    expect(newState.byId['1'].members).toEqual([1, 2])
  })

  it('workspaceReceive sorts that workspace members by roles', () => {
    const oldState = {
      byId: { id: '1', name: 'test' },
      allIds: ['1']
    }
    const action = actions.workspaceReceive('1', {
      id: '1',
      name: 'test',
      members: [{ name: 'test 2', role: 'Z' }, { name: 'test 1', role: 'A' }]
    })
    const newState = reducer(oldState, action)
    expect(newState.byId['1'].members[0].name).toEqual('test 1')
    expect(newState.byId['1'].members[1].name).toEqual('test 2')
  })

  it('workspaceReceive sorts members and show pending ones last', () => {
    const oldState = {
      byId: { id: '1', name: 'test' },
      allIds: ['1']
    }
    const action = actions.workspaceReceive('1', {
      id: '1',
      name: 'test',
      members: [
        { name: 'test 2', role: 'A', inviteState: PENDING },
        { name: 'test 1', role: 'Z', inviteState: ACCEPTED }
      ]
    })
    const newState = reducer(oldState, action)
    expect(newState.byId['1'].members[0].name).toEqual('test 1')
    expect(newState.byId['1'].members[1].name).toEqual('test 2')
  })

  it('workspacesReceive should add ids to the store under allIds, and add the object to the store under byId', () => {
    const sampleData = [
      {
        workspaceId: '1',
        name: 'test'
      }
    ]
    const newState = reducer(undefined, actions.workspacesReceive(sampleData))
    expect(newState.allIds).toEqual(['1'])
    expect(newState.byId).toEqual({ '1': { workspaceId: '1', name: 'test' } })
  })

  it('servicesReceive should update the service in the correct workspace', () => {
    const oldState = {
      byId: {
        '1': {
          workspaceId: '1',
          services: [
            {
              service: 'test',
              isActive: false
            },
            {
              service: 'not_test',
              isActive: false
            }
          ]
        }
      }
    }
    const sampleData = {
      service: 'test',
      isActive: true
    }
    const newState = reducer(oldState, actions.serviceReceive('1', sampleData))
    expect(newState.byId['1']).toEqual({
      workspaceId: '1',
      services: [
        {
          service: 'not_test',
          isActive: false
        },
        {
          service: 'test',
          isActive: true
        }
      ]
    })
  })
})
