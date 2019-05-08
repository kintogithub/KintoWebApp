import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { showAlert } from 'actions/pageOptions'
import { getListWithActiveItem } from 'helpers/pageHelper'
import { getPageUrl } from 'helpers/urlHelper'
import { calculatePercentageProgress } from 'helpers/onboardingHelper'
import { pages } from 'constants/pages'
import { isCurrentUserAdminSelector } from 'selectors/auth'
import { addWorkspaceValidation } from 'selectors/limitations'
import SideBar from 'components/app/SideBar'

function mapStateToProps(state, { isSideBarShownMobile }) {
  const { isDashboard, activePage } = state.pageOptions
  const { onboarding } = state.currentUser
  const isCurrentUserAdmin = isCurrentUserAdminSelector(state)
  const selectedWorkspaceId = state.workspaces.selectedWorkspace
  const selectedWorkspace = state.workspaces.byId[selectedWorkspaceId] || {}
  const workspaces = state.workspaces.allIds.map(i => {
    const workspace = state.workspaces.byId[i]
    return {
      id: workspace.workspaceId,
      name: workspace.name
    }
  })
  workspaces.unshift({ id: '0', name: 'Create new workspace' })

  return {
    addWorkspaceValidation: addWorkspaceValidation(state),
    list: getListWithActiveItem(activePage, selectedWorkspaceId, isDashboard),
    activePage,
    isSideBarShownMobile,
    workspaces,
    selectedWorkspaceId,
    selectedWorkspaceMembers: selectedWorkspace.members || [],
    isCurrentUserAdmin,
    percentageProgress: onboarding ? calculatePercentageProgress(onboarding) : 0
  }
}

function mergeProps(stateProps, dispatchProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    selectWorkspace: id => {
      if (id === '0') {
        const workspaceValidation = stateProps.addWorkspaceValidation
        if (!workspaceValidation.isValid) {
          return dispatchProps.showAlert(workspaceValidation.message)
        }
        dispatchProps.push(
          getPageUrl(pages.workspaceCreate, {
            workspaceId: stateProps.selectedWorkspaceId
          })
        )
      } else {
        dispatchProps.push(getPageUrl(pages.dashboardHome, { workspaceId: id }))
        stateProps.selectedWorkspaceId = id
      }
    }
  }
}

export default connect(
  mapStateToProps,
  { push, showAlert },
  mergeProps
)(SideBar)
