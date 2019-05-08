import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { WEBSITE } from 'constants/kintoBlockTypes'
import WorkspaceToolbarContainer from 'containers/dashboard/ui/WorkspaceToolbarContainer'
import { FormError } from 'components/forms'
import RepositoryFields from './kintoBlockCreateForm/RepositoryFields'
import BasicInfoInputs from './kintoBlockCreateForm/BasicInfoInputs'

class KintoBlockCreateForm extends Component {
  state = {
    selectedRepo: null
  }

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    isNewRepository: PropTypes.bool.isRequired,
    organizations: PropTypes.array.isRequired,
    selectRepository: PropTypes.func.isRequired,
    onToggleRepositoryType: PropTypes.func.isRequired,
    preFillText: PropTypes.string.isRequired,
    searchRepositories: PropTypes.func.isRequired,
    error: PropTypes.string,
    languages: PropTypes.array,
    kintoBlockType: PropTypes.string.isRequired,
    gitSources: PropTypes.object.isRequired,
    selectGitSourceOptions: PropTypes.array.isRequired,
    openModalFromDropdown: PropTypes.func.isRequired,
    groupedOrganizationOptions: PropTypes.array.isRequired,
    onToggleOrganization: PropTypes.func.isRequired,
    onToggleType: PropTypes.func.isRequired,
    showAdvanceBasicOptions: PropTypes.bool,
    isGRPCEnabled: PropTypes.bool,
    selectedLanguage: PropTypes.string,
    onToggleVersion: PropTypes.func.isRequired,
    selectedGitSource: PropTypes.string.isRequired
  }

  onSelectRepo = data => {
    this.setState({ selectedRepo: data })
    this.props.selectRepository(data)
    this.props.goToNextItem()
  }

  render() {
    const {
      handleSubmit,
      kintoBlock,
      isNewRepository,
      organizations,
      onToggleRepositoryType,
      preFillText,
      searchRepositories,
      error,
      kintoBlockType,
      gitSources,
      selectGitSourceOptions,
      openModalFromDropdown,
      groupedOrganizationOptions,
      onToggleOrganization,
      onToggleType,
      showAdvanceBasicOptions,
      isGRPCEnabled,
      selectedLanguage,
      onToggleVersion,
      selectedGitSource
    } = this.props
    return (
      <form
        className="kintoblock-create form-container"
        onSubmit={handleSubmit}
        data-test="kb-create-form"
      >
        <div className="form-wrapper workspaces full-row">
          <WorkspaceToolbarContainer
            isDeployment={false}
            isCreate={true}
            kintoItem={kintoBlock}
          />
        </div>
        <div className="form-wrapper basic-info">
          <h3>Basic Info</h3>
          <h5>
            Choose the name for this KintoBlock and give it a short description
            so you can easily find it back later. Let us know your preferred
            coding flavor and connect your repo. Only lowercase characters,
            digits and hyphens are allowed - no spaces and no caps for now
            please.
          </h5>

          <BasicInfoInputs
            kintoBlockType={kintoBlockType}
            onToggleType={onToggleType}
            onToggleVersion={onToggleVersion}
            showAdvanceBasicOptions={showAdvanceBasicOptions}
            selectedLanguage={selectedLanguage}
          />
        </div>

        <div className="form-wrapper">
          <h3>Repository</h3>
          <h5>
            Create a new repository or choose an existing one where this
            KintoBlock will be. You can add more repo sources if needed.
          </h5>
          <div
            className={`repo-fields ${
              kintoBlockType === WEBSITE ? 'website' : ''
            }`}
          >
            <RepositoryFields
              preFillText={preFillText}
              onToggleType={onToggleType}
              isNewRepository={isNewRepository}
              kintoBlockType={kintoBlockType}
              organizations={organizations}
              onToggleRepositoryType={onToggleRepositoryType}
              searchRepositories={searchRepositories}
              onSelectRepo={this.onSelectRepo}
              selectedRepo={this.state.selectedRepo}
              gitSources={gitSources}
              selectGitSourceOptions={selectGitSourceOptions}
              openModalFromDropdown={openModalFromDropdown}
              groupedOrganizationOptions={groupedOrganizationOptions}
              onToggleOrganization={onToggleOrganization}
              isGRPCEnabled={isGRPCEnabled}
              selectedGitSource={selectedGitSource}
            />
          </div>
          <FormError error={error} />
        </div>

        {/*
          <FormSection name="hardwareData">
          <KintoBlockHardwareData
            isDedicatedCPU={isDedicatedCPU}
            resetCPUHandler={resetCPUHandler}
          />
          </FormSection>
        */}
      </form>
    )
  }
}

export default reduxForm({ form: 'kintoBlockCreateForm' })(KintoBlockCreateForm)
