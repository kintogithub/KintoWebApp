import React, { Component } from 'react'
import { Field, FormSection } from 'redux-form'
import PropTypes from 'prop-types'
import { required, isLessThan200 } from 'helpers/forms/validators'
import {
  websiteTypeOptions,
  serviceTypeOptions
} from 'constants/kintoBlockFormOptions'
import { WEBSITE, SERVICE } from 'constants/kintoBlockTypes'
import { FieldValidation } from 'components/forms'
import {
  kintoBlockName,
  kintoBlockDisplayName
} from 'helpers/forms/validationFields'
import PrettySelect from 'components/forms/select/PrettySelect'
import AdvancedCollapse from '../../../ui/AdvancedCollapse'
import LanguageInput from './LanguageInput'

class BasicInfoInputs extends Component {
  state = {
    areWebsiteAdvancedOptionsOpen: false
  }

  static propTypes = {
    kintoBlockType: PropTypes.string.isRequired,
    onToggleType: PropTypes.func.isRequired,
    showAdvanceBasicOptions: PropTypes.bool,
    selectedLanguage: PropTypes.string,
    onToggleVersion: PropTypes.func.isRequired
  }

  render() {
    const {
      kintoBlockType,
      onToggleType,
      showAdvanceBasicOptions,
      selectedLanguage,
      onToggleVersion
    } = this.props
    const isWebsite = kintoBlockType === WEBSITE
    const isService = kintoBlockType === SERVICE
    const isBlockSubTypeEnabled = isWebsite || kintoBlockType === SERVICE

    const subTypeHelpText = isWebsite
      ? 'Static Website serves your files to the internet. A Web App gives you control on how you want to serve your web content from a custom node based service.'
      : 'A service has a lifecycle of many steps like installation, upgrades, insights and resiliency.  Additionally defining required resources to run a services such as disk space may be required. You can define and manage this information through the formats listed below.'

    const displayNameHelp =
      'This is how your KintoBlock will appear in searches and within KintoHub.'

    const kintoBlockNameHelp =
      'Used in public URLs and underlaying logs. Must contain only lowercase characters, digits and hyphens.'

    const pathToHelmHelp =
      'If your helm chart is not in the root folder of your project, specify the path to it here.'

    return (
      <div className="basic-info-inputs">
        <div
          className={`form-body ${
            showAdvanceBasicOptions ? 'options-open' : 'options-closed'
          }`}
        >
          <div className="two-fields">
            <Field
              name="name"
              label="KintoBlock Name"
              placeholder="Enter a name for your KintoBlock"
              component={FieldValidation}
              validate={kintoBlockName}
              type="text"
              tutorialPosition="left"
              help={kintoBlockNameHelp}
            />

            <Field
              characterCount={200}
              name="displayName"
              label="Display Name"
              placeholder="Enter display name for your KintoBlock"
              component={FieldValidation}
              validate={kintoBlockDisplayName}
              type="text"
              tutorialPosition="left"
              help={displayNameHelp}
            />
          </div>

          <Field
            characterCount={200}
            name="shortDescription"
            label="Description"
            placeholder="Enter a short description of your KintoBlock"
            component={FieldValidation}
            validate={[required, isLessThan200]}
            type="textarea"
            tutorialPosition="left"
          />

          {isBlockSubTypeEnabled ? (
            <div>
              <Field
                name="blockSubType"
                label={isWebsite ? 'Website type' : 'Service project format'}
                component={PrettySelect}
                validate={required}
                type="select"
                onToggle={onToggleType}
                options={isWebsite ? websiteTypeOptions : serviceTypeOptions}
                websiteBlock={true}
                tutorialPosition="left"
                hasLinkedDefaultValues={true}
                help={subTypeHelpText}
                placeholder={`Choose the ${
                  isWebsite ? 'Website type' : 'service project format'
                }`}
                className={isService ? 'service-project' : ''}
              />
            </div>
          ) : (
            <LanguageInput
              onToggleType={onToggleType}
              onToggleVersion={onToggleVersion}
              tutorialPosition="left"
              selectedLanguage={selectedLanguage}
            />
          )}

          {isService && (
            <Field
              characterCount={200}
              name="gitSrcFolderPath"
              label="Helm Chart Source Folder"
              isOptional={true}
              help={pathToHelmHelp}
              placeholder="Path/to/helm/charts"
              component={FieldValidation}
              validate={isLessThan200}
              type="text"
              className="helm-chart"
            />
          )}
        </div>

        {showAdvanceBasicOptions && (
          <AdvancedCollapse isOpen={true}>
            <FormSection name="versionBuildConfigData">
              <div className="form-advanced">
                <div className="one-field">
                  <Field name="port" label="port" component={FieldValidation} />
                </div>

                <div className="two-fields">
                  <Field
                    name="buildCommand"
                    label="build command"
                    component={FieldValidation}
                  />
                  <Field
                    name="runCommand"
                    label="run"
                    component={FieldValidation}
                  />
                </div>
              </div>
            </FormSection>
          </AdvancedCollapse>
        )}
      </div>
    )
  }
}

export default BasicInfoInputs
