import { push } from 'react-router-redux'
import axios from 'axios'
import capitalize from 'lodash/capitalize'

import { pages } from 'constants/pages'
import { KINTOBLOCKS, LOGS } from 'constants/backendMicroservices'
import { KINTO_BLOCK_STEP } from 'constants/onboarding'
import { KINTOBLOCK_CREATE_SUCCESS } from 'constants/congratsModals'
import { TAG } from 'constants/version'

/* TODO when backend is done
import { SHARED_BLOCK } from 'constants/kintoBlockShareType'
import { OWNED_BLOCK } from 'constants/kintoBlockOwnershipType'
*/

import { getPageUrl, getServerUrl } from 'helpers/urlHelper'
import { getVersionType } from 'helpers/versionHelper'

import { completeAction } from './currentUser'
import { formSubmitted, setCongratsModal } from './pageOptions'
import { deploymentDependencyConfigDefaultReceive } from './deployments'

export const RECEIVE_KINTO_BLOCKS = 'RECEIVE_KINTO_BLOCKS'
export const RECEIVE_KINTO_BLOCK = 'RECEIVE_KINTO_BLOCK'
export const ADD_KINTO_BLOCK = 'ADD_KINTO_BLOCK'
export const RECEIVE_KINTO_BLOCK_DEPENDENCIES =
  'RECEIVE_KINTO_BLOCK_DEPENDENCIES'
export const UPDATE_KINTO_BLOCK = 'UPDATE_KINTO_BLOCK'
export const UPDATE_BUILD_KINTO_BLOCK = 'UPDATE_BUILD_KINTO_BLOCK'
export const UPDATE_BUILDS_KINTO_BLOCK = 'UPDATE_BUILDS_KINTO_BLOCK'

export const kintoBlockUpdate = (id, data) => ({
  type: UPDATE_KINTO_BLOCK,
  id,
  data
})

export const kintoBlockUpdateBuilds = (id, data) => ({
  type: UPDATE_BUILDS_KINTO_BLOCK,
  id,
  data
})

export const kintoBlockUpdateBuild = (id, buildId, data) => ({
  type: UPDATE_BUILD_KINTO_BLOCK,
  id,
  buildId,
  data
})

export const kintoBlocksReceive = (data, metadata) => {
  return {
    type: RECEIVE_KINTO_BLOCKS,
    data,
    metadata
  }
}

export const kintoBlockReceiveDependencies = response => ({
  type: RECEIVE_KINTO_BLOCK_DEPENDENCIES,
  data: response.data,
  metadata: response.metadata
})

export const kintoBlockReceive = (id, data, metadata) => {
  return {
    type: RECEIVE_KINTO_BLOCK,
    id,
    data,
    metadata
  }
}

export const kintoBlockAdd = (id, data) => ({ type: ADD_KINTO_BLOCK, id, data })

export const fetchKintoBlocks = () => (dispatch, getState) => {
  const { selectedWorkspace } = getState().workspaces
  return axios
    .get(
      getServerUrl(KINTOBLOCKS, '/kintoblocks', {
        workspaceId: selectedWorkspace
      })
    )
    .then(response => {
      response.data.forEach(r => {
        // TODO untill backend is fixed
        if (r.blockType) {
          r.type = r.blockType
        }
      })
      dispatch(kintoBlocksReceive(response.data, response.metadata))
    })
}

export const fetchKintoBlock = (id, ver, type) => (dispatch, getState) => {
  const { selectedWorkspace } = getState().workspaces
  type = capitalize(type)
  return axios
    .get(
      getServerUrl(KINTOBLOCKS, '/kintoblock/version', {
        workspaceId: selectedWorkspace,
        kintoblockId: id,
        versionName: ver,
        versionType: type
      })
    )
    .then(response => {
      // TODO untill backend is fixed
      response.data.type = response.data.blockType
      return dispatch(kintoBlockReceive(id, response.data, response.metadata))
    })
}

export const createKintoBlockTag = (id, ver, buildId, data) => (
  dispatch,
  getState
) => {
  const { selectedWorkspace } = getState().workspaces
  return axios
    .post(
      getServerUrl(KINTOBLOCKS, '/kintoblock/version/tag/create', {
        workspaceId: selectedWorkspace,
        kintoblockId: id,
        versionName: ver,
        buildId
      }),
      data
    )
    .then(response => {
      const url = getPageUrl(pages.dashboardKintoBlocksManage, {
        id,
        workspaceId: selectedWorkspace,
        version: data.tag,
        type: TAG
      })

      dispatch(push(url))
    })
}

export const createKintoBlock = data => (dispatch, getState) => {
  const { workspaces, currentUser, tutorial, kintoBlocks } = getState()
  const { selectedWorkspace } = workspaces
  const currentUserId = currentUser.id
  const { isTutorial } = tutorial
  const { allIds } = kintoBlocks
  const isFirstKintoBlockCreated = isTutorial || allIds.length === 1

  return axios
    .post(
      getServerUrl(KINTOBLOCKS, '/kintoblock/create', {
        workspaceId: selectedWorkspace
      }),
      data
    )
    .then(response => {
      const { id, version } = response.data
      if (response.data.blockType) {
        response.data.type = response.data.blockType
      }
      const kintoBlockManageUrl = getPageUrl(pages.dashboardKintoBlocksManage, {
        workspaceId: selectedWorkspace,
        id,
        version: version.name,
        type: getVersionType(version)
      })
      if (isFirstKintoBlockCreated) {
        dispatch(completeAction(KINTO_BLOCK_STEP, currentUserId))
        dispatch(setCongratsModal(KINTOBLOCK_CREATE_SUCCESS))
      }
      dispatch(formSubmitted())
      dispatch(kintoBlockAdd(id, response.data))
      dispatch(push(kintoBlockManageUrl))
    })
}

