import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import * as actions from '../tutorial'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('Tutorial actions', () => {
  it('updateTutorialFieldStatus fires tutorialUpdateFieldStatus with values in store for the field passed', () => {
    const store = mockStore({ form: { testForm: { values: { a: 'value' } } } })
    store.dispatch(actions.updateTutorialFieldStatus('testForm', 'a'))
    expect(store.getActions()).toEqual([
      {
        type: actions.TUTORIAL_UPDATE_FIELD_STATUS,
        field: 'a',
        value: 'value',
        form: 'testForm'
      }
    ])
  })
})
