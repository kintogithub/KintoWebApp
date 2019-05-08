import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { pages } from 'constants/pages'
import { DEPLOYMENT } from 'constants/switcherTypes'
import { getPageUrl } from 'helpers/urlHelper'
import { getVersionType } from 'helpers/versionHelper'
import { getAllDeployments } from 'selectors/deployments'
import { getAllKintoBlocks } from 'selectors/kintoBlocks'

import KintoSwitcher from 'components/breadcrumbs/KintoSwitcher'

function mapStateToProps(state, { disabled, type }) {
  const isDeployment = type === DEPLOYMENT
  const workspaceId = state.workspaces.selectedWorkspace
  const { selectedDeploymentId, selectedKintoBlockId } = state.pageOptions
  const createPage = isDeployment
    ? pages.dashboardDeploymentsCreate
    : pages.dashboardKintoBlocksTypeSelect
  const editPage = isDeployment
    ? pages.dashboardDeploymentsManage
    : pages.dashboardKintoBlocksManage

  const selectedItem =
    (isDeployment
      ? state.deployments.byId[selectedDeploymentId]
      : state.kintoBlocks.byId[selectedKintoBlockId]) || {}

  const list = isDeployment
    ? getAllDeployments(state)
    : getAllKintoBlocks(state)

  const noSelectedItem = selectedItem.id === undefined

  const dropdownItems = list.map(i => ({
    text: isDeployment ? i.name : i.displayName,
    active: selectedItem && selectedItem.id === i.id,
    kintoBlockType: !isDeployment ? i.type : null,
    url: getPageUrl(
      editPage,
      isDeployment
        ? {
            id: i.id,
            workspaceId,
            envId: i.environments[0].id
          }
        : {
            id: i.id,
            version: i.versions[0].name,
            type: getVersionType(i.versions[0]),
            workspaceId
          },
      true
    )
  }))

  const envId =
    selectedItem.environments && selectedItem.environments.length
      ? selectedItem.environments[0].id
      : null

  const selectedItemUrl = getPageUrl(
    editPage,
    isDeployment
      ? {
          id: selectedItem.id,
          workspaceId,
          envId
        }
      : {
          id: selectedItem.id,
          version: selectedItem.versions && selectedItem.versions[0].name,
          type: getVersionType(
            selectedItem.versions && selectedItem.versions[0]
          )
        },
    null,
    true
  )

  const itemName = isDeployment ? selectedItem.name : selectedItem.displayName

  return {
    isDeployment,
    disabled: noSelectedItem || disabled,
    selectedItemType: !isDeployment ? selectedItem.type : null,
    selectedItemName: noSelectedItem ? 'Loading...' : itemName,
    selectedItemUrl,
    createUrl: workspaceId && getPageUrl(createPage, { workspaceId }),
    dropdownItems
  }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...stateProps,
    ...ownProps,
    actionHandler: () => {
      dispatchProps.push(stateProps.createUrl)
    }
  }
}

export default connect(
  mapStateToProps,
  {
    push
  },
  mergeProps
)(KintoSwitcher)
