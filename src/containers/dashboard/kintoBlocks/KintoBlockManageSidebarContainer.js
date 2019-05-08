import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import KintoBlockManageSidebar from 'components/dashboard/kintoBlocks/KintoBlockManageSidebar.js'
import { getVersionType, getVersionInfo } from 'helpers/versionHelper'
import { getPageUrl } from 'helpers/urlHelper'
import { BRANCH, TAG } from 'constants/version'
import { pages } from 'constants/pages'

function mapStateToProps(state, { match }) {
  const { selectedWorkspace } = state.workspaces
  const { selectedKintoBlockId, topPageItem } = state.pageOptions
  const selectedKintoBlock = state.kintoBlocks.byId[selectedKintoBlockId] || {}
  const versions = selectedKintoBlock.versions || []
  const id = selectedKintoBlock.id || ''
  const versionType = getVersionType(selectedKintoBlock.version) || 'branch'

  const getArray = versionType => {
    return versions.filter(v => v.type === versionType).map(v => {
      const versionInfo = getVersionInfo(id, v, state.kintoBlockBuilds)
      return {
        name: v.name,
        url: getPageUrl(
          pages.dashboardKintoBlocksManage,
          {
            id,
            version: v.name,
            type: getVersionType(v),
            workspaceId: state.workspaces.selectedWorkspace
          },
          true
        ),
        type: getVersionType(v),
        activeBuildId: versionInfo.buildId ? versionInfo.buildId : '',
        note: versionInfo.note,
        lastUpdated: versionInfo.lastUpdated
      }
    })
  }

  return {
    selectedWorkspace,
    listOfBranches: getArray(BRANCH),
    listOfTags: getArray(TAG),
    topPageItem,
    versionType,
    selectedKintoBlockId,
    selectedKintoBlockItemName: selectedKintoBlock.version
      ? selectedKintoBlock.version.name
      : '',
    selectedBranchOrTag: '',
    kintoBlock: selectedKintoBlock
  }
}

export default connect(
  mapStateToProps,
  { push }
)(KintoBlockManageSidebar)
