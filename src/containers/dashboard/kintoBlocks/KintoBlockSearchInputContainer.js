import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import debounce from 'debounce-promise'
import { pages } from 'constants/pages'
import { getPageUrl } from 'helpers/urlHelper'
import { getVersionType } from 'helpers/versionHelper'
import { searchKintoBlocks } from 'actions/kintoBlocks'
import KintoBlockSearchInput from 'components/dashboard/kintoBlocks/KintoBlockSearchInput'

function mapStateToProps(state, { isSearch, isAdd }) {
  return {
    placeholder: isSearch ? 'Search Kintoblocks...' : 'Add KintoBlocks...',
    sharedOnly: !!isSearch,
    selectedWorkspace: state.workspaces.selectedWorkspace,
    selectClass: isAdd ? 'block-select' : ''
  }
}

function mapDispatchToProps(dispatch, { isSearch }) {
  const searchFunc = (query, publicOnly, skip) =>
    dispatch(searchKintoBlocks(query, publicOnly, skip))
  return {
    searchKintoBlocks: debounce(searchFunc, 800),
    goToDocumentation: (kb, workspaceId) => {
      dispatch(
        push(
          getPageUrl(pages.dashboardDocumentation, {
            workspaceId: workspaceId,
            id: kb.id,
            version: kb.version.name,
            type: getVersionType(kb.version)
          })
        )
      )
    }
  }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    onSelect: kb => {
      if ((Array.isArray(kb) && !kb.length) || !kb) {
        return
      }
      if (ownProps.isSearch) {
        dispatchProps.goToDocumentation(kb, stateProps.selectedWorkspace)
      } else if (ownProps.onSelect) {
        ownProps.onSelect(kb)
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  KintoBlockSearchInput
)
