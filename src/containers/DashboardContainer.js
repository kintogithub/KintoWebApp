import { connect } from 'react-redux'
import { fetchWorkspace, workspaceSelect } from '../actions/workspaces'
import Dashboard from '../components/Dashboard'

function mapStateToProps(state, { match }) {
  return {
    workspaceId: match.params.workspaceId,
    selectedWorkspace: state.workspaces.selectedWorkspace
  }
}

export default connect(mapStateToProps, { fetchWorkspace, workspaceSelect })(
  Dashboard
)
