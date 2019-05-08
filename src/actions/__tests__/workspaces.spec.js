import thunk from 'redux-thunk'
import moxios from 'moxios'
import { CALL_HISTORY_METHOD } from 'react-router-redux'
import configureStore from 'redux-mock-store'
import { REFRESH_PAGE } from 'constants/errorPageTypes'
import { defaultLimitations } from 'constants/limitations'
import * as actions from '../workspaces'
import * as pageOptionActions from '../pageOptions'
import * as currentUserActions from '../currentUser'
import {
  FORM_SUBMITTED,
  SHOW_ERROR_PAGE,
  TOGGLE_CONGRATS_MODAL
} from '../pageOptions'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('workspaces actions', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('fetchWorkspaces fires the workspaces fetch function, and the workspaces receive action', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {}
      })
    })
    const store = mockStore()
    await store.dispatch(actions.fetchWorkspaces())
    expect(store.getActions().map(a => a.type)).toEqual([
      actions.FETCH_WORKSPACES,
      actions.RECEIVE_WORKSPACES
    ])
  })

  it('fetchWorkspaces fires showErrorPage with refresh page type when request fails', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 400,
        response: {}
      })
    })
    const store = mockStore()
    await store.dispatch(actions.fetchWorkspaces())
    expect(store.getActions()).toEqual([
      { type: actions.FETCH_WORKSPACES },
      { type: SHOW_ERROR_PAGE, errorType: REFRESH_PAGE }
    ])
  })

  it('fetchWorkspace fires workspaces receive action when request is successful', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          data: {
            gitSources: {}
          }
        }
      })
    })
    const store = mockStore()
    await store.dispatch(actions.fetchWorkspace('1'))
    expect(store.getActions()).toEqual([
      {
        workspaceId: '1',
        isAdd: false,
        data: { gitSources: {}, limitations: defaultLimitations },
        type: actions.RECEIVE_WORKSPACE
      }
    ])
  })

  it('fetchWorkspace sets gitSources to an empty object if its undefined', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          data: {}
        }
      })
    })
    const store = mockStore()
    await store.dispatch(actions.fetchWorkspace('1'))
    expect(store.getActions()).toEqual([
      {
        workspaceId: '1',
        isAdd: false,
        data: { gitSources: {}, limitations: defaultLimitations },
        type: actions.RECEIVE_WORKSPACE
      }
    ])
  })

  it('createWorkspace fires formSubmitted and redirect actions', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: { data: { workspaceId: '1' } }
      })
    })
    const store = mockStore({
      currentUser: { id: '1' },
      tutorial: { isTutorial: false },
      workspaces: { allIds: ['1', '2', '3'] }
    })
    await store.dispatch(actions.createWorkspace({ members: [] }))
    expect(store.getActions().map(a => a.type)).toEqual([
      FORM_SUBMITTED,
      actions.RECEIVE_WORKSPACE,
      CALL_HISTORY_METHOD,
      actions.FETCH_WORKSPACES // TODO we call get all workspaces as a hack for backend
    ])
  })

  it('createWorkspace fires an action to update current user progress and show success modal if the user has one workspace', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: { data: { workspaceId: '1' } }
      })
    })
    const store = mockStore({
      currentUser: { id: '1' },
      tutorial: { isTutorial: false },
      workspaces: { allIds: ['1'] }
    })
    await store.dispatch(actions.createWorkspace({ members: [] }))
    expect(store.getActions().map(a => a.type)).toEqual([
      FORM_SUBMITTED,
      actions.RECEIVE_WORKSPACE,
      currentUserActions.UPDATE_PROGRESS_INFORMATION,
      TOGGLE_CONGRATS_MODAL,
      CALL_HISTORY_METHOD,
      actions.FETCH_WORKSPACES
    ])
  })

  it('createWorkspace fires an action to update current user progress and show success modal if the user is in tutorial', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: { data: { workspaceId: '1' } }
      })
    })
    const store = mockStore({
      currentUser: { id: '1' },
      tutorial: { isTutorial: true },
      workspaces: { allIds: ['1', '2'] }
    })
    await store.dispatch(actions.createWorkspace({ members: [] }))
    expect(store.getActions().map(a => a.type)).toEqual([
      FORM_SUBMITTED,
      actions.RECEIVE_WORKSPACE,
      currentUserActions.UPDATE_PROGRESS_INFORMATION,
      TOGGLE_CONGRATS_MODAL,
      CALL_HISTORY_METHOD,
      actions.FETCH_WORKSPACES
    ])
  })

  it('updateWorkspace fires formSubmitted and workspaceReceive actions from what is coming from the server and initializes gitSources', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: { data: { name: 'name' } }
      })
    })
    const store = mockStore()
    await store.dispatch(actions.updateWorkspace('1', { name: 'name' }))
    expect(store.getActions()).toEqual([
      { type: FORM_SUBMITTED },
      {
        type: actions.RECEIVE_WORKSPACE,
        workspaceId: '1',
        data: {
          name: 'name',
          // TODO remove when backend is done
          limitations: defaultLimitations,
          gitSources: {}
        },
        isAdd: false
      }
    ])
  })

  // TODO: add test with interceptor

  it('continueWithoutJoiningWorkspace fires a clearWorkspaceInvite action', async () => {
    const store = mockStore()
    await store.dispatch(actions.continueWithoutJoiningWorkspace())
    expect(store.getActions()[0].type).toEqual(
      pageOptionActions.CLEAR_WORKSPACE_INVITE
    )
  })
})
