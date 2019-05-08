import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { FieldValidation } from '../../../forms'
import { isLessThan200 } from 'helpers/forms/validators'
import { kintoName } from 'helpers/forms/validationFields'

class DeploymentBasicInfoModal extends PureComponent {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    environment: PropTypes.object.isRequired,
    deployment: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired
  }

  saveAndClose = async () => {
    await this.props.handleSubmit()
    this.props.onClose()
  }

  render() {
    const { onClose, environment, deployment, handleSubmit } = this.props
    return (
      <form
        className="basic-info-modal"
        onSubmit={handleSubmit(this.saveAndClose)}
      >
        <div className="kh-modal-title">
          <h4 className="title">Edit Basic Info - {deployment.name}</h4>
        </div>
        <div className="icon-wrapper">
          <img
            className="main-deployment-icon"
            src={`/images/${deployment.iconImageName}`}
            alt=""
          />
        </div>
        <div className="kh-modal-body">
          <div className="form-wrapper basic-info">
            <div className="form-body full-row">
              <Field
                name="name"
                label="deployment name"
                placeholder="Edit the deployment name"
                component={FieldValidation}
                validate={kintoName}
                type="text"
                tutorialPosition="left"
              />
              <Field
                characterCount={200}
                name="shortDescription"
                label="Description"
                placeholder="Edit your short description"
                component={FieldValidation}
                validate={isLessThan200}
                type="textarea"
                tutorialPosition="left"
                isOptional={true}
              />
              <Field
                name="environmentName"
                label="Environment name"
                placeholder={environment.name}
                component={FieldValidation}
                validate={kintoName}
                type="text"
                tutorialPosition="left"
              />
            </div>
            <div className="kh-modal-actions">
              <button
                className="secondary button"
                type="button"
                onClick={onClose}
              >
                Cancel
              </button>
              <button className="dark button" type="submit">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'deploymentBasicInfoForm',
  enableReinitialize: true
})(DeploymentBasicInfoModal)
