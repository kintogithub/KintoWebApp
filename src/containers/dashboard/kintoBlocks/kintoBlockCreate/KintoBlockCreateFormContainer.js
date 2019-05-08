import { connect } from 'react-redux'
import { formValueSelector, change, untouch } from 'redux-form'
import debounce from 'debounce-promise'
import { MICROSERVICE } from 'constants/kintoBlockTypes'
import { NONE } from 'constants/kintoBlockDocTypes'
import { HTTP, GRPC } from 'constants/protocolTypes'
import { GITHUB, BITBUCKET, GITLAB, gitRepoTypes } from 'constants/gitRepos'
import { WEBAPP } from 'constants/websiteTypes'
import { websiteTypeOptions } from 'constants/kintoBlockFormOptions'
import {
  getDefaults,
  getVersionBuildConfig
} from 'constants/microserviceAdvancedDefaults'
import { STATIC } from 'constants/websiteTypes'
import { getDockerImage } from 'helpers/dockerImageHelper'
import { HELM, HELM_LANG } from 'constants/serviceTypes'
import { createKintoBlock } from 'actions/kintoBlocks'
import { searchRepositories } from 'actions/workspaces'
import { goToNextItem } from 'actions/tutorial'
import { hasGitSourcesSelector } from 'selectors/workspaces'
import KintoBlockCreateForm from 'components/dashboard/kintoBlocks/kintoBlockCreate/KintoBlockCreateForm'

const formName = 'kintoBlockCreateForm'
const selector = formValueSelector(formName)

function mapStateToProps(state, { kintoBlockType }) {
  const hasGitSources = hasGitSourcesSelector(state)
  let isNewRepository = selector(state, 'isNewRepository')
  if (typeof isNewRepository !== 'boolean') {
    isNewRepository = true
  }

  const selectedOrganizationId = selector(state, 'organizationId')
  const selectedLanguage = selector(state, 'language')
  const selectedWorkspace =
    state.workspaces.byId[state.workspaces.selectedWorkspace]
  const gitSources = selectedWorkspace.gitSources || {}
  let selectedGitSource = hasGitSources ? Object.keys(gitSources)[0] : ''

  if (selector(state, 'gitSourceType')) {
    selectedGitSource = selector(state, 'gitSourceType')
  }

  const isGRPCEnabled = selector(state, 'protocol') === GRPC

  const organizations = gitRepoTypes
    .filter(repoType => !!gitSources[repoType])
    .reduce(
      (acc, repoType) => [...acc, ...gitSources[repoType].organizations],
      []
    )

  const preFillOrg =
    organizations.find(o => o.id === selectedOrganizationId) ||
    organizations.find(o => o.uuid === selectedOrganizationId)

  const preFillText = preFillOrg ? preFillOrg.name : ''
  let unlinkedOrganizations = []

  const organizationOptions = organizations.map(org => ({
    value: !!org.uuid ? org.uuid : org.id,
    label: org.name,
    group: 'organization',
    gitSourceType: !!org.uuid ? BITBUCKET : GITHUB
  }))

  const selectGitSourceOptions = gitRepoTypes.map(source => {
    let linkedText = !!gitSources[source] ? 'linked' : 'not linked'
    let label = 'Bitbucket'

    if (source === GITLAB) {
      linkedText = 'coming soon'
      label = 'GitLab'
    }

    if (source === GITHUB) {
      label = 'GitHub'
    }

    const sourceObject = {
      value: source,
      label,
      linkedText,
      isDisabled: source === GITLAB,
      group: 'gitSources',
      gitSourceType: source
    }

    if (!gitSources[source]) {
      unlinkedOrganizations.push(sourceObject)
    }
    return sourceObject
  })

  const groupedOrganizationOptions = [
    {
      label: 'organization',
      options: organizationOptions
    },
    {
      label: 'git sources',
      options: unlinkedOrganizations
    }
  ]

  const defaultOrganization = organizations[0]

  let defaultOrgId = '0'
  let defaultGitSource = null

  if (hasGitSources) {
    defaultGitSource = !!defaultOrganization.id ? GITHUB : BITBUCKET
    defaultOrgId =
      defaultOrganization.id !== '-1'
        ? defaultOrganization.id
        : defaultOrganization.uuid
  }

  const showAdvanceBasicOptions = selector(state, 'blockSubType') === WEBAPP

  return {
    organizations,
    isNewRepository,
    preFillText: `${preFillText}/ `,
    gitSources,
    selectGitSourceOptions,
    groupedOrganizationOptions,
    selectedGitSource,
    websiteTypeOptions,
    showAdvanceBasicOptions,
    isGRPCEnabled,
    selectedLanguage,
    initialValues: {
      isPublic: true,
      isNewRepository: defaultGitSource !== GITHUB,
      createExampleProject: true,
      memberIds: [],
      organizationId: defaultOrgId,
      gitSourceType: defaultGitSource,
      versionBuildConfigData: {
        port: getVersionBuildConfig('port'),
        buildCommand: getVersionBuildConfig('buildCommand'),
        runCommand: getVersionBuildConfig('runCommand'),
        docFormat: kintoBlockType === MICROSERVICE ? NONE : null
      },
      protocol: HTTP
    }
  }
}

