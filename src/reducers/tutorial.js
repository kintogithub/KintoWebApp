import { LOCATION_CHANGE } from 'react-router-redux'
import { actionTypes } from 'redux-form'
import {
  CANCEL_TUTORIAL_MODE,
  GO_TO_NEXT_ITEM,
  GO_TO_PREVIOUS_ITEM,
  TUTORIAL_REFRESH_ACTIVE_ITEM,
  TUTORIAL_UPDATE_FIELD_STATUS
} from 'actions/tutorial'
import { getActivePageKey } from 'helpers/pageHelper'
import tutorial, {
  skipDefaultChangeAction,
  requireTwoItemsToBeDone
} from 'constants/tutorial'

const tutorialReducer = (state = { doneFields: {} }, action) => {
  switch (action.type) {
    case LOCATION_CHANGE: {
      const url = action.payload.pathname
      const isDashboard = !url.startsWith('/app/market')
      const activePage = getActivePageKey(url, isDashboard)
      let isTutorial = action.payload.search.includes('tutorial')
      if (!tutorial[activePage]) {
        isTutorial = false
      }
      const activeField =
        isTutorial && tutorial[activePage].fields
          ? tutorial[activePage].fields[0]
          : null
      return {
        ...state,
        isTutorial,
        activeField,
        activePage,
        doneFields: {}
      }
    }

    case CANCEL_TUTORIAL_MODE: {
      return {
        ...state,
        isTutorial: false
      }
    }

    case actionTypes.ARRAY_PUSH:
    case actionTypes.CHANGE: {
      const { isTutorial, doneFields, activePage } = state
      const skip = skipDefaultChangeAction.some(
        i => i.form === action.meta.form && i.field === action.meta.field
      )
      if (!isTutorial || skip) {
        return state
      }
      const fieldName = action.meta.field
      const hasValue = !!action.payload
      const isFieldInTutorial = tutorial[activePage][fieldName]
      const hasSameValue = doneFields[fieldName] === hasValue
      if (hasSameValue || !isFieldInTutorial) {
        return state
      }
      return {
        ...state,
        doneFields: {
          ...doneFields,
          [fieldName]: hasValue
        }
      }
    }

    case TUTORIAL_UPDATE_FIELD_STATUS: {
      const { value, field, form } = action
      const { isTutorial } = state
      if (!isTutorial) {
        return state
      }
      let isDone
      if (Array.isArray(value)) {
        const requireTwoItems = requireTwoItemsToBeDone.some(
          i => i.form === form && i.field === field
        )
        isDone = requireTwoItems ? value.length > 1 : value.length > 0
      } else {
        isDone = !!value
      }
      const hasSameValue = state.doneFields[field] === isDone
      if (hasSameValue) {
        return state
      }
      return {
        ...state,
        doneFields: {
          ...state.doneFields,
          [field]: isDone
        }
      }
    }

    case actionTypes.FOCUS: {
      const { isTutorial, activePage } = state
      if (!isTutorial) {
        return state
      }
      const fieldName = action.meta.field
      const isFieldInTutorial = tutorial[activePage][fieldName]
      if (!isFieldInTutorial) {
        return state
      }
      return {
        ...state,
        activeField: fieldName
      }
    }

    case GO_TO_NEXT_ITEM: {
      const { isTutorial, doneFields } = state
      if (!isTutorial) {
        return state
      }
      const { fieldName, nextActiveField } = action

      return {
        ...state,
        doneFields: {
          ...doneFields,
          [fieldName]: true
        },
        activeField: nextActiveField
      }
    }

    case GO_TO_PREVIOUS_ITEM: {
      const { doneFields, isTutorial } = state
      if (!isTutorial) {
        return state
      }
      const { currentFieldName, previousField } = action
      return {
        ...state,
        doneFields: {
          ...doneFields,
          [currentFieldName]: false,
          [previousField]: false
        },
        activeField: previousField
      }
    }

    case TUTORIAL_REFRESH_ACTIVE_ITEM:
    case actionTypes.BLUR: {
      const { isTutorial, doneFields, activePage } = state
      if (!isTutorial) {
        return state
      }
      const firstEmptyField = tutorial[activePage].fields.find(
        f => !doneFields[f]
      )
      return {
        ...state,
        activeField: firstEmptyField
      }
    }
    default:
      return state
  }
}

export default tutorialReducer
