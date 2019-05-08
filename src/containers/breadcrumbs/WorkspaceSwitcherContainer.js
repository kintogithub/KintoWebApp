import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { pages } from 'constants/pages'
import { getPageUrl } from 'helpers/urlHelper'

import WorkspaceSwitcher from '../../components/breadcrumbs/WorkspaceSwitcher'

function mapStateToProps(state) {
  const { selectedWorkspace, byId, allIds } = state.workspaces
  const selectedItem = byId[selectedWorkspace] || {}

  const dropdownItems = allIds.map(w => {
    const workspace = byId[w]
    return {
      text: workspace.name,
      active:
        selectedItem && selectedItem.workspaceId === workspace.workspaceId,
      url: getPageUrl(pages.workspaceEdit, {
        workspaceId: workspace.workspaceId
      })
    }
  })

  return {
    dropdownItems,
    selectedWorkspace,
    selectedItemName: selectedItem.name || ''
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actionHandler: workspaceId =>
      dispatch(push(getPageUrl(pages.workspaceCreate, { workspaceId })))
  }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    actionHandler: () =>
      dispatchProps.actionHandler(stateProps.selectedWorkspace)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(WorkspaceSwitcher)
