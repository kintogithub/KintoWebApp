import { connect } from 'react-redux'
import { formValueSelector, submit } from 'redux-form'
import { DEPLOYMENTS_KINTOBLOCKS_COUNT } from 'constants/limitations'
import { getLiveEnvironments } from 'selectors/deploymentEnvironments'
import {
  deployEnvironment,
  createDeployment,
  deleteEnvironment
} from 'actions/deployments'
import {
  initializeTopPageItem,
  setTopPageItem,
  toggleCanSave
} from 'actions/pageOptions'
import {
  searchKintoBlocks,
  fetchKintoBlockDependenciesData
} from 'actions/kintoBlocks'
import DeploymentForm from 'components/dashboard/deployments/DeploymentForm'

function mapStateToProps(state, { version, isCreate, preFillInformation }) {
  const formSelector = formValueSelector('deploymentForm')
  const appDependencies = formSelector(state, 'appDependencies')
  const textareaContents = formSelector(state, 'shortDescription')
  const cacheDependencies = state.kintoBlocksDependenciesCache
  const {
    selectedEnvironmentId,
    selectedDeploymentId,
    canSave
  } = state.pageOptions
  const deployment = state.deployments.byId[selectedDeploymentId] || {}

  const environment =
    deployment.environments && !isCreate
      ? deployment.environments.find(e => e.id === selectedEnvironmentId)
      : {}

  const isEnvLive = getLiveEnvironments(state, selectedDeploymentId).some(
    e => e.environmentId === selectedEnvironmentId
  )

  const limitations = state.currentUser.limitations || {}
  const { topPageItem } = state.pageOptions
  let initialValues = {
    isPublic: true,
    environmentName: 'default',
    autoUpdate: false
    // isHighAvailability: false TODO: reenable when BE is ready
  }

  let totalDependencies = isEnvLive ? deployment.appDependencies : []

  if (preFillInformation && preFillInformation.isPrefilled) {
    const dependencyFoundInCache =
      cacheDependencies[preFillInformation.kintoBlockId]
    let formattedDependency = {}
    if (dependencyFoundInCache) {
      formattedDependency = {
        blockId: preFillInformation.kintoBlockId,
        version: dependencyFoundInCache.versions.find(
          version => version.name === preFillInformation.kintoBlockVersion
        )
      }
    }

    if (isCreate) {
      initialValues = {
        ...initialValues,
        name: preFillInformation.newDeploymentName,
        appDependencies: [formattedDependency]
      }
    }

    if (!isCreate) {
      const existingDeploymentDependencies = deployment.appDependencies
        ? deployment.appDependencies
        : []

      const doesAppAlreadyContainDependency = existingDeploymentDependencies.find(
        block => block.blockId === preFillInformation.kintoBlockId
      )

      if (dependencyFoundInCache && !doesAppAlreadyContainDependency) {
        totalDependencies = [...totalDependencies, formattedDependency]
      }
    }
  }

  if (!isCreate) {
    initialValues = {
      name: deployment.name,
      appDependencies: totalDependencies,
      // isHighAvailability: deployment.isHighAvailability, TODO: reenable when BE is ready
      isPublic: deployment.isPublic,
      autoUpdate: environment ? environment.autoUpdate : false,
      memberIds: deployment.memberIds || [],
      shortDescription: deployment.shortDescription,
      environmentName: environment ? environment.name : ''
    }
  }

  return {
    appDependencies,
    textareaContents,
    id: deployment.id,
    version,
    isCreate,
    topPageItem,
    environment,
    dependenciesLimit: limitations[DEPLOYMENTS_KINTOBLOCKS_COUNT],
    initialValues,
    canSave,
    preFillInformation
  }
}

function mapDispatchToProps(dispatch, { isCreate }) {
  return {
    deleteEnvironment: (deploymentId, environmentId, environmentName) =>
      dispatch(deleteEnvironment(deploymentId, environmentId, environmentName)),
    searchKintoBlocks: q => dispatch(searchKintoBlocks(q)),
    fetchKintoBlockDependenciesData: (id, ver, type) =>
      dispatch(fetchKintoBlockDependenciesData(id, ver, type)),
    createDeployment: data => dispatch(createDeployment(data)),
    deployEnvironment: (id, envId, data) =>
      dispatch(deployEnvironment(id, envId, data)),
    initializeTopPageItem: () => dispatch(initializeTopPageItem()),
    setTopPageItem: id => dispatch(setTopPageItem(id)),
    isCreate,
    pristineSubmit: () => {
      dispatch(submit('deploymentForm'))
    },
    allowSave: () => dispatch(toggleCanSave(true))
  }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { id, environment } = stateProps

  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    onSubmit: data => {
      if (dispatchProps.isCreate) {
        return dispatchProps.createDeployment(data)
      } else {
        return dispatchProps.deployEnvironment(id, environment.id, data)
      }
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DeploymentForm)
