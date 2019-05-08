import { connect } from 'react-redux'
import HelpTooltip from '../../../components/forms/tutorial/HelpTooltip'
import tutorial from '../../../constants/tutorial'

function mapStateToProps(state, { fieldName }) {
  const { activePage, isTutorial, activeField, doneFields } = state.tutorial

  if (!isTutorial) {
    return {
      isTutorial: false
    }
  }

  const fieldInformation = tutorial[activePage] || {}
  const thisField = fieldInformation[fieldName] || {}
  const isActive = fieldName === activeField
  const isCompleted = doneFields[fieldName] === true

  return {
    thisField,
    isTutorial,
    isActive,
    isCompleted
  }
}

export default connect(mapStateToProps, undefined)(HelpTooltip)
