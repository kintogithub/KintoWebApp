import { connect } from 'react-redux'
import {
  isBranchVersionEqual,
  getVersionAsText,
  getVersionStateClassName,
  asTextList,
  getVersionType
} from 'helpers/versionHelper'
import { pages } from 'constants/pages'
import { getUrl, getPageUrl } from 'helpers/urlHelper'
import KintoVersionSwitcher from '../../components/breadcrumbs/KintoVersionSwitcher'

function mapStateToProps(state, { type, disabled, url }) {
  const {
    selectedDeploymentId,
    selectedKintoBlockId,
    selectedEnvironmentId
  } = state.pageOptions
  const workspaceId = state.workspaces.selectedWorkspace
  const isDeployment = type === 'deployment'
  const editPage = isDeployment
    ? pages.dashboardDeploymentsManage
    : pages.dashboardKintoBlocksManage
  const selectedItem =
    (isDeployment
      ? state.deployments.byId[selectedDeploymentId]
      : state.kintoBlocks.byId[selectedKintoBlockId]) || {}

  let dropdownItems = []
  if (selectedItem.versions) {
    dropdownItems = selectedItem.versions.map(v => ({
      text: isDeployment ? getVersionAsText(v) : v.name,
      url:
        workspaceId &&
        getUrl(url, {
          id: selectedItem.id,
          version: isDeployment ? getVersionAsText(v, true) : v.name,
          type: getVersionType(v),
          envId: selectedEnvironmentId || '0',
          workspaceId
        }),
      tag: v.state,
      className: getVersionStateClassName(v),
      active: isBranchVersionEqual(v, selectedItem.version)
    }))
  }

  const version = selectedItem.version
  return {
    selectedItem,
    dropdownItems,
    selectedVersion: isDeployment
      ? getVersionAsText(selectedItem.version)
      : version && version.name,
    selectedVersionUrl:
      selectedItem.id &&
      workspaceId &&
      getPageUrl(editPage, {
        id: selectedItem.id,
        version: isDeployment
          ? getVersionAsText(selectedItem.version, true)
          : selectedItem.version.name,
        type: getVersionType(selectedItem.version),
        workspaceId
      }),
    baseVersions: asTextList(selectedItem.versions),
    isKintoBlock: !isDeployment
  }
}

export default connect(mapStateToProps)(KintoVersionSwitcher)
