import { push } from 'react-router-redux'
import axios from 'axios'
import isEmpty from 'lodash/isEmpty'

import { DEPLOY_FIRST_SUCCESS } from 'constants/congratsModals'
import { DEPLOYMENTS } from 'constants/backendMicroservices'
import { DEPLOYMENT_STEP } from 'constants/onboarding'
import { pages } from 'constants/pages'
import { changelogData } from 'constants/temporaryData'
import { INFO } from 'constants/notificationTypes'
import { getPageUrl, getServerUrl } from 'helpers/urlHelper'
import {
  getLiveEnvironmentCountForDeployments,
  getEnvironmentsWithStatus
} from 'selectors/deploymentEnvironments'
import { completeAction } from './currentUser'

import {
  formSubmitted,
  setCongratsModal,
  environmentSelect,
  deploymentSelect,
  showNotification
} from './pageOptions'

export const RECEIVE_DEPLOYMENTS = 'RECEIVE_DEPLOYMENTS'
export const RECEIVE_DEPLOYMENT = 'RECEIVE_DEPLOYMENT'
export const ADD_DEPLOYMENT = 'ADD_DEPLOYMENT'
export const UPDATE_DEPLOYMENT = 'UPDATE_DEPLOYMENT'
export const CREATE_VERSION_DEPLOYMENT = 'CREATE_VERSION_DEPLOYMENT'
export const RECEIVE_DEPLOYMENT_ENVIRONMENTS = 'RECEIVE_DEPLOYMENT_ENVIRONMENTS'
export const RECEIVE_DEPLOYMENT_ENVIRONMENT = 'RECEIVE_DEPLOYMENT_ENVIRONMENT'
export const RECEIVE_DEPLOYMENT_DEPENDENCIES_CONFIG =
  'RECEIVE_DEPLOYMENT_DEPENDENCIES_CONFIG'
export const RECEIVE_DEPLOYMENT_DEPENDENCY_DEFAULT =
  'RECEIVE_DEPLOYMENT_DEPENDENCY_DEFAULT'
export const NEW_ENVIRONMENT_RECEIVE = 'NEW_ENVIRONMENT_RECEIVE'
export const DEPLOYMENT_ENVIRONMENT_UPDATE = 'DEPLOYMENT_ENVIRONMENT_UPDATE'
export const ADD_TAG = 'ADD_TAG'
export const DEPLOYMENT_ENVIRONMENT_LIST_REORDER =
  'DEPLOYMENT_ENVIRONMENT_LIST_REORDER'
export const DEPLOYMENT_CHANGELOG_RECEIVE = 'DEPLOYMENT_CHANGELOG_RECEIVE'

export const deploymentUpdate = (id, data) => ({
  type: UPDATE_DEPLOYMENT,
  id,
  data
})

export const deploymentAdd = (id, data, metadata) => ({
  type: ADD_DEPLOYMENT,
  id,
  data,
  metadata
})
export const deploymentCreateVersion = (id, data) => ({
  type: CREATE_VERSION_DEPLOYMENT,
  id,
  data
})

export const deploymentsReceive = response => ({
  type: RECEIVE_DEPLOYMENTS,
  data: response.data,
  metadata: response.metadata
})

export const deploymentReceive = (id, data, metadata) => ({
  type: RECEIVE_DEPLOYMENT,
  id,
  data,
  metadata
})

export const deploymentEnvironmentsReceive = (id, data) => ({
  type: RECEIVE_DEPLOYMENT_ENVIRONMENTS,
  id,
  data
})

export const deploymentEnvironmentReceive = (envId, appId, dependencies) => ({
  type: RECEIVE_DEPLOYMENT_ENVIRONMENT,
  envId,
  appId,
  dependencies
})

export const deploymentDependenciesConfigReceive = (id, ver, envId, data) => ({
  type: RECEIVE_DEPLOYMENT_DEPENDENCIES_CONFIG,
  id,
  envId,
  ver,
  data
})

export const deploymentDependencyConfigDefaultReceive = (
  deploymentId,
  blockId,
  data
) => ({
  type: RECEIVE_DEPLOYMENT_DEPENDENCY_DEFAULT,
  deploymentId,
  blockId,
  data
})

