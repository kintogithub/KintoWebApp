import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { BRANCH, TAG } from 'constants/version'
import { getUrl } from 'helpers/urlHelper'
import {
  getVersionType,
  getVersionInfo,
  getVersionName
} from 'helpers/versionHelper'
import KintoBlockTagAndBranchDropDown from 'components/dashboard/ui/KintoBlockTagAndBranchDropDown'

function mapStateToProps(
  state,
  { url, kintoBlock, noHighlight, isDocumentation }
) {
  let selectedKintoBlock =
    kintoBlock ||
    state.kintoBlocks.byId[state.pageOptions.selectedKintoBlockId] ||
    {}

  if (isDocumentation) {
    selectedKintoBlock = state.documentation.selectedKintoBlock
      ? state.documentation.selectedKintoBlock
      : {}
  }

  const id = selectedKintoBlock.id || ''
  const versionType = getVersionType(selectedKintoBlock.version) || 'branch'

  const versions = selectedKintoBlock.versions || []

  const getArray = versionType => {
    return versions.filter(v => v.type === versionType).map(v => {
      const versionInfo = getVersionInfo(id, v, state.kintoBlockBuilds)
      return {
        name: v.name,
        url: getUrl(
          url,
          {
            id,
            version: v.name,
            type: getVersionType(v),
            workspaceId: state.workspaces.selectedWorkspace
          },
          true
        ),
        activeBuildId: versionInfo.buildId,
        note: versionInfo.note,
        lastUpdated: versionInfo.lastUpdated
      }
    })
  }

  return {
    kintoBlock: selectedKintoBlock,
    versionType,
    kintoBlockType: selectedKintoBlock.type,
    branchArray: getArray(BRANCH),
    tagArray: getArray(TAG),
    dropdownText: getVersionName(
      selectedKintoBlock.version ? selectedKintoBlock.version.name : null
    ),
    id: `ID${id}`,
    noHighlight
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onClickHandler: item => {
      dispatch(push(item.url))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KintoBlockTagAndBranchDropDown)
