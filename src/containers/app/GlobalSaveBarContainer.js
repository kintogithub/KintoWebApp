import { connect } from 'react-redux'
import { submit } from 'redux-form'
import GlobalSaveBar from '../../components/app/GlobalSaveBar'
import forms from 'constants/forms'
import isEmpty from 'lodash/isEmpty'

function mapStateToProps(state) {
  const { activePage, canSave } = state.pageOptions
  let form = forms[activePage] || {}
  const hasForm = !isEmpty(form)
  let toggleSaveButton = hasForm && form.toggleVisibility

  return {
    canSave,
    hasForm,
    toggleSaveButton,
    formName: form.formName,
    submitLabel: form.submitLabel,
    buttonClass: form.buttonClass
  }
}

function mergeProps(stateProps, dispatchProps) {
  return {
    ...stateProps,
    onSubmit: () => {
      dispatchProps.submit(stateProps.formName)
    }
  }
}

export default connect(
  mapStateToProps,
  { submit },
  mergeProps
)(GlobalSaveBar)
