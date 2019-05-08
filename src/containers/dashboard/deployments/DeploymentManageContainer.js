import { connect } from 'react-redux'
import { reset, formValueSelector } from 'redux-form'
import { push } from 'react-router-redux'
import { graphql } from 'react-apollo'
import qs from 'query-string'
import isEmpty from 'lodash/isEmpty'
import { DEPLOYMENT_WORKFLOW_QUERY } from 'constants/graphql'
import { DEPLOY_FIRST_SUCCESS } from 'constants/congratsModals'
import { deploymentType } from 'constants/deploymentStates'
import { getWorkflowGroups } from 'selectors/workflows'
import { deployKintoAppValidation } from 'selectors/limitations'
import { getDependenciesFactory } from 'selectors/kintoDependencies'
import {
  getLiveEnvironments,
  getEnvironmentsWithStatus
} from 'selectors/deploymentEnvironments'
import {
  fetchDeployment,
  getDeploymentEnvironment,
  shutDownEnvironment
} from 'actions/deployments'
import { deploymentWorkflowReceive } from 'actions/deploymentWorkflow'
import { showAlert, hideCongratsModal } from 'actions/pageOptions'
import DeploymentManage from 'components/dashboard/deployments/DeploymentManage'

function mapStateToProps(state, { match, location }) {
  let { id, envId } = match.params
  const query = qs.parse(location.search)
  const selector = formValueSelector('deploymentForm')
  const dependenciesInForm = selector(state, 'appDependencies') || []
  const workspaceId = state.workspaces.selectedWorkspace
  const deployment = state.deployments.byId[id]
  const version = deployment.version || {}
  const { canSave, selectedEnvironmentId } = state.pageOptions
  const hasDependencies = !isEmpty(deployment.appDependencies)
  const isEmailVerified = state.currentUser.validatedEmail || false
  const getDependencies = getDependenciesFactory()
  const dependenciesInfo = getDependencies(state, dependenciesInForm)
  const hasOnlyExampleBlocks = Object.keys(dependenciesInfo).every(
    id => dependenciesInfo[id].isExample
  )
  const environment = deployment.environments.find(e => e.id === envId)
  let liveEnvInfo = getEnvironmentsWithStatus(state, id)[0]
  if (environment) {
    liveEnvInfo = getEnvironmentsWithStatus(state, id).find(
      e => e.environmentId === envId
    )
  }

  // if the env doesn't have anything deployed we still wanna show data but mark the dependencies as empty
  const isVersionMatch =
    !liveEnvInfo.status || version.name === liveEnvInfo.deploymentVersion
  let dependencies = []

  if (liveEnvInfo.status === deploymentType.deploy) {
    const getDependencies = getDependenciesFactory()
    const depHash = getDependencies(state, deployment.appDependencies)
    dependencies = deployment.appDependencies.map(d => depHash[d.blockId])
  }

  const { workflowStatus } = getWorkflowGroups(state)

  const {
    kintoBlockId,
    kintoBlockVersion,
    kintoBlockVersionType,
    isPrefilled,
    newDeploymentName
  } = query

  const grafanaUrl = process.env.REACT_APP_GRAFANA_URL

  return {
    hasLiveEnvironments: !!getLiveEnvironments(state, deployment.id).length
      .length,
    id,
    envId,
    deployment,
    canSave,
    hasDependencies,
    dependencies,
    environment,
    liveEnvInfo,
    grafanaUrl,
    isEmailVerified,
    hasOnlyExampleBlocks,
    selectedWorkspace: workspaceId,
    selectedEnvironmentId,
    version: deployment.version,
    versionText: version.name,
    isVersionMatch,
    deployValidation: deployKintoAppValidation(state),
    isCongratsModalShown:
      state.pageOptions.congratsModal === DEPLOY_FIRST_SUCCESS,
    hasWorkflowFailed: workflowStatus === 'FAILED',
    preFillInformation: {
      kintoBlockId,
      kintoBlockVersion,
      kintoBlockVersionType,
      isPrefilled,
      newDeploymentName
    }
  }
}

function mapDispatchToProps(dispatch, { match }) {
  return {
    push: url => dispatch(push(url)),
    fetchDeployment: (id, envId) => dispatch(fetchDeployment(id, envId)),
    getDeploymentEnvironment: (envId, id) =>
      dispatch(getDeploymentEnvironment(envId, id)),
    shutDownEnv: (id, envId) => dispatch(shutDownEnvironment(id, envId)),
    showAlert: message => dispatch(showAlert(message)),
    resetForm: () => dispatch(reset('deploymentForm')),
    deploymentWorkflowReceive: (data, appId, envId) =>
      dispatch(deploymentWorkflowReceive(data, appId, envId)),
    hideCongratsModal: () => dispatch(hideCongratsModal())
  }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { id, envId } = stateProps
  const { deploymentEnvironmentsQuery } = ownProps
  const { refetch } = deploymentEnvironmentsQuery
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    shutDownEnvironment: () => dispatchProps.shutDownEnv(id, envId),
    showDeployLimitError: () =>
      dispatchProps.showAlert(stateProps.deployValidation.message),
    refetchEnvStatus: () => refetch()
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(
  graphql(DEPLOYMENT_WORKFLOW_QUERY, {
    options: ({ deployment, environment }) => ({
      variables: {
        deploymentId: deployment.id,
        environmentId: environment.id
      }
    })
  })(DeploymentManage)
)