export const deploymentEnvironmentListReorder = (id, oldIndex, newIndex) => ({
  type: DEPLOYMENT_ENVIRONMENT_LIST_REORDER,
  id,
  oldIndex: oldIndex,
  newIndex: newIndex
})

export const newEnvironmentReceive = (id, data) => ({
  type: NEW_ENVIRONMENT_RECEIVE,
  id,
  data
})

export const addNewTag = (id, name, versionType) => ({
  type: ADD_TAG,
  name,
  versionType,
  id
})

export const appEnvironmentUpdate = (id, data) => ({
  type: DEPLOYMENT_ENVIRONMENT_UPDATE,
  id,
  data
})

export const changeLogReceive = (id, oldVersion, newVersion, data) => ({
  type: DEPLOYMENT_CHANGELOG_RECEIVE,
  id,
  oldVersion,
  newVersion,
  data
})

// you can provide null as the envId and pass a direct version to fetch
// if a version is passed the envId is gonna be ignored
// ex:
// fetchDeployment('1', null, '1.0.0') or
// fetchDeployment('1', 'envid')
export const fetchDeployment = (id, envId, appVersion) => async (
  dispatch,
  getState
) => {
  const state = getState()
  const { selectedWorkspace } = state.workspaces
  if (!appVersion) {
    const liveEnvInfo = getEnvironmentsWithStatus(state, id).find(
      e => e.environmentId === envId
    )

    appVersion = liveEnvInfo.deploymentVersion
    dispatch(environmentSelect(envId))
  }
  if (appVersion) {
    const response = await axios.get(
      getServerUrl(DEPLOYMENTS, `/deployment/version`, {
        workspaceId: selectedWorkspace,
        deploymentId: id,
        versionName: appVersion
      })
    )
    return dispatch(deploymentReceive(id, response.data, response.metadata))
  } else {
    // the environment is not live we still need to mark the deployment as selected
    dispatch(deploymentSelect(id))
  }
}

export const fetchDeployments = () => (dispatch, getState) => {
  const { selectedWorkspace } = getState().workspaces
  return axios
    .get(
      getServerUrl(DEPLOYMENTS, `/deployments`, {
        workspaceId: selectedWorkspace
      })
    )
    .then(response => {
      if (!isEmpty(response.data)) {
        dispatch(deploymentsReceive(response))
      }
    })
}

export const fetchDeploymentDependenciesConfig = (id, ver, envId) => (
  dispatch,
  getState
) => {
  const { selectedWorkspace } = getState().workspaces
  return axios
    .get(
      getServerUrl(DEPLOYMENTS, `/deployment/version/config`, {
        workspaceId: selectedWorkspace,
        deploymentId: id,
        versionName: ver,
        environmentId: envId
      })
    )
    .then(response => {
      if (response.data) {
        //TODO: a server side fix for initing params to empty array
        response.data.forEach(i => {
          if (!i.params) {
            i.params = []
          }
        })
        dispatch(
          deploymentDependenciesConfigReceive(id, ver, envId, response.data)
        )
      }
    })
}

export const createDeployment = newApp => (dispatch, getState) => {
  const { workspaces } = getState()
  const { selectedWorkspace } = workspaces

  return axios
    .post(
      getServerUrl(DEPLOYMENTS, `/deployment/create`, {
        workspaceId: selectedWorkspace
      }),
      newApp
    )
    .then(({ data, metadata }) => {
      dispatch(deploymentAdd(data.id, data, metadata))
      dispatch(formSubmitted())
      dispatch(deploymentReceive(data.id, data, metadata))

      const envId = data.environments[0].id
      const { appDependencies } = newApp
      dispatch(environmentSelect(envId))
      data = { ...data, appDependencies }
      return dispatch(deployEnvironment(data.id, envId, data))
    })
    .then(() => {
      const { workspaces, pageOptions } = getState()
      const { selectedWorkspace } = workspaces
      const { selectedEnvironmentId, selectedDeploymentId } = pageOptions
      const kintoAppManageUrl = getPageUrl(pages.dashboardDeploymentsManage, {
        workspaceId: selectedWorkspace,
        id: selectedDeploymentId,
        envId: selectedEnvironmentId
      })

      dispatch(push(kintoAppManageUrl))
    })
}

