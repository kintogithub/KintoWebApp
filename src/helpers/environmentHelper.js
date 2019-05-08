import { deploymentState } from '../constants/deploymentStates'

// TODO only used temp in selectors/deploymentEnvironment
export const getLastSuccessTagName = env => {
  const stateTag = getLastStateAndTag(env)
  if (stateTag.state === deploymentState.success) {
    return stateTag.versionName
  }
  return null
}
export const getLastStateAndTag = env => {
  if (!env || !env.releases || !env.releases.length) {
    return {}
  }
  const currentRelease = env.releases[env.releases.length - 1]
  const lastStep = currentRelease.steps[currentRelease.steps.length - 1]
  return {
    versionName: currentRelease.version.name,
    state: lastStep.state,
    isLive: lastStep.state === deploymentState.success,
    completionTime: lastStep.completonTime
  }
}