export const updateKintoBlock = (id, ver, type, data) => (
  dispatch,
  getState
) => {
  const { selectedWorkspace } = getState().workspaces
  type = capitalize(type)
  return axios
    .put(
      getServerUrl(KINTOBLOCKS, '/kintoblock/version/update', {
        workspaceId: selectedWorkspace,
        kintoblockId: id,
        versionName: ver,
        versionType: type
      }),
      { data }
    )
    .then(res => {
      dispatch(formSubmitted())
      dispatch(kintoBlockUpdate(id, res.data))
    })
}

export const searchKintoBlocks = (q, sharedOnly, skip) => (
  dispatch,
  getState
) => {
  const { selectedWorkspace } = getState().workspaces
  // remove values from query string if they are falsy
  skip = skip.join(',') || null
  sharedOnly = sharedOnly || null
  /* TODO when backend is done
  const ownershipType = sharedOnly ? OWNED_BLOCK : undefined
  const sharedType = sharedOnly ? SHARED_BLOCK : undefined
   */
  return axios
    .get(
      getServerUrl(KINTOBLOCKS, '/kintoblocks/search', {
        workspaceId: selectedWorkspace
      }),
      {
        noSpinner: true,
        params: {
          name: q,
          limit: 10,
          skip,
          sharedOnly: sharedOnly ? 1 : undefined /*ownershipType, sharedType*/
        }
      }
    )
    .then(response => {
      const results = response.results || []
      return results.map(k => ({
        ...k,
        label: k.displayName
      }))
    })
}

export const fetchKintoBlockDependenciesData = (id, ver, type) => (
  dispatch,
  getState
) => {
  const { selectedWorkspace } = getState().workspaces
  type = capitalize(type)
  return axios
    .get(
      getServerUrl(KINTOBLOCKS, '/kintoblock/version/dependencydata', {
        workspaceId: selectedWorkspace,
        kintoblockId: id,
        versionName: ver,
        versionType: type
      })
    )
    .then(response => {
      dispatch(kintoBlockReceiveDependencies(response))
      return {
        blockId: response.data.id,
        version: response.data.version
      }
    })
}

export const refreshCommits = (id, version, type) => (dispatch, getState) => {
  const { selectedWorkspace } = getState().workspaces
  if (type === TAG) return
  return axios
    .post(
      getServerUrl(KINTOBLOCKS, '/kintoblock/version/commits', {
        workspaceId: selectedWorkspace,
        kintoblockId: id,
        versionName: version,
        versionType: type
      })
    )
    .then(response => {
      dispatch(kintoBlockUpdateBuilds(id, response.data))
    })
}

export const getKintoBlockBuilds = (blockName, buildId) => (
  dispatch,
  getState
) => {
  const { selectedWorkspace } = getState().workspaces
  const name = blockName.toLowerCase()
  return axios
    .get(
      getServerUrl(
        LOGS,
        `/${selectedWorkspace}/kintoblocks/${name}/builds/${buildId}/buildlogs`
      )
    )
    .then(response => {
      const formattedText = response.map(item => ({
        text: item.log
      }))
      return {
        data: formattedText
      }
    })
}

export const retryBuild = (id, version, buildId, buildData) => (
  dispatch,
  getState
) => {
  const { selectedWorkspace } = getState().workspaces
  const { selectedKintoBlockId } = getState().pageOptions
  const selectedKintoblock = getState().kintoBlocks.byId[selectedKintoBlockId]
  const { type } = selectedKintoblock.version
  return axios
    .post(
      getServerUrl(KINTOBLOCKS, `/kintoblock/version/build/retry`, {
        workspaceId: selectedWorkspace,
        kintoblockId: id,
        buildId,
        versionName: version
      }),
      buildData
    )
    .then(data => {
      // dispatch(kintoBlockUpdateBuild(id, buildId, data.build))

      // TODO: this is a workaround because some shit is broke yo
      return axios.get(
        getServerUrl(KINTOBLOCKS, '/kintoblock/version', {
          workspaceId: selectedWorkspace,
          kintoblockId: id,
          versionName: version,
          versionType: capitalize(type)
        })
      )
    })
    .then(response => {
      dispatch(kintoBlockUpdateBuilds(response.data.id, response.data))
    })
}

export const getDependencyConfigDefault = (
  deploymentId,
  dependencyId,
  blockId,
  version,
  type
) => (dispatch, getState) => {
  const { selectedWorkspace } = getState().workspaces
  const configData = {
    dependencies: [
      {
        dependencyId: dependencyId,
        blockId: blockId,
        version: version,
        type: type
      }
    ]
  }

  return axios
    .post(
      getServerUrl(KINTOBLOCKS, '/kintoblocks/dependenciesconfig', {
        workspaceId: selectedWorkspace
      }),
      configData
    )
    .then(response => {
      //TODO: a server side fix for initialising params to empty array

      if (response.configs) {
        response.configs.forEach(i => {
          if (!i.params) {
            i.params = []
          }
        })
        dispatch(
          deploymentDependencyConfigDefaultReceive(
            deploymentId,
            blockId,
            response.configs[0]
          )
        )
      }
    })
}
