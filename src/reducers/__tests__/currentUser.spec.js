import reducer from '../currentUser'
import * as actions from '../../actions/currentUser'
import * as onboardingHelper from '../../helpers/onboardingHelper'

describe('Current User Reducer', () => {
  it('currentUserReceiveInfo sets the payload', () => {
    const result = reducer(
      undefined,
      actions.currentUserReceiveInfo({ id: '1', name: 'test' })
    )
    expect(result.id).toBe('1')
    expect(result.name).toBe('test')
  })

  it('getProgressInformation sets the initial onboarding data', () => {
    onboardingHelper.initialiseProgressInStorage('1')
    const result = reducer(undefined, actions.getProgressInformation('1'))

    expect(result.onboarding).toEqual({
      kintoBlocks: false,
      deployments: false,
      workspaces: false,
      documentation: false
    })
  })
})
