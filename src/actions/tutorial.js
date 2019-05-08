export const CANCEL_TUTORIAL_MODE = 'CANCEL_TUTORIAL_MODE'
export const GO_TO_NEXT_ITEM = 'GO_TO_NEXT_ITEM'
export const GO_TO_PREVIOUS_ITEM = 'GO_TO_PREVIOUS_ITEM'
export const TUTORIAL_REFRESH_ACTIVE_ITEM = 'TUTORIAL_REFRESH_ACTIVE_ITEM'
export const TUTORIAL_UPDATE_FIELD_STATUS = 'TUTORIAL_UPDATE_FIELD_STATUS'

export const cancelTutorialMode = () => ({
  type: CANCEL_TUTORIAL_MODE
})

export const refreshActiveItemInTutorial = () => ({
  type: TUTORIAL_REFRESH_ACTIVE_ITEM
})

export const tutorialUpdateFieldStatus = (form, field, value) => ({
  type: TUTORIAL_UPDATE_FIELD_STATUS,
  form,
  field,
  value
})

export const goToNextItem = (fieldName, nextActiveField) => ({
  type: GO_TO_NEXT_ITEM,
  fieldName,
  nextActiveField
})

export const goToPreviousItem = (currentFieldName, previousField) => ({
  type: GO_TO_PREVIOUS_ITEM,
  currentFieldName,
  previousField
})

export const updateTutorialFieldStatus = (form, field) => (
  dispatch,
  getState
) => {
  const value = getState().form[form].values[field]
  dispatch(tutorialUpdateFieldStatus(form, field, value))
}
