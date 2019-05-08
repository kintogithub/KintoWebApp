import React from 'react'
import { reduxForm, Field } from 'redux-form'
import PropTypes from 'prop-types'
import { FieldValidation } from 'components/forms'
import { environments } from 'helpers/forms/validationFields'

const AddNewEnvironmentForm = ({
  onClose,
  handleSubmit,
  addNewEnvironment,
  deployment
}) => {
  const addNewEnvironmentandClose = result => {
    const id = deployment.id
    return addNewEnvironment(id, result).then(e => {
      onClose()
    })
  }

  return (
    <div className="add-new-environment">
      <div className="kh-modal-title">Add New Environment</div>
      <div className="kh-modal-body">
        <form onSubmit={handleSubmit(addNewEnvironmentandClose)}>
          <div className="full-width-field">
            <Field
              name="name"
              label="Environment Name"
              placeholder="Enter a name for your environment"
              component={FieldValidation}
              validate={environments.name}
              type="text"
            />
          </div>
          <div className="kh-modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="button secondary"
            >
              Cancel
            </button>
            <button type="submit" className="button dark">
              Add New Environment
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

AddNewEnvironmentForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  addNewEnvironment: PropTypes.func.isRequired,
  deployment: PropTypes.object.isRequired
}

export default reduxForm({ form: 'AddNewEnvironmentForm' })(
  AddNewEnvironmentForm
)
