import moxios from 'moxios'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import * as actions from '../deploymentLogs'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('deploymentLogs actions', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('fetchDeploymentConsoleLogs when is successful fires deploymentConsoleLogsReceive action', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {}
      })
    })
    const store = mockStore({ workspaces: { selectedWorkspace: '1' } })
    await store.dispatch(
      actions.fetchDeploymentConsoleLogs(
        'id',
        'appversion',
        'envid',
        '1',
        'block',
        'type',
        {}
      )
    )
    expect(store.getActions()).toEqual([
      {
        type: actions.RECEIVE_DEPLOYMENT_CONSOLE_LOGS,
        blockName: 'block',
        data: {},
        envId: 'envid',
        id: 'id',
        isPolling: false,
        releaseNumber: '1',
        appVersion: 'appversion'
      }
    ])
  })

  it('fetchDeploymentConsoleLogs when there is no startDate ispolling is false', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {}
      })
    })
    const store = mockStore({ workspaces: { selectedWorkspace: '1' } })
    await store.dispatch(
      actions.fetchDeploymentConsoleLogs(
        'id',
        'appversion',
        'envid',
        '1',
        'block',
        'type',
        {}
      )
    )
    expect(store.getActions()[0].isPolling).toEqual(false)
  })

  it('fetchDeploymentConsoleLogs when there is startDate ispolling is true', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {}
      })
    })
    const store = mockStore({ workspaces: { selectedWorkspace: '1' } })
    await store.dispatch(
      actions.fetchDeploymentConsoleLogs(
        'id',
        'appversion',
        'envid',
        '1',
        'blockname',
        'type',
        { startDate: 'value' }
      )
    )
    expect(store.getActions()[0].isPolling).toEqual(true)
  })
})