function mapDispatchToProps(dispatch, { kintoBlockType }) {
  const formName = 'kintoBlockCreateForm'
  return {
    searchRepositories: (query, source) =>
      dispatch(searchRepositories(query, source)),
    onSubmit: data => {
      let createObject = {
        ...data,
        blockType: kintoBlockType || MICROSERVICE
      }

      if (data.gitSourceType === BITBUCKET) {
        createObject = {
          ...data,
          blockType: kintoBlockType || MICROSERVICE,
          repositoryUuid: data.repositoryId,
          repositoryId: '0',
          organizationId: '0',
          organizationUuid: data.organizationId
        }
      }
      return dispatch(createKintoBlock(createObject))
    },
    goToNextItem: () => dispatch(goToNextItem('repositoryName', 'submit')),
    selectRepo: data => {
      dispatch(change(formName, 'organizationId', data.orgId))
      dispatch(change(formName, 'repositoryId', data.value))
    },
    onToggleOrganization: data => {
      dispatch(change(formName, 'gitSourceType', data))
    },
    onToggleType: data => {
      if (data === STATIC || data === HELM) {
        dispatch(change(formName, 'versionBuildConfigData.port', null))
        dispatch(change(formName, 'versionBuildConfigData.buildCommand', null))
        dispatch(change(formName, 'versionBuildConfigData.runCommand', null))
        dispatch(change(formName, 'languageVersion', null))
        dispatch(change(formName, 'language', data === HELM ? HELM_LANG : null))
      } else {
        const defaults = getDefaults(data)
        dispatch(change(formName, 'versionBuildConfigData.port', defaults.port))
        dispatch(
          change(
            formName,
            'versionBuildConfigData.buildCommand',
            defaults.buildCommand
          )
        )
        dispatch(
          change(
            formName,
            'versionBuildConfigData.runCommand',
            defaults.runCommand
          )
        )
        dispatch(change(formName, 'language', defaults.language))
        dispatch(change(formName, 'languageVersion', null))
        dispatch(untouch(formName, 'languageVersion'))
      }
    },
    onToggleLanguageVersion: data => {
      dispatch(change(formName, 'dockerImageName', getDockerImage(data)))
    },
    onToggleRepositoryType: (data, orgId) => {
      if (data === true) {
        dispatch(change(formName, 'organizationId', orgId))
      } else {
        dispatch(change(formName, 'organizationId', null))
      }
      dispatch(change(formName, 'repositoryId', null))
      dispatch(change(formName, 'repositoryName', null))
      dispatch(change(formName, 'createExampleProject', null))
      dispatch(untouch(formName, 'repositoryName', 'repositoryId'))
    }
  }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const searchFunc = query => {
    return dispatchProps.searchRepositories(query, stateProps.selectedGitSource)
  }
  const orgKey = stateProps.selectedGitSource === GITHUB ? 'id' : 'uuid'
  const firstOrg = stateProps.organizations.length
    ? stateProps.organizations[0]
    : null

  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    searchRepositories: debounce(searchFunc, 800),
    selectRepository: data =>
      dispatchProps.selectRepo(data, stateProps.selectedGitSource),
    onToggleRepositoryType: data =>
      dispatchProps.onToggleRepositoryType(data, firstOrg[orgKey]),
    onToggleVersion: () => {
      dispatchProps.onToggleLanguageVersion(stateProps.selectedLanguage)
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(KintoBlockCreateForm)
