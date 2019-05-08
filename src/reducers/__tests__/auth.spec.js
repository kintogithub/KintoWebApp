import reducer from '../auth'
import * as actions from '../../actions/auth'
import * as authHelper from '../../helpers/authHelper'

describe('Auth Reducer', () => {
  it('tokenUpdate updates the state to whatever is passed', () => {
    authHelper.setToken = jest.fn()
    const result = reducer(undefined, actions.tokenUpdate('1'))
    expect(result.token).toBe('1')
  })

  it('login set isloggedin to true', () => {
    authHelper.setIsLoggedIn = jest.fn()
    const result = reducer(undefined, actions.login())
    expect(result.isLoggedIn).toBe(true)
  })

  it('logout removes existing state', () => {
    authHelper.setToken = jest.fn()
    authHelper.setIsLoggedIn = jest.fn()
    const result = reducer({ token: '1', isLoggedIn: true }, actions.logout())
    expect(result).toEqual({})
  })
})
