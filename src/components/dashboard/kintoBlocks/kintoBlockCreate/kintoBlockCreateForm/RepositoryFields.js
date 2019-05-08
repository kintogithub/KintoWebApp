import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, FormSection } from 'redux-form'
import { Async } from 'react-select'
import { MICROSERVICE } from 'constants/kintoBlockTypes'
import { GITHUB } from 'constants/gitRepos'
import {
  protocolOptions,
  apiDocMicroserviceOptions,
  isNewRepositoryOptions,
  isNewRepositoryOptionsForGithub
} from 'constants/kintoBlockFormOptions'
import { required } from 'helpers/forms/validators'
import AdvancedCollapse from '../../../ui/AdvancedCollapse'
import SelectGitSource from 'components/forms/select/SelectGitSource'
import SelectSearchIcon from 'components/forms/select/SelectSearchIcon'
import SelectOrganization from 'components/forms/select/SelectOrganization'
import { FieldValidation, ErrorOnly, Toggle } from 'components/forms'
import RepositorySearchOption from './RepositoryFields/RepositorySearchOption'
import PrettySelect from 'components/forms/select/PrettySelect'

class RepositoryFields extends Component {
  static propTypes = {
    preFillText: PropTypes.string.isRequired,
    isNewRepository: PropTypes.bool.isRequired,
    kintoBlockType: PropTypes.string.isRequired,
    organizations: PropTypes.array.isRequired,
    onToggleRepositoryType: PropTypes.func.isRequired,
    searchRepositories: PropTypes.func.isRequired,
    onSelectRepo: PropTypes.func.isRequired,
    selectedRepo: PropTypes.object,
    gitSources: PropTypes.object.isRequired,
    selectGitSourceOptions: PropTypes.array.isRequired,
    groupedOrganizationOptions: PropTypes.array.isRequired,
    openModalFromDropdown: PropTypes.func.isRequired,
    onToggleOrganization: PropTypes.func.isRequired,
    isGRPCEnabled: PropTypes.bool.isRequired
  }

  render() {
    const {
      preFillText,
      isNewRepository,
      kintoBlockType,
      onToggleRepositoryType,
      searchRepositories,
      onSelectRepo,
      selectedRepo,
      gitSources,
      selectGitSourceOptions,
      groupedOrganizationOptions,
      openModalFromDropdown,
      onToggleOrganization,
      isGRPCEnabled,
      selectedGitSource
    } = this.props
    const isMicroservice = kintoBlockType === MICROSERVICE
    const isNewRepoOptions =
      selectedGitSource === GITHUB
        ? isNewRepositoryOptionsForGithub
        : isNewRepositoryOptions

    return (
      <div>
        <div className="form-body options-open">
          <div className="connect-github">
            <div className="repository-selection">
              <div className="top">
                <div>
                  <Field
                    name="isNewRepository"
                    fieldName="repositoryName"
                    tutorialPosition="left"
                    label="repository type"
                    component={PrettySelect}
                    options={isNewRepoOptions}
                    changeFunction={onToggleRepositoryType}
                    defaultValue={isNewRepoOptions[0]}
                  />
                </div>

                <div>
                  {isNewRepository ? (
                    <div className="organization">
                      <Field
                        name="organizationId"
                        label="Organization"
                        component={SelectOrganization}
                        className="select-git-organization"
                        options={groupedOrganizationOptions}
                        gitSources={gitSources}
                        openModalFromDropdown={openModalFromDropdown}
                        onToggleOrganization={onToggleOrganization}
                      />
                    </div>
                  ) : (
                    <div className="source">
                      <Field
                        name="gitSourceType"
                        label="Repository Source"
                        component={SelectGitSource}
                        className="select-git-source"
                        options={selectGitSourceOptions}
                        gitSources={gitSources}
                        openModalFromDropdown={openModalFromDropdown}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="bottom">
                {isNewRepository ? (
                  <div className="repo-wrapper">
                    <Field
                      name="repositoryName"
                      label="repository name"
                      placeholder="Enter a name for your repository"
                      component={FieldValidation}
                      validate={required}
                      type="text"
                      preFillText={preFillText}
                    />
                  </div>
                ) : (
                  <div className="select-wrapper">
                    <div className="label">Repository</div>
                    <Async
                      placeholder="Search repositories"
                      className="react-select"
                      classNamePrefix="react-select"
                      loadOptions={searchRepositories}
                      onChange={onSelectRepo}
                      value={selectedRepo}
                      backspaceRemovesValue={false}
                      isClearable={false}
                      defaultOptions={[
                        {
                          label: 'Enter text to begin searching',
                          value: '',
                          isDisabled: true
                        }
                      ]}
                      components={{
                        DropdownIndicator: SelectSearchIcon,
                        Option: RepositorySearchOption
                      }}
                    />
                    <Field
                      name="repositoryId"
                      component={ErrorOnly}
                      validate={required}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {isMicroservice &&
            isNewRepository && (
              <div className="prepopulate-repo">
                <div className="prepopulate-repo-field-wrapper">
                  <label
                    className="label-prepopulate"
                    htmlFor="createExampleProject"
                  >
                    Prepopulate Repository
                  </label>
                  <Field
                    name="createExampleProject"
                    id="createExampleProject"
                    label="Prepopulate repository with example project in chosen language"
                    component={Toggle}
                    tutorialPosition="left"
                  />
                </div>
              </div>
            )}
        </div>
        {isMicroservice && (
          <AdvancedCollapse isOpen={true}>
            <div className="form-advanced">
              <div className="two-fields">
                <Field
                  name="protocol"
                  label="protocol"
                  component={PrettySelect}
                  help="The protocol you would like this microservice to communicate with"
                  validate={required}
                  options={protocolOptions}
                  defaultValue={protocolOptions[0]}
                  placeholder="Choose the protocol"
                />
                <Field
                  name="versionBuildConfigData.port"
                  validate={required}
                  label="port"
                  component={FieldValidation}
                  disabled={isGRPCEnabled}
                />
              </div>

              <FormSection name="versionBuildConfigData">
                <div className="one-field-per-row">
                  <Field
                    name="buildCommand"
                    label="build command"
                    validate={required}
                    component={FieldValidation}
                    disabled={isGRPCEnabled}
                  />
                  <Field
                    name="runCommand"
                    label="run"
                    validate={required}
                    component={FieldValidation}
                    disabled={isGRPCEnabled}
                  />

                  <Field
                    name="docFormat"
                    label="doc format"
                    component={PrettySelect}
                    validate={required}
                    help="The protocol you would like this microservice to communicate with"
                    options={apiDocMicroserviceOptions}
                    defaultValue={apiDocMicroserviceOptions[0]}
                    disabled={isGRPCEnabled}
                  />
                </div>
              </FormSection>
            </div>
          </AdvancedCollapse>
        )}
      </div>
    )
  }
}

export default RepositoryFields