export const updateDeployment = (id, ver, data) => (dispatch, getState) => {
  const { selectedWorkspace } = getState().workspaces
  return axios
    .put(
      getServerUrl(DEPLOYMENTS, `/deployment/update`, {
        workspaceId: selectedWorkspace,
        deploymentId: id,
        versionName: ver
      }),
      data
    )
    .then(response => {
      dispatch(formSubmitted())
      dispatch(deploymentUpdate(id, response.data))
    })
}

export const updateDeploymentDependenciesConfigData = (
  id,
  ver,
  envId,
  data
) => (dispatch, getState) => {
  const { selectedWorkspace } = getState().workspaces
  return axios
    .put(
      getServerUrl(DEPLOYMENTS, `/deployment/version/config/update`, {
        workspaceId: selectedWorkspace,
        deploymentId: id,
        versionName: ver,
        environmentId: envId
      }),
      data
    )
    .then(response => {
      dispatch(formSubmitted())
    })
}

export const getDeploymentEnvironments = id => (dispatch, getState) => {
  const { selectedWorkspace } = getState().workspaces
  const kintoAppListUrl = getPageUrl(pages.dashboardDeploymentsList, {
    workspaceId: selectedWorkspace
  })
  return axios
    .get(
      getServerUrl(DEPLOYMENTS, `/deployment/environments`, {
        workspaceId: selectedWorkspace,
        deploymentId: id
      })
    )
    .then(response => {
      if (isEmpty(response.data)) {
        dispatch(push(kintoAppListUrl))
      } else {
        dispatch(deploymentEnvironmentsReceive(id, response.data))
      }
    })
}

export const getDeploymentEnvironment = (envId, appId) => (
  dispatch,
  getState
) => {
  const { selectedWorkspace } = getState().workspaces
  return axios
    .get(
      getServerUrl(DEPLOYMENTS, `/deployment/environment`, {
        workspaceId: selectedWorkspace,
        deploymentId: appId,
        environmentId: envId
      })
    )
    .then(response => {
      if (response.metadata && Array.isArray(response.metadata.dependencies)) {
        dispatch(
          deploymentEnvironmentReceive(
            envId,
            appId,
            response.metadata.dependencies
          )
        )
      }
    })
}

export const addNewEnvironment = (id, data) => (dispatch, getState) => {
  const { selectedWorkspace } = getState().workspaces
  return axios
    .post(
      getServerUrl(DEPLOYMENTS, `/deployment/environment/create`, {
        workspaceId: selectedWorkspace,
        deploymentId: id
      }),
      data
    )
    .then(response => {
      dispatch(formSubmitted())
      dispatch(newEnvironmentReceive(id, response.data))
    })
}

export const updateAppEnvironment = (id, envId, data) => (
  dispatch,
  getState
) => {
  const { selectedWorkspace } = getState().workspaces
  return axios
    .put(
      getServerUrl(DEPLOYMENTS, `/deployment/environment/update`, {
        workspaceId: selectedWorkspace,
        deploymentId: id
      }),
      data
    )
    .then(response => {
      dispatch(formSubmitted())
      dispatch(appEnvironmentUpdate(id, { ...data, id: envId }))
    })
}

export const deployEnvironment = (deploymentId, envId, data) => (
  dispatch,
  getState
) => {
  const state = getState()
  const { workspaces, currentUser, tutorial } = state
  const { selectedWorkspace } = workspaces
  const totalLiveEnvironments = getLiveEnvironmentCountForDeployments(state)
  const currentUserId = currentUser.id
  const showSuccessModal = totalLiveEnvironments === 0 || tutorial.isTutorial

  const { environments = [], id, ...remainingData } = data

  return axios
    .post(
      getServerUrl(DEPLOYMENTS, `/deployment/deploy`, {
        workspaceId: selectedWorkspace,
        deploymentId: deploymentId,
        environmentId: envId
      }),
      {
        data: {
          ...remainingData,
          deploymentId: deploymentId,
          environments: environments.map(env => {
            const { id, ...remaining } = env
            return { ...remaining, environmentId: id }
          })
        }
      }
    )
    .then(response => {
      if (showSuccessModal) {
        dispatch(completeAction(DEPLOYMENT_STEP, currentUserId))
        dispatch(setCongratsModal(DEPLOY_FIRST_SUCCESS))
      }
      dispatch(formSubmitted())
      dispatch(appEnvironmentUpdate(deploymentId, response.data))
    })
}

