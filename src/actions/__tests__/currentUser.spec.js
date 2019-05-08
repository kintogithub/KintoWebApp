import moxios from 'moxios'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import * as actions from '../currentUser'
import * as onboardingHelper from '../../helpers/onboardingHelper'
import { SHOW_ERROR_PAGE } from '../pageOptions'
import { REFRESH_PAGE } from '../../constants/errorPageTypes'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('currentUser actions', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('fetchCurrentUser when is successful fires currentUserReceiveInfo action', async () => {
    onboardingHelper.initialiseProgressInStorage = jest.fn()
    onboardingHelper.getProgressFromStorage = jest.fn()
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: { data: { id: 1 } }
      })
    })
    const store = mockStore()
    await store.dispatch(actions.fetchCurrentUser())
    expect(store.getActions()).toEqual([
      {
        type: actions.RECEIVE_CURRENT_USER_INFO,
        data: { id: 1 }
      },
      {
        type: actions.INITIALIZE_PROGRESS_INFORMATION,
        data: onboardingHelper.getProgressFromStorage(1)
      }
    ])
  })

  it('fetchCurrentUser fires showErrorPage with refresh page type when request fails', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 400,
        response: {}
      })
    })
    const store = mockStore()
    await store.dispatch(actions.fetchCurrentUser())
    expect(store.getActions()).toEqual([
      { type: SHOW_ERROR_PAGE, errorType: REFRESH_PAGE }
    ])
  })

  it('completeAction updates the store with the completed action', () => {
    onboardingHelper.completedOnboarding = jest.fn()

    const item = {
      kintoBlocks: false,
      deployments: false,
      workspaces: false,
      documentation: true
    }
    const store = mockStore()
    store.dispatch(actions.completeAction(item, 1))
    expect(store.getActions()).toEqual([
      {
        item: {
          kintoBlocks: false,
          deployments: false,
          workspaces: false,
          documentation: true
        },
        type: actions.UPDATE_PROGRESS_INFORMATION
      }
    ])
  })
})
