import { createSelector } from 'reselect'
import { format } from 'helpers/stringHelper'
import { getLiveEnvironmentCountForDeployments } from './deploymentEnvironments'
import {
  WORKSPACES,
  KINTOBLOCKS,
  DEPLOYMENTS,
  ENVIRONMENTS_LIVE,
  errorMessages
} from 'constants/limitations'

const addValidation = (collection, limitations, type) => {
  if (!type || !limitations || limitations[type] > collection.length) {
    return { isValid: true }
  }
  return {
    isValid: false,
    message: format(errorMessages[type], limitations[type])
  }
}

export const addWorkspaceValidation = createSelector(
  state => state.workspaces.allIds,
  state => state.currentUser.limitations,
  (workspaces, limitations) => {
    return addValidation(workspaces, limitations, WORKSPACES)
  }
)

export const addKintoBlockValidation = createSelector(
  state => state.kintoBlocks.allIds,
  state => state.currentUser.limitations,
  (kintoBlocks, limitations) => {
    return addValidation(kintoBlocks, limitations, KINTOBLOCKS)
  }
)

export const addKintoAppValidation = createSelector(
  state => state.deployments.allIds,
  state => state.currentUser.limitations,
  (deployments, limitations) => {
    return addValidation(deployments, limitations, DEPLOYMENTS)
  }
)

export const deployKintoAppValidation = createSelector(
  state => state.currentUser.limitations,
  getLiveEnvironmentCountForDeployments,
  (limitations, totalLiveEnvironments) => {
    if (
      !limitations ||
      limitations[ENVIRONMENTS_LIVE] > totalLiveEnvironments
    ) {
      return {
        isValid: true
      }
    }
    return {
      isValid: false,
      message: format(
        errorMessages[ENVIRONMENTS_LIVE],
        limitations[ENVIRONMENTS_LIVE]
      )
    }
  }
)
