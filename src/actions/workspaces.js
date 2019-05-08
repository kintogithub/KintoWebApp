import axios from 'axios'
import { push } from 'react-router-redux'
import { WORKSPACES } from 'constants/backendMicroservices'
import {
  REFRESH_PAGE,
  INVALID_WORKSPACE_INVITE,
  ERROR_WITH_MESSAGE_AND_CONTINUE_OPTION
} from 'constants/errorPageTypes'
import { WORKSPACE_STEP } from 'constants/onboarding'
import { WORKSPACE_FIRST_SUCCESS } from 'constants/congratsModals'
import { pages } from 'constants/pages'
import { GITHUB } from 'constants/gitRepos'
import { defaultLimitations } from 'constants/limitations'
import { getPageUrl } from 'helpers/urlHelper'
import { getServerUrl } from 'helpers/urlHelper'
import { completeAction } from './currentUser'
import {
  formSubmitted,
  showErrorPage,
  setCongratsModal,
  clearWorkspaceInvite
} from './pageOptions'
import { logout } from './auth'

export const FETCH_WORKSPACES = 'FETCH_WORKSPACES'
export const RECEIVE_WORKSPACES = 'RECEIVE_WORKSPACES'
export const RECEIVE_WORKSPACE = 'RECEIVE_WORKSPACE'
export const SELECT_WORKSPACE = 'SELECT_WORKSPACE'
export const RECEIVE_SERVICE = 'RECEIVE_SERVICE'

export const workspacesFetch = () => ({ type: FETCH_WORKSPACES })

export const workspaceSelect = workspaceId => ({
  type: SELECT_WORKSPACE,
  workspaceId
})

export const workspaceReceive = (workspaceId, data, isAdd) => {
  // TODO untill backend implementation is done, we wanna skip limitations for our account
  const isKintoWorkspace = workspaceId === '5aa09a44d71b86005973d9c1'
  const disableLimitation = process.env.REACT_APP_DISABLE_LIMITATION
  let limitations = null
  if (!isKintoWorkspace && !disableLimitation) {
    limitations = defaultLimitations
  }

  if (!data.gitSources) {
    data.gitSources = {}
  }

  const updatedData = {
    ...data,
    limitations
  }
  return {
    type: RECEIVE_WORKSPACE,
    workspaceId,
    data: updatedData,
    isAdd: !!isAdd
  }
}

export const workspacesReceive = data => ({
  type: RECEIVE_WORKSPACES,
  data
})

export const serviceReceive = (id, data) => ({
  type: RECEIVE_SERVICE,
  workspaceId: id,
  data
})

export const fetchWorkspace = workspaceId => dispatch => {
  return axios
    .get(getServerUrl(WORKSPACES, '/workspace', { workspaceId }))
    .then(res => {
      dispatch(workspaceReceive(workspaceId, res.data))
    })
}

export const fetchWorkspaces = options => dispatch => {
  dispatch(workspacesFetch())
  return axios.get(getServerUrl(WORKSPACES, '/workspaces'), options).then(
    response => {
      const workspaces = response.data || []
      workspaces.forEach(w => {
        if (!w.gitSources) {
          w.gitSources = {}
        }
      })
      dispatch(workspacesReceive(response.data || []))
    },
    () => {
      dispatch(showErrorPage(REFRESH_PAGE))
    }
  )
}

export const createWorkspace = data => (dispatch, getState) => {
  const { currentUser, tutorial, workspaces } = getState()
  const currentUserId = currentUser.id
  const showSuccessModal = tutorial.isTutorial || workspaces.allIds.length === 1
  // self is added automatically, remove it from members
  const updatedData = {
    ...data,
    members: data.members.filter(m => m.id !== currentUserId)
  }
  return axios
    .post(getServerUrl(WORKSPACES, '/workspace/create'), updatedData)
    .then(response => {
      const newWorkspaceId = response.data.workspaceId
      dispatch(formSubmitted())
      dispatch(workspaceReceive(newWorkspaceId, response.data, true))
      if (showSuccessModal) {
        dispatch(completeAction(WORKSPACE_STEP, currentUserId))
        dispatch(setCongratsModal(WORKSPACE_FIRST_SUCCESS))
      }
      const workspaceEditUrl = getPageUrl(pages.workspaceEdit, {
        workspaceId: newWorkspaceId
      })
      dispatch(push(workspaceEditUrl))
      dispatch(fetchWorkspaces()) //TODO: backend issue, workspaces has to be reloaded inorder to add session data
    })
}

