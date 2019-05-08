import { LOCATION_CHANGE } from 'react-router-redux'
import { actionTypes } from 'redux-form'
import tutorial, {
  skipDefaultChangeAction,
  requireTwoItemsToBeDone
} from 'constants/tutorial'
import { pages } from 'constants/pages'
import reducer from '../tutorial'
import * as actions from 'actions/tutorial'

describe('Tutorial Reducer', () => {
  it('locationChange detects if the page is in tutorial and sets the state with isTutorial', () => {
    const actionResult = {
      type: LOCATION_CHANGE,
      payload: {
        pathname: '/app/dashboard/1/deployments/create',
        search: '?tutorial=true'
      }
    }
    const result = reducer(undefined, actionResult)
    expect(result.isTutorial).toEqual(true)
  })

  it('locationChange when page is in tutorial set active item as the first one', () => {
    const actionResult = {
      type: LOCATION_CHANGE,
      payload: {
        pathname: '/app/dashboard/1/deployments/create',
        search: '?tutorial=true'
      }
    }
    const result = reducer(undefined, actionResult)
    expect(result.activeField).toEqual(tutorial[result.activePage].fields[0])
  })

  it('locationChange when page is in tutorial mode but its not found in constants then set isTutorial to false', () => {
    const actionResult = {
      type: LOCATION_CHANGE,
      payload: {
        pathname: '/unkown-page',
        search: '?tutorial=true'
      }
    }
    const result = reducer(undefined, actionResult)
    expect(result.isTutorial).toEqual(false)
  })

  it('inputChange skip if page is not in tutorial', () => {
    const actionResult = {
      type: actionTypes.CHANGE,
      payload: 'value',
      meta: {
        field: 'fieldName'
      }
    }
    const oldState = { isTutorial: false }
    const result = reducer(oldState, actionResult)
    expect(result).toEqual(oldState)
  })

  it('inputChange skip if field is not in the tutorial constants', () => {
    const actionResult = {
      type: actionTypes.CHANGE,
      payload: 'value',
      meta: {
        field: 'unkownfield'
      }
    }
    const oldState = {
      activePage: pages.dashboardDeploymentsCreate,
      isTutorial: true,
      doneFields: {}
    }
    const result = reducer(oldState, actionResult)
    expect(result).toBe(oldState)
  })

  it('inputChange skip if field has the same truthy value for doneFields', () => {
    const actionResult = {
      type: actionTypes.CHANGE,
      payload: 'value',
      meta: {
        field: 'name'
      }
    }
    const oldState = {
      activePage: pages.dashboardDeploymentsCreate,
      isTutorial: true,
      doneFields: {
        name: true
      }
    }
    const result = reducer(oldState, actionResult)
    expect(result).toBe(oldState)
  })

  it('inputChange skip if field is in skipDefaultChangeAction', () => {
    const actionResult = {
      type: actionTypes.CHANGE,
      payload: 'value',
      meta: {
        field: skipDefaultChangeAction[0].field,
        form: skipDefaultChangeAction[0].form
      }
    }
    const oldState = {
      activePage: pages.dashboardDeploymentsCreate,
      isTutorial: true,
      doneFields: {
        name: false
      }
    }
    const result = reducer(oldState, actionResult)
    expect(result).toBe(oldState)
  })

  it('inputChange sets doneFields for that input to true when it has value', () => {
    const actionResult = {
      type: actionTypes.CHANGE,
      payload: 'value',
      meta: {
        field: 'name'
      }
    }
    const oldState = {
      activePage: pages.dashboardDeploymentsCreate,
      isTutorial: true,
      doneFields: {}
    }
    const result = reducer(oldState, actionResult)
    expect(result.doneFields.name).toEqual(true)
  })

  it('inputChange sets doneFields for that input to false when it has empty string', () => {
    const actionResult = {
      type: actionTypes.CHANGE,
      payload: '',
      meta: {
        field: 'name'
      }
    }
    const oldState = {
      activePage: pages.dashboardDeploymentsCreate,
      isTutorial: true,
      doneFields: { name: true }
    }
    const result = reducer(oldState, actionResult)
    expect(result.doneFields.name).toEqual(false)
  })

  it('cancelTutorialMode changes isTutorial to false', () => {
    const actionResult = {
      type: actions.CANCEL_TUTORIAL_MODE
    }
    const oldState = {
      isTutorial: true
    }
    const result = reducer(oldState, actionResult)
    expect(result.isTutorial).toEqual(false)
  })

  it('goToNextItem changes field to true in doneFields and assigns the new activeField', () => {
    const actionResult = {
      type: actions.GO_TO_NEXT_ITEM,
      fieldName: 'A',
      nextActiveField: 'B'
    }
    const oldState = {
      isTutorial: true,
      doneFields: {}
    }
    const result = reducer(oldState, actionResult)
    expect(result.doneFields['A']).toEqual(true)
    expect(result.activeField).toEqual('B')
  })

  it('goToPreviousItem changes both fields to false and assigns previous field as active field', () => {
    const actionResult = {
      type: actions.GO_TO_PREVIOUS_ITEM,
      currentFieldName: 'A',
      previousField: 'B'
    }
    const oldState = {
      isTutorial: true,
      doneFields: {
        A: true
      },
      activeField: 'A'
    }
    const result = reducer(oldState, actionResult)
    expect(result.doneFields).toEqual({ A: false, B: false })
    expect(result.activeField).toEqual('B')
  })

  it('tutorialRefreshActiveItem should push the tutorial to the first unfinished step', () => {
    const actionResult = {
      type: actions.TUTORIAL_REFRESH_ACTIVE_ITEM
    }
    const tutorialFields = tutorial[pages.dashboardDeploymentsCreate]

    const oldState = {
      isTutorial: true,
      doneFields: { [tutorialFields.fields[0]]: true },
      activePage: pages.dashboardDeploymentsCreate
    }
    const result = reducer(oldState, actionResult)
    expect(result.activeField).toEqual(tutorialFields.fields[1])
  })

  it('inputFocus returns the current field as the active field', () => {
    const actionResult = {
      type: actionTypes.FOCUS,
      meta: {
        field: 'name'
      }
    }
    const oldState = {
      isTutorial: true,
      activePage: 'DASHBOARD_KINTO_BLOCKS_CREATE'
    }
    const result = reducer(oldState, actionResult)
    expect(result.activeField).toEqual('name')
  })

  it('tutorialUpdateFieldStatus marks the field as done if value is truthy', () => {
    const actionResult = actions.tutorialUpdateFieldStatus(
      'form',
      'aField',
      'truthy'
    )
    const oldState = {
      isTutorial: true,
      doneFields: {}
    }
    const result = reducer(oldState, actionResult)
    expect(result.doneFields.aField).toEqual(true)
  })

  it('tutorialUpdateFieldStatus marks the field as not done if value is empty', () => {
    const actionResult = actions.tutorialUpdateFieldStatus('form', 'aField', '')
    const oldState = {
      isTutorial: true,
      doneFields: { aField: true }
    }
    const result = reducer(oldState, actionResult)
    expect(result.doneFields.aField).toEqual(false)
  })

  it('tutorialUpdateFieldStatus marks the field as done if value is an array of 1 item', () => {
    const actionResult = actions.tutorialUpdateFieldStatus('form', 'aField', [
      1
    ])
    const oldState = {
      isTutorial: true,
      doneFields: {}
    }
    const result = reducer(oldState, actionResult)
    expect(result.doneFields.aField).toEqual(true)
  })

  it('tutorialUpdateFieldStatus marks the field as not done if value is an array of 0 item', () => {
    const actionResult = actions.tutorialUpdateFieldStatus('form', 'aField', [])
    const oldState = {
      isTutorial: true,
      doneFields: { aField: true }
    }
    const result = reducer(oldState, actionResult)
    expect(result.doneFields.aField).toEqual(false)
  })

  it('tutorialUpdateFieldStatus will be skipped if isTutorial is false', () => {
    const actionResult = actions.tutorialUpdateFieldStatus('form', 'aField', [
      1
    ])
    const oldState = {
      isTutorial: false,
      doneFields: {}
    }
    const result = reducer(oldState, actionResult)
    expect(result).toBe(oldState)
  })

  it('tutorialUpdateFieldStatus mark a value as falsy if the array has 1 item and the field should have at least two items', () => {
    const { form, field } = requireTwoItemsToBeDone[0]
    const actionResult = actions.tutorialUpdateFieldStatus(form, field, [1])
    const oldState = {
      isTutorial: true,
      doneFields: { [field]: true }
    }
    const result = reducer(oldState, actionResult)
    expect(result.doneFields[field]).toEqual(false)
  })

  it('tutorialUpdateFieldStatus mark a value as truthy if the array has 2 items and the field should have at least two items', () => {
    const { form, field } = requireTwoItemsToBeDone[0]
    const actionResult = actions.tutorialUpdateFieldStatus(form, field, [1, 2])
    const oldState = {
      isTutorial: true,
      doneFields: { [field]: false }
    }
    const result = reducer(oldState, actionResult)
    expect(result.doneFields[field]).toEqual(true)
  })
})
