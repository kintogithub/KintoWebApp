import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FieldArray } from 'redux-form'
import { format } from 'helpers/stringHelper'
import {
  DEPLOYMENTS_KINTOBLOCKS_COUNT,
  errorMessages
} from 'constants/limitations'
import { DependencyManagement } from '../../forms'

const dependenciesRequired = (value, allValues, props) => {
  if (props.kintoBlock) {
    return undefined
  }
  return !value || !value.length ? 'Must select a KintoBlock' : undefined
}

const dependencyLimitations = (value, allValues, { dependenciesLimit }) => {
  if (!dependenciesLimit || !value) {
    return undefined
  }
  return value.length > dependenciesLimit
    ? format(errorMessages[DEPLOYMENTS_KINTOBLOCKS_COUNT], dependenciesLimit)
    : undefined
}

class ManageDependenciesField extends Component {
  static propTypes = {
    appVersion: PropTypes.string,
    name: PropTypes.string.isRequired,
    dependenciesInfo: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
    workspaceId: PropTypes.string,
    selectedDeploymentId: PropTypes.string,
    searchKintoBlocks: PropTypes.func.isRequired,
    fetchKintoBlockDependenciesData: PropTypes.func.isRequired,
    selectedKintoBlockIds: PropTypes.array.isRequired,
    isTutorial: PropTypes.bool.isRequired,
    updateDependenciesTutorialFieldStatus: PropTypes.func.isRequired,
    refreshActiveItemInTutorial: PropTypes.func.isRequired,
    preFillInformation: PropTypes.object,
    kintoBlockBuildsReceive: PropTypes.func.isRequired,
    data: PropTypes.object
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.data &&
      nextProps.data &&
      this.props.data.loading &&
      !nextProps.data.loading &&
      nextProps.data.kintoBlockBranches
    ) {
      this.props.kintoBlockBuildsReceive(nextProps.data.kintoBlockBranches)
    }
  }

  render() {
    const {
      appVersion,
      name,
      workspaceId,
      dependenciesInfo,
      searchKintoBlocks,
      fetchKintoBlockDependenciesData,
      disabled,
      isKintoBlock,
      selectedKintoBlockIds,
      isTutorial,
      updateDependenciesTutorialFieldStatus,
      refreshActiveItemInTutorial,
      selectedDeploymentId,
      preFillInformation,
      selectedEnvironmentId
    } = this.props

    return (
      <FieldArray
        component={DependencyManagement}
        appVersion={appVersion}
        name={name}
        workspaceId={workspaceId}
        selectedDeploymentId={selectedDeploymentId}
        appDependenciesInfo={dependenciesInfo}
        onSearchKintoBlocks={searchKintoBlocks}
        fetchKintoBlockDependenciesData={fetchKintoBlockDependenciesData}
        disabled={disabled}
        isKintoBlock={isKintoBlock}
        itemsToSkip={selectedKintoBlockIds}
        validate={[dependenciesRequired, dependencyLimitations]}
        isTutorial={isTutorial}
        updateDependenciesTutorialFieldStatus={
          updateDependenciesTutorialFieldStatus
        }
        refreshActiveItemInTutorial={refreshActiveItemInTutorial}
        preFillInformation={preFillInformation}
        selectedEnvironmentId={selectedEnvironmentId}
      />
    )
  }
}

export default ManageDependenciesField
