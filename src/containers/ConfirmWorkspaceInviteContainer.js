import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { storeWorkspaceInviteToken } from '../actions/pageOptions'
import ConfirmWorkspaceInvite from '../components/ConfirmWorkspaceInvite'

function mapDispatchToProps(dispatch, { location, match }) {
  const { token } = match.params
  return {
    storeWorkspaceInviteToken: () => {
      dispatch(storeWorkspaceInviteToken(token))
      dispatch(push('/'))
    }
  }
}

export default connect(undefined, mapDispatchToProps)(ConfirmWorkspaceInvite)