export const updateWorkspace = (workspaceId, data) => dispatch => {
  return axios
    .put(getServerUrl(WORKSPACES, '/workspace/update', { workspaceId }), data)
    .then(response => {
      dispatch(formSubmitted())
      dispatch(workspaceReceive(workspaceId, response.data))
    })
}

// TODO not used currently
export const toggleService = (service, isActive) => (dispatch, getState) => {
  const { selectedWorkspace } = getState().workspaces
  return axios
    .put(
      getServerUrl(WORKSPACES, '/workspace/service/update', {
        workspaceId: selectedWorkspace
      }),
      {
        service,
        isActive
      }
    )
    .then(res => {
      dispatch(serviceReceive(selectedWorkspace, res.data))
    })
}

export const connectGit = (workspaceId, gitSource, identifier) => () => {
  const url =
    gitSource === GITHUB
      ? '/workspace/gitapp/connect'
      : '/workspace/bitbucket/connect'

  const connectUrl =
    gitSource === GITHUB
      ? getServerUrl(WORKSPACES, url, {
          workspaceId,
          installationId: identifier
        })
      : getServerUrl(WORKSPACES, url, { workspaceId, code: identifier })

  return axios.put(connectUrl)
}

export const searchRepositories = (query, source) => (dispatch, getState) => {
  const workspaces = getState().workspaces
  const selectedWorkspace = workspaces.byId[workspaces.selectedWorkspace]
  const selectedGitSource = selectedWorkspace.gitSources[source] || {}
  const organizations = selectedGitSource.organizations || []
  const repoKey = source === GITHUB ? 'id' : 'repoUuid'
  const orgKey = source === GITHUB ? 'orgId' : 'orgUuid'
  const orgIdKey = source === GITHUB ? 'id' : 'uuid'

  if (!organizations.length) {
    // TODO: show error message
    return Promise.reject()
  }
  const organizationIds = organizations.map(o => o[orgIdKey]).join(',')
  const orgQueryString = source === GITHUB ? 'orgId' : 'orgUuid'

  return axios
    .get(
      getServerUrl(WORKSPACES, '/workspace/repositories', {
        workspaceId: workspaces.selectedWorkspace,
        [orgQueryString]: organizationIds,
        name: query,
        limit: '10',
        gitSourceType: source
      }),
      { noSpinner: true }
    )
    .then(response => {
      return response.data.map(repo => {
        const repoId = repo[repoKey]
        const orgId = repo[orgKey]
        const organization = organizations.find(o => o[orgIdKey] === orgId)
        return {
          label: `${organization.name} / ${repo.name}`,
          value: repoId,
          orgId
        }
      })
    })
}

export const validateWorkspaceInvite = (token, workspaceId) => dispatch => {
  return axios
    .put(getServerUrl(WORKSPACES, '/invite/validate/', { workspaceId }), {
      token
    })
    .then(response => {
      dispatch(clearWorkspaceInvite())
      return response.workspaceName
    })
    .catch(error => {
      const { errors } = error
      let pageType
      let message

      if (errors.invalidTokenOrEmail) {
        pageType = INVALID_WORKSPACE_INVITE
      }
      if (errors.nonValidatedEmail) {
        pageType = ERROR_WITH_MESSAGE_AND_CONTINUE_OPTION
        message = errors.nonValidatedEmail
      }
      if (errors.expiredToken) {
        pageType = ERROR_WITH_MESSAGE_AND_CONTINUE_OPTION
        message = errors.expiredToken
      }
      dispatch(showErrorPage(pageType, message))
    })
}

export const resendWorkspaceInvite = (email, workspaceId) => () => {
  return axios.put(
    getServerUrl(WORKSPACES, '/invite/resend', { workspaceId }),
    {
      workspaceId,
      email
    }
  )
}

export const continueWithoutJoiningWorkspace = () => (dispatch, getState) => {
  dispatch(clearWorkspaceInvite())
  window.location.href = '/'
}

export const logOutAndKeepToken = () => (dispatch, getState) => {
  dispatch(logout())
  window.location.href = '/log-in'
}
