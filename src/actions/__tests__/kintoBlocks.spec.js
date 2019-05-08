import moxios from 'moxios'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { CALL_HISTORY_METHOD } from 'react-router-redux'
import { BRANCH, TAG } from 'constants/version'
import * as actions from '../kintoBlocks'
import * as currentUserActions from '../currentUser'
import { FORM_SUBMITTED, TOGGLE_CONGRATS_MODAL } from '../pageOptions'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const now = new Date()
let secondAgo = new Date(now.getTime())
secondAgo.setSeconds(secondAgo.getSeconds() - 1)

describe('KintoBlocks actions', () => {
  beforeEach(() => {
    moxios.install()
  })
  afterEach(() => {
    moxios.uninstall()
  })

  it('fetchKintoBlocks fire a kintoBlockReceive action', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          data: [
            {
              data: 'data',
              versions: [],
              version: { name: 'name', type: BRANCH }
            }
          ]
        }
      })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' },
      tutorial: { isTutorial: false }
    })
    await store.dispatch(actions.fetchKintoBlocks())
    expect(store.getActions()).toEqual([
      {
        type: actions.RECEIVE_KINTO_BLOCKS,
        data: [
          {
            data: 'data',
            versions: [],
            version: { name: 'name', type: BRANCH }
          }
        ]
      }
    ])
  })

  it('fetchKintoBlock fires a receive action and converts blockType to type', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          data: {
            id: '1',
            version: {},
            blockType: 'micro'
          }
        }
      })
    })

    const store = mockStore({
      workspaces: { selectedWorkspace: '1' },
      kintoBlocks: { byId: {} }
    })

    await store.dispatch(actions.fetchKintoBlock('1', '1.3.1'))
    expect(store.getActions()).toEqual([
      {
        type: actions.RECEIVE_KINTO_BLOCK,
        id: '1',
        data: {
          id: '1',
          version: {},
          type: 'micro',
          blockType: 'micro'
        },
        metadata: undefined
      }
    ])
  })

  it('createKintoBlock fires a form submitted and redirect if response is a success', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          data: { id: '1', version: { name: 'name', type: 'branch' } }
        }
      })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' },
      currentUser: { id: '1' },
      tutorial: { isTutorial: false },
      kintoBlocks: { allIds: ['1', '2', '3'] }
    })
    await store.dispatch(actions.createKintoBlock({}))
    expect(store.getActions().map(a => a.type)).toEqual([
      FORM_SUBMITTED,
      actions.ADD_KINTO_BLOCK,
      CALL_HISTORY_METHOD
    ])
  })

  it('createKintoBlock fires an update current user progress and show success message actions if tutorial mode is true', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          data: { id: '1', version: { name: 'name', type: 'branch' } }
        }
      })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' },
      currentUser: { id: '1' },
      tutorial: { isTutorial: true },
      kintoBlocks: { allIds: ['1', '2', '3'] }
    })
    await store.dispatch(actions.createKintoBlock({}))
    expect(store.getActions().map(a => a.type)).toEqual([
      currentUserActions.UPDATE_PROGRESS_INFORMATION,
      TOGGLE_CONGRATS_MODAL,
      FORM_SUBMITTED,
      actions.ADD_KINTO_BLOCK,
      CALL_HISTORY_METHOD
    ])
  })

  it('createKintoBlock fires an update current user progress and show success message actions if the user has 1 kintoblocks', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          data: { id: '1', version: { name: 'name', type: 'branch' } }
        }
      })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' },
      currentUser: { id: '1' },
      tutorial: { isTutorial: false },
      kintoBlocks: { allIds: ['1'] }
    })
    await store.dispatch(actions.createKintoBlock({}))
    expect(store.getActions().map(a => a.type)).toEqual([
      currentUserActions.UPDATE_PROGRESS_INFORMATION,
      TOGGLE_CONGRATS_MODAL,
      FORM_SUBMITTED,
      actions.ADD_KINTO_BLOCK,
      CALL_HISTORY_METHOD
    ])
  })

  it("updateKintoBlock fires formsubmitted and kintoBlockUpdate actions if response doesn't have an error", async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          data: { id: '1', name: 'test' }
        }
      })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' }
    })
    await store.dispatch(
      actions.updateKintoBlock('1', '0.1.0', 'BRANCH', { name: 'test' })
    )
    expect(store.getActions()).toEqual([
      {
        type: FORM_SUBMITTED
      },
      {
        type: actions.UPDATE_KINTO_BLOCK,
        id: '1',
        data: {
          id: '1',
          name: 'test'
        }
      }
    ])
  })

  it('updateKintoBlock throws if result has errors', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: { errors: 'error' }
      })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' }
    })
    const result = store.dispatch(actions.updateKintoBlock('1', {}))
    await expect(result).rejects.toEqual({ errors: 'error' })
  })

  it('createKintoBlockTag fires a redirect actions on success', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          data: { id: 1, name: 'test', version: { name: 'new', type: TAG } }
        }
      })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' }
    })
    await store.dispatch(
      actions.createKintoBlockTag(1, 'master', 'buildid', {
        tag: '1'
      })
    )
    expect(store.getActions().map(a => a.type)).toEqual([CALL_HISTORY_METHOD])
  })

  it('createKintoBlockTag throws if result has errors', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: { errors: 'error' }
      })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' }
    })
    const result = store.dispatch(
      actions.createKintoBlockTag('1', { errors: 'error' })
    )
    await expect(result).rejects.toEqual({ errors: 'error' })
  })

  it('fetchKintoBlockDependenciesData fires kintoBlockReceiveDependencies actions and returns processed object', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          data: { id: '1', name: 'test', version: '1.3.1' },
          metadata: []
        }
      })
    })
    const store = mockStore({
      workspaces: { selectedWorkspace: '1' }
    })
    const result = await store.dispatch(
      actions.fetchKintoBlockDependenciesData('1', '1.3.1')
    )
    expect(result).toEqual({ blockId: '1', version: '1.3.1' })
    expect(store.getActions()).toEqual([
      {
        type: actions.RECEIVE_KINTO_BLOCK_DEPENDENCIES,
        data: { id: '1', name: 'test', version: '1.3.1' },
        metadata: []
      }
    ])
  })

  it("refreshCommits doesn't fire any action if type is TAG", async () => {
    const store = mockStore({ workspaces: {} })
    await store.dispatch(actions.refreshCommits('1', '1.3.1', TAG))
    expect(store.getActions()).toEqual([])
  })

  it('refreshCommits fires kintoBlockUpdateBuilds when its successful', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          data: { id: '1' }
        }
      })
    })
    const store = mockStore({ workspaces: { selectedWorkspace: '1' } })
    await store.dispatch(actions.refreshCommits('1', '1.3.1', BRANCH))
    expect(store.getActions()).toEqual([
      {
        type: actions.UPDATE_BUILDS_KINTO_BLOCK,
        id: '1',
        data: { id: '1' }
      }
    ])
  })

  it.skip('retryBuild fires a kintoBlockUpdateBuild when request is success', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: { build: 'buildname' }
      })
    })
    const store = mockStore({ workspaces: { selectedWorkspace: '1' } })

    await store.dispatch(actions.retryBuild('1', 'master', 'build1'))

    expect(store.getActions()).toEqual([
      {
        type: actions.UPDATE_BUILD_KINTO_BLOCK,
        id: '1',
        buildId: 'build1',
        data: 'buildname'
      }
    ])
  })

  it('getKintoBlockBuilds gets a response for builds and formats it for the page', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: [{ log: 'some-text' }]
      })
    })

    const store = mockStore({ workspaces: { selectedWorkspace: '1' } })

    const result = await store.dispatch(
      actions.getKintoBlockBuilds('name', '2')
    )

    expect(result).toEqual({ data: [{ text: 'some-text' }] })
  })

  it('getDependencyConfigDefault gets a response for the default kintoblock config', async () => {
    const response = {
      configs: [
        {
          blockId: '3',
          dependencyId: '1',
          hardwareData: '',
          params: [{ key: 'thisKey', value: 'thisValue' }],
          deploymentId: '1'
        }
      ]
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
      actions.getDependencyConfigDefault('1', '2', '3', '0.1.0', 'tag')
    )

    expect(store.getActions()).toEqual([
      {
        type: 'RECEIVE_DEPLOYMENT_DEPENDENCY_DEFAULT',
        deploymentId: '1',
        blockId: '3',
        data: response.configs[0]
      }
    ])
  })
})
