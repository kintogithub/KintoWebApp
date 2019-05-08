import { connect } from 'react-redux'
import debounce from 'debounce-promise'
import uniq from 'lodash/uniq'
import { graphql } from 'react-apollo'
import { KINTOBLOCK_BUILDS_QUERY } from 'constants/graphql'
import { getDependenciesFactory } from 'selectors/kintoDependencies'
import {
  searchKintoBlocks,
  fetchKintoBlockDependenciesData
} from 'actions/kintoBlocks'
import {
  updateTutorialFieldStatus,
  refreshActiveItemInTutorial
} from 'actions/tutorial'
import { kintoBlockBuildsReceive } from 'actions/kintoBlockBuilds'
import ManageDependenciesField from 'components/dashboard/ui/ManageDependenciesField'

function mapStateToProps(
  state,
  {
    appVersion,
    dependencies,
    name,
    isKintoBlock,
    kintoBlock,
    preFillInformation
  }
) {
  const workspaceId = state.workspaces.selectedWorkspace
  const { selectedDeploymentId, selectedEnvironmentId } = state.pageOptions
  const getDependencies = getDependenciesFactory()
  const dependenciesInfo = getDependencies(state, dependencies)

  let selectedKintoBlockIds = []
  if (isKintoBlock) {
    selectedKintoBlockIds.push(kintoBlock.id)
  }
  Object.keys(dependenciesInfo).forEach(k => {
    const item = dependenciesInfo[k]
    selectedKintoBlockIds.push(item.blockId)
    if (item.dependencies && item.dependencies.length) {
      selectedKintoBlockIds = selectedKintoBlockIds.concat(
        item.dependencies.map(i => i.blockId)
      )
    }
  })
  selectedKintoBlockIds = uniq(selectedKintoBlockIds)

  return {
    selectedEnvironmentId,
    appVersion,
    name,
    dependenciesInfo,
    isKintoBlock,
    selectedKintoBlockIds,
    workspaceId,
    isTutorial: state.tutorial.isTutorial,
    selectedDeploymentId,
    preFillInformation,
    kintoBlockBuilds: state.kintoBlockBuilds
  }
}

function mapDispatchToProps(dispatch) {
  const searchFunc = query => dispatch(searchKintoBlocks(query))
  return {
    updateDependenciesTutorialFieldStatus: () =>
      dispatch(updateTutorialFieldStatus('deploymentForm', 'appDependencies')),
    searchKintoBlocks: debounce(searchFunc, 800),
    fetchKintoBlockDependenciesData: (id, ver, type) =>
      dispatch(fetchKintoBlockDependenciesData(id, ver, type)),
    refreshActiveItemInTutorial: () => dispatch(refreshActiveItemInTutorial()),
    kintoBlockBuildsReceive: data => dispatch(kintoBlockBuildsReceive(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  graphql(KINTOBLOCK_BUILDS_QUERY, {
    options: ({ selectedKintoBlockIds, kintoBlockBuilds }) => ({
      variables: {
        kintoBlockIds: selectedKintoBlockIds
      }
    }),
    skip: ({ selectedKintoBlockIds, kintoBlockBuilds }) => {
      const areAllBuildsFetched = selectedKintoBlockIds.every(
        i => !!kintoBlockBuilds[i]
      )
      return areAllBuildsFetched
    }
  })(ManageDependenciesField)
)
