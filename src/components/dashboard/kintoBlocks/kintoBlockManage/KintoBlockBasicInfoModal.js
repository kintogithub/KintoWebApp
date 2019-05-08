import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import Tooltip from 'rc-tooltip'
import { WEBSITE, MICROSERVICE, SERVICE } from 'constants/kintoBlockTypes'
import { languages, languageVersions } from 'constants/supportedLanguages'
import {
  websiteTypeOptions,
  serviceTypeOptions
} from 'constants/kintoBlockFormOptions'
import { required, isLessThan200 } from 'helpers/forms/validators'
import { getKbTypeClass } from 'helpers/kintoBlocksHelper'
import { FieldValidation } from '../../../forms'

class KintoBlockBasicInfoModal extends PureComponent {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    kintoBlock: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired
  }

  saveAndClose = async () => {
    await this.props.handleSubmit()
    this.props.onClose()
  }

  getLanguage(lang, version) {
    const language = languages.find(l => l.value === lang) || {}
    const languageVersion =
      /* because Helm cannot be added to lang enum */

      (languageVersions[lang] &&
        languageVersions[lang].find(l => l.value === version)) ||
      {}
    return {
      language,
      languageVersion
    }
  }

  render() {
    const { onClose, kintoBlock, handleSubmit } = this.props
    const languageDetails = this.getLanguage(
      kintoBlock.language,
      kintoBlock.languageVersion
    )

    const allSubtypes =
      kintoBlock.type === WEBSITE ? websiteTypeOptions : serviceTypeOptions

    const subType = allSubtypes.find(x => x.value === kintoBlock.blockSubType)

    return (
      <form
        className="basic-info-modal kb-basic-info-modal"
        onSubmit={handleSubmit(this.saveAndClose)}
      >
        <div className="kh-modal-title">
          <h4 className="title">Edit Basic Info - {kintoBlock.displayName}</h4>
        </div>
        <div className="icon-wrapper">
          <img
            className="main-kintoblock-icon"
            src={`/images/${kintoBlock.iconImageName}`}
            alt="KintoBlock Icon"
          />

          <Tooltip
            placement="top"
            overlay={getKbTypeClass(kintoBlock.type)}
            trigger="hover"
            overlayClassName="kbtype"
          >
            <span
              className={`icon kb-type ${getKbTypeClass(kintoBlock.type)}`}
            />
          </Tooltip>
        </div>
        <div className="kh-modal-body">
          <div className="form-wrapper basic-info">
            <div className="form-body full-row">
              <div className="field-wrapper" data-test="name">
                <div className="label-characters">
                  <label>Kintoblock Name</label>
                </div>
                <div className="field-input-wrapper prefill-wrapper">
                  <input disabled value={kintoBlock.name} />
                </div>
              </div>
              <div className="field-wrapper" data-test="displayName">
                <div className="label-characters">
                  <label>Kintoblock Display Name</label>
                </div>
                <div className="field-input-wrapper prefill-wrapper">
                  <input disabled value={kintoBlock.displayName} />
                </div>
              </div>
              <Field
                characterCount={200}
                name="shortDescription"
                label="Description"
                placeholder="Edit your short description"
                component={FieldValidation}
                validate={[required, isLessThan200]}
                type="textarea"
                tutorialPosition="left"
                isOptional={true}
                disabled={kintoBlock.isExample}
              />
            </div>

            {kintoBlock.type === SERVICE && (
              <div className="field-wrapper">
                <label>Helm chart source folder</label>
                <div className="field-input-wrapper">
                  <input
                    disabled
                    value={
                      kintoBlock.gitSrcFolderPath
                        ? kintoBlock.gitSrcFolderPath
                        : 'No path specified'
                    }
                  />
                </div>
              </div>
            )}

            {kintoBlock.type === MICROSERVICE && (
              <div className="field-wrapper">
                <div className="two-fields">
                  <div>
                    <label>Language</label>
                    <div className="field-input-wrapper">
                      <select data-test="language" name="language" disabled>
                        <option>{languageDetails.language.label}</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label>Version</label>
                    <div className="field-input-wrapper">
                      <select data-test="language" name="language" disabled>
                        <option>{languageDetails.languageVersion.label}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {kintoBlock.type === WEBSITE && (
              <div className="field-wrapper">
                <label>
                  Website type
                  <Tooltip
                    placement="top"
                    overlay="Static Website serves your files to the internet.A Web App gives you control on how you want to serve your web content from a custom node based service."
                    trigger="click"
                  >
                    <span className="tooltip" />
                  </Tooltip>
                </label>
                <div className="field-input-wrapper">
                  <select data-test="subtype" name="subtype" disabled>
                    <option>{subType.label}</option>
                  </select>
                </div>
              </div>
            )}

            {kintoBlock.type === SERVICE && (
              <div className="field-wrapper">
                <label>
                  Service project format
                  <Tooltip
                    placement="top"
                    overlay="A service has a lifecycle of many steps like installation, upgrades, insights and resiliency.  Additionally defining required resources to run a services such as disk space may be required. You can define and manage this information through the formats listed below."
                    trigger="click"
                  >
                    <span className="tooltip" />
                  </Tooltip>
                </label>
                <div className="field-input-wrapper">
                  <select data-test="subtype" name="subtype" disabled>
                    <option>{subType.label}</option>
                  </select>
                </div>
              </div>
            )}

            <div className="kh-modal-actions">
              <button
                className="secondary button"
                type="button"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className={`dark button ${
                  kintoBlock.isExample ? 'disabled' : ''
                }`}
                type="submit"
                disabled={kintoBlock.isExample}
              >
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
  form: 'kintoBlockBasicInfoForm',
  enableReinitialize: true
})(KintoBlockBasicInfoModal)
