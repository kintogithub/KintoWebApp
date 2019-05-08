export const WORKSPACES = 'WORKSPACES'
export const WORKSPACE_MEMBERS = 'WORKSPACE_MEMBERS'
export const KINTOBLOCKS = 'KINTOBLOCKS'
export const DEPLOYMENTS = 'DEPLOYMENTS'
export const DEPLOYMENTS_KINTOBLOCKS_COUNT = 'DEPLOYMENTS_KINTOBLOCKS_COUNT'
export const ENVIRONMENTS_LIVE = 'ENVIRONMENTS_LIVE'

export const errorMessages = {
  [WORKSPACES]: 'Only {0} workspaces can be created for one KintoHub account.',
  [WORKSPACE_MEMBERS]:
    'Only {0} members can be added to one workspace. Remove some existing members to invite new ones.',
  [KINTOBLOCKS]:
    'Only {0} KintoBlocks can be created in one workspace. Create a new workspace to make more.',
  [DEPLOYMENTS]:
    'Only {0} applications can be created in one workspace. Create a new workspace to make more.',
  [DEPLOYMENTS_KINTOBLOCKS_COUNT]:
    'Only {0} KintoBlocks dependencies can be added to an application in this workspace.',
  [ENVIRONMENTS_LIVE]:
    'Only {0} environments can have an active application deployed. Shut down one active application or replace to deploy this one.'
}

export const defaultLimitations = null
