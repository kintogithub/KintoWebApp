import moxios from 'moxios'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { CALL_HISTORY_METHOD } from 'react-router-redux'
import * as actions from '../deployments'
import * as currentUserActions from '../currentUser'
import {
  FORM_SUBMITTED,
  TOGGLE_CONGRATS_MODAL,
  SELECT_ENVIRONMENT,
  SHOW_NOTIFICATION
} from '../pageOptions'
import { deploymentState } from 'constants/deploymentStates'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const appWithDeployedEnv = {
  id: '1',
  environments: [
    {
      id: '1',
      name: 'master',
      releases: [
        {
          version: { name: '1.0.0' },
          steps: [{ state: deploymentState.success }]
        }
      ]
    }
  ]
}

describe('Deployments actions', () => {
  beforeEach(() => {
    moxios.install()
  })
  afterEach(() => {
    moxios.uninstall()
  })

  it('fetchDeployment fires the deploymentReceive action with the deployed version and select env', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          data: {
            id: '1',
            name: 'test'
          },
          metadata: {}
        }
      })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' },
      deployments: {
        byId: {
          '1': {
            environments: [
              {
                id: 'env1',
                releases: [{ version: { name: '1.0.0' }, steps: [{}] }]
              }
            ]
          }
        }
      }
    })
    await store.dispatch(actions.fetchDeployment('1', 'env1'))
    expect(store.getActions()).toEqual([
      {
        id: 'env1',
        type: SELECT_ENVIRONMENT
      },
      {
        type: actions.RECEIVE_DEPLOYMENT,
        id: '1',
        data: {
          id: '1',
          name: 'test'
        },
        metadata: {}
      }
    ])
  })

  it('fetchDeployments should call a receive action if there are Deployments', async () => {
    const result = {
      data: {
        id: '1',
        name: 'Your Mum'
      }
    }
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: result
      })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' },
      tutorial: { isTutorial: false }
    })
    await store.dispatch(actions.fetchDeployments())
    expect(store.getActions()).toEqual([
      { type: actions.RECEIVE_DEPLOYMENTS, data: result.data }
    ])
  })

  it('fetchDeploymentDependenciesConfig should call a receive action', async () => {
    const response = {
      data: [
        {
          id: '1',
          version: {
            minor: 1,
            state: 'DRAFT'
          }
        }
      ],
      metadata: {
        dependencies: {
          '1': {
            name: 'your mum',
            type: 'KINTOBLOCK',
            description: 'some stuff',
            versions: [
              {
                minor: 1
              }
            ]
          }
        }
      }
    }
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: response
      })
    })
    const store = mockStore({ workspaces: { selectedWorkspace: '1' } })
    await store.dispatch(
      actions.fetchDeploymentDependenciesConfig('1', '0.1.0', '1')
    )
    expect(store.getActions()).toEqual([
      {
        type: actions.RECEIVE_DEPLOYMENT_DEPENDENCIES_CONFIG,
        id: '1',
        envId: '1',
        ver: '0.1.0',
        data: response.data
      }
    ])
  })

  it.skip('createDeployment should fire a form submitted action, add deployment, deploy a deployment and redirect upon success', async () => {
    const createUrlRegex = /.*1\/kintoapps.*/
    const updateUrlRegex = /.*1\/kintoapps\/id\/environments\/env1\/deploy.*/

    moxios.wait(() => {
      moxios.stubRequest(createUrlRegex, {
        status: 200,
        response: {
          data: {
            id: 'id',
            environments: [{ id: 'env1' }]
          }
        }
      })

      moxios.stubRequest(updateUrlRegex, {
        status: 200,
        response: {
          data: {
            id: 'id',
            environments: [{ id: 'env1' }]
          }
        }
      })
    })

    const store = mockStore({
      workspaces: { selectedWorkspace: '1' },
      tutorial: { isTutorial: false },
      pageOptions: {
        selectedDeploymentId: 'id',
        selectedEnvironmentId: 'env1'
      },
      deployments: { allIds: ['id'], byId: { id: {} } },
      currentUser: { id: '1' }
    })

    await store.dispatch(actions.createDeployment({}))

    expect(store.getActions().map(a => a.type)).toEqual([
      actions.ADD_DEPLOYMENT,
      FORM_SUBMITTED,
      actions.RECEIVE_DEPLOYMENT,
      SELECT_ENVIRONMENT,
      currentUserActions.UPDATE_PROGRESS_INFORMATION,
      TOGGLE_CONGRATS_MODAL,
      FORM_SUBMITTED,
      actions.DEPLOYMENT_ENVIRONMENT_UPDATE,
      CALL_HISTORY_METHOD
    ])
  })

  it('updateDeployment should fire a form submitted action and updateDeployment action', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: { id: '1', version: '1.0.0' }
      })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' }
    })
    await store.dispatch(actions.updateDeployment('1', '1.0.0', {}))
    expect(store.getActions().map(a => a.type)).toEqual([
      FORM_SUBMITTED,
      actions.UPDATE_DEPLOYMENT
    ])
  })

  it('updateDeployment throws if the result has errors', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: { errors: 'noop' }
      })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' }
    })
    const result = store.dispatch(actions.updateDeployment('1', '1.0.0', {}))
    await expect(result).rejects.toEqual({ errors: 'noop' })
  })

  it('updateDeploymentDependenciesConfigData should submit a form', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {}
      })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' }
    })
    await store.dispatch(
      actions.updateDeploymentDependenciesConfigData(
        '1',
        '1.0.0',
        'environmentName',
        {}
      )
    )
    expect(store.getActions().map(a => a.type)).toEqual([FORM_SUBMITTED])
  })

  it('updateDeploymentDependenciesConfigData throw if there are errors', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: { errors: 'noop' }
      })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' }
    })
    const result = store.dispatch(
      actions.updateDeploymentDependenciesConfigData(
        '1',
        '1.0.0',
        'environmentName',
        {}
      )
    )
    await expect(result).rejects.toEqual({ errors: 'noop' })
  })

  it('getDeploymentEnvironments should fire an action to receive the deployment environments', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          id: '1',
          data: {
            data: {}
          }
        }
      })
    })
    const store = mockStore({
      deployments: { byId: {} },
      workspaces: { selectedWorkspace: '1' }
    })
    await store.dispatch(actions.getDeploymentEnvironments('1'))
    expect(store.getActions().map(a => a.type)).toEqual([
      actions.RECEIVE_DEPLOYMENT_ENVIRONMENTS
    ])
  })

  it('getDeploymentEnvironment when environment has dependencies it should fire an action to receive the deployment environment', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          metadata: {
            dependencies: [{ item: 1 }]
          }
        }
      })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' }
    })
    await store.dispatch(actions.getDeploymentEnvironment('1', '2'))
    expect(store.getActions()).toEqual([
      {
        envId: '1',
        appId: '2',
        dependencies: [{ item: 1 }],
        type: actions.RECEIVE_DEPLOYMENT_ENVIRONMENT
      }
    ])
  })

  it('getDeploymentEnvironment when environment has no dependencies nothing should be fired', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {}
      })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' }
    })
    await store.dispatch(actions.getDeploymentEnvironment('1', '2'))
    expect(store.getActions()).toEqual([])
  })

  it('getDeploymentEnvironments should fire a redirect to kintoapps/list if the result is empty', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: { data: {} }
      })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' }
    })
    await store.dispatch(actions.getDeploymentEnvironments('1'))
    expect(store.getActions().map(a => a.type)).toEqual([CALL_HISTORY_METHOD])
  })

  it('addNewEnvironment should fire an action to submit a form and receive a new environment', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: { data: {} }
      })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' }
    })
    await store.dispatch(actions.addNewEnvironment('1', {}))
    expect(store.getActions().map(a => a.type)).toEqual([
      FORM_SUBMITTED,
      actions.NEW_ENVIRONMENT_RECEIVE
    ])
  })

  it('deployEnvironment should fire an action to update the environment', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: { data: {} }
      })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' },
      currentUser: { id: '1' },
      tutorial: { isTutorial: false },
      deployments: { allIds: ['1'], byId: { '1': appWithDeployedEnv } },
      deploymentEnvironments: {}
    })
    await store.dispatch(actions.deployEnvironment('1', 'name', {}))
    expect(store.getActions().map(a => a.type)).toEqual([
      FORM_SUBMITTED,
      actions.DEPLOYMENT_ENVIRONMENT_UPDATE
    ])
  })

  it('deployEnvironment should fire an action to update the tutorial progress and show success modal when isTutorial is true', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: { data: {} }
      })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' },
      currentUser: { id: '1' },
      tutorial: { isTutorial: true },
      deployments: { allIds: ['1'], byId: { '1': {} } }
    })
    await store.dispatch(actions.deployEnvironment('1', 'name', {}))
    expect(store.getActions().map(a => a.type)).toEqual([
      currentUserActions.UPDATE_PROGRESS_INFORMATION,
      TOGGLE_CONGRATS_MODAL,
      FORM_SUBMITTED,
      actions.DEPLOYMENT_ENVIRONMENT_UPDATE
    ])
  })

  it('deployEnvironment should dispatch an action to update the tutorial progress and show success modal when user has one no deployed apps', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: { data: {} }
      })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' },
      currentUser: { id: '1' },
      tutorial: { isTutorial: false },
      deployments: { allIds: ['1'], byId: { '1': {} } }
    })
    await store.dispatch(actions.deployEnvironment('1', 'name', {}))
    expect(store.getActions().map(a => a.type)).toEqual([
      currentUserActions.UPDATE_PROGRESS_INFORMATION,
      TOGGLE_CONGRATS_MODAL,
      FORM_SUBMITTED,
      actions.DEPLOYMENT_ENVIRONMENT_UPDATE
    ])
  })

  it('shutDownEnvironment should fire an action to submit a form, envUpdate and redirect', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: { data: {} }
      })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' }
    })
    await store.dispatch(actions.shutDownEnvironment('1', 'name', {}))
    expect(store.getActions().map(a => a.type)).toEqual([
      FORM_SUBMITTED,
      actions.DEPLOYMENT_ENVIRONMENT_UPDATE
    ])
  })

  it('reorderEnvironments should dispatch an action to reorder the list', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          id: '1',
          data: {
            data: {}
          }
        }
      })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' },
      deployments: {
        byId: {
          '1': {
            version: { major: 1, minor: 2, revion: 1 },
            environments: []
          }
        }
      }
    })
    await store.dispatch(actions.reorderEnvironments('1', 1, 2))
    expect(store.getActions().map(a => a.type)).toEqual([
      actions.DEPLOYMENT_ENVIRONMENT_LIST_REORDER
    ])
  })

  it('updateAppEnvironment should dispatch an action to update a kintoapp environment', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {}
      })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' }
    })
    await store.dispatch(
      actions.updateAppEnvironment('1', '1', { name: 'env' })
    )
    expect(store.getActions()).toEqual([
      { type: 'FORM_SUBMITTED' },
      {
        type: 'DEPLOYMENT_ENVIRONMENT_UPDATE',
        id: '1',
        data: { id: '1', name: 'env' }
      }
    ])
  })

  it('deleteDeployment should delete the selected deployment and display a notification', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({ status: 200, response: {} })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' },
      deployments: {
        byId: { 1: { name: 'first' }, 2: { name: 'second' } },
        allIds: ['1', '2']
      }
    })
    await store.dispatch(actions.deleteDeployment('1', 'first'))
    expect(store.getActions().map(a => a.type)).toEqual([SHOW_NOTIFICATION])
  })

  it('deleteEnvironment should delete the selected environment, redirect to a new page, and display a notification', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({ status: 200, response: {} })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' },
      deployments: {
        byId: {
          1: {
            name: 'first',
            environments: [{ id: '1', name: 'env1' }, { id: '2' }]
          },
          2: { name: 'second' }
        },
        allIds: ['1', '2']
      }
    })
    await store.dispatch(actions.deleteEnvironment('1', '1', 'env1'))
    expect(store.getActions().map(a => a.type)).toEqual([
      CALL_HISTORY_METHOD,
      SHOW_NOTIFICATION
    ])
  })
})