export const cancelDeployment = id => dispatch => {
  // TODO: the API does not have this functionality yet
  /*
  dispatch(push(`/app/dashboard/kintoapps/${id}/environments`))
  */
}

export const shutDownEnvironment = (id, envId) => (dispatch, getState) => {
  const { selectedWorkspace } = getState().workspaces
  return axios
    .post(
      getServerUrl(DEPLOYMENTS, `/deployment/environment/shutdown`, {
        workspaceId: selectedWorkspace,
        deploymentId: id,
        environmentId: envId
      })
    )
    .then(response => {
      dispatch(formSubmitted())
      dispatch(appEnvironmentUpdate(id, response.data))
    })
}

export const reorderEnvironments = (id, oldIndex, newIndex) => (
  dispatch,
  getState
) => {
  dispatch(deploymentEnvironmentListReorder(id, oldIndex, newIndex))
  const { selectedWorkspace } = getState().workspaces
  const state = getState()
  const sortedEnvironmentsIds = state.deployments.byId[id].environments.map(
    e => e.id
  )
  return axios.post(
    getServerUrl(DEPLOYMENTS, `/deployment/environment/update/order`, {
      workspaceId: selectedWorkspace,
      deploymentId: id
    }),
    { data: sortedEnvironmentsIds }
  )
}

// TODO: workaround until deployEnvironment can accept a tag
export const deployEnvironmentFromTag = (deploymentId, envId, tag) => async (
  dispatch,
  getState
) => {
  const { selectedWorkspace } = getState().workspaces
  const { data } = await axios.get(
    getServerUrl(DEPLOYMENTS, `/deployment/version`, {
      workspaceId: selectedWorkspace,
      deploymentId,
      versionName: tag
    })
  )
  return dispatch(deployEnvironment(deploymentId, envId, data))
}

export const getKintoAppChangelogs = (
  id,
  oldVersion,
  newVersion
) => dispatch => {
  const response = changelogData
  //TODO: return axos.put(`/kintoapps/${id}/changelogs?oldVersion=${oldVersion}&newVersion=${newVersion}`)
  return Promise.resolve({ data: response }).then(res => {
    dispatch(changeLogReceive(id, oldVersion, newVersion, res.data))
  })
}

export const deleteDeployment = (deploymentId, deploymentName) => (
  dispatch,
  getState
) => {
  const { selectedWorkspace } = getState().workspaces
  return axios
    .delete(
      getServerUrl(DEPLOYMENTS, `/deployment/delete`, {
        workspaceId: selectedWorkspace,
        deploymentId: deploymentId
      })
    )
    .then(() => {
      dispatch(fetchDeployments())
      dispatch(
        showNotification(
          INFO,
          `The deployment "${deploymentName}" has been successfully deleted.`
        )
      )
    })
}

export const deleteEnvironment = (
  deploymentId,
  environmentId,
  environmentName
) => (dispatch, getState) => {
  const { selectedWorkspace } = getState().workspaces
  const { deployments } = getState()
  const deployment = deployments.byId[deploymentId]
  const environment = deployment.environments[0]
  const deploymentManageUrl = getPageUrl(pages.dashboardDeploymentsManage, {
    workspaceId: selectedWorkspace,
    id: deploymentId,
    envId: environment.id
  })

  return axios
    .delete(
      getServerUrl(DEPLOYMENTS, `/deployment/environment/delete`, {
        deploymentId: deploymentId,
        environmentId: environmentId,
        workspaceId: selectedWorkspace
      })
    )
    .then(() => {
      dispatch(push(deploymentManageUrl))
      dispatch(
        showNotification(
          INFO,
          `The environment "${environmentName}" has been successfully deleted.`
        )
      )
    })
}
