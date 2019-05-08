import gql from 'graphql-tag'

export const KINTOBLOCK_STEPS_QUERY = gql`
  query BuildSteps(
    $kintoBlockId: String!
    $kintoBlockVersionName: String
    $buildId: String
  ) {
    buildSteps(
      where: {
        kintoBlockId: $kintoBlockId
        kintoBlockVersionName: $kintoBlockVersionName
        buildId: $buildId
      }
    ) {
      id
      index
      displayName
      name
      status
      createdAt
      endedAt
      buildId
      kintoBlockId
      kintoBlockVersionName
      commitSha
      commitMessage
      commitDate
    }
  }
`

export const KINTOBLOCK_STEPS_SUBSCRIPTION = gql`
  subscription BuildStepsSub(
    $kintoBlockId: String!
    $kintoBlockVersionName: String!
  ) {
    buildStep(
      where: {
        node: {
          kintoBlockId: $kintoBlockId
          kintoBlockVersionName: $kintoBlockVersionName
        }
      }
    ) {
      mutation
      node {
        id
        index
        displayName
        name
        status
        createdAt
        endedAt
        buildId
        kintoBlockId
        kintoBlockVersionName
        commitSha
        commitMessage
        commitDate
      }
    }
  }
`

export const DEPLOYMENT_WORKFLOW_QUERY = gql`
  query deploymentSteps($deploymentId: String!, $environmentId: String!) {
    deploymentSteps(
      where: { deploymentId: $deploymentId, environmentId: $environmentId }
    ) {
      id
      index
      name
      displayName
      status
      createdAt
      endedAt
      deploymentId
      deploymentNumber
      environmentId
      groupName
      kintoBlockName
      kintoBlockVersionName
      kintoBlockVersionType
      totalSteps
    }
  }
`

export const DEPLOYMENT_WORKFLOW_SUBSCRIPTION = gql`
  subscription deploymentStep($deploymentId: String!, $environmentId: String!) {
    deploymentStep(
      where: {
        node: { deploymentId: $deploymentId, environmentId: $environmentId }
      }
    ) {
      mutation
      node {
        id
        index
        name
        displayName
        status
        createdAt
        endedAt
        deploymentId
        deploymentNumber
        environmentId
        groupName
        kintoBlockName
        kintoBlockVersionName
        kintoBlockVersionType
        totalSteps
      }
    }
  }
`

export const KINTOBLOCK_BUILDS_QUERY = gql`
  query KintoBlockBuilds($kintoBlockIds: [String!]!) {
    kintoBlockBranches(where: { blockId_in: $kintoBlockIds }) {
      blockId
      branchName
      builds(orderBy: createdAt_DESC, first: 1, where: { status: SUCCESS }) {
        buildId
        status
        commitSha
        commitMessage
        commitDate
      }
    }
  }
`

export const DEPLOYMENT_ENVIRONMENTS_SUCCESS_QUERY = gql`
  query DeploymentEnvironmentsSuccess($deploymentIds: [String!]!) {
    deploymentEnvironments(where: { deploymentId_in: $deploymentIds }) {
      deploymentId
      environmentId
      workflows(orderBy: createdAt_DESC, first: 1, where: { status: SUCCESS }) {
        environmentId
        deploymentType
        deploymentVersion
        updatedAt
      }
    }
  }
`
export const DEPLOYMENT_ENVIRONMENTS_STATUS_QUERY = gql`
  query DeploymentEnvironmentsLast($deploymentIds: [String!]!) {
    deploymentEnvironments(where: { deploymentId_in: $deploymentIds }) {
      deploymentId
      environmentId
      workflows(orderBy: createdAt_DESC, first: 1) {
        status
      }
    }
  }
`
