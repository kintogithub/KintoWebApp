import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getPageUrl } from '../../helpers/urlHelper'
import { pages } from '../../constants/pages'
import { addWorkspaceValidation } from '../../selectors/limitations'
import { showAlert } from '../../actions/pageOptions'
import WorkspaceCreate from '../../components/workspaces/WorkspaceCreate'

function mapStateToProps(state, { match }) {
  const { selectedWorkspace } = state.workspaces
  const redirectLink = getPageUrl(pages.dashboardHome, {
    workspaceId: selectedWorkspace
  })

  return {
    addWorkspaceValidation: addWorkspaceValidation(state),
    selectedWorkspace,
    redirectLink
  }
}

function mergeProps(stateProps, dispatchProps, mergeProps) {
  return {
    ...stateProps,
    throwOut(message) {
      dispatchProps.showAlert(message)
      dispatchProps.push(stateProps.redirectLink)
    }
  }
}

export default connect(mapStateToProps, { showAlert, push }, mergeProps)(
  WorkspaceCreate
)
