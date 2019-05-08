import { connect } from 'react-redux'
import { logout } from '../../actions/auth'
import NavBar from '../../components/app/NavBar'

function mapStateToProps(state, { isSideBarShownMobile, isMobileOnly }) {
  const { currentUser } = state
  const { selectedWorkspace } = state.workspaces

  let initials = ''
  if (currentUser.userName) {
    initials = currentUser.userName.substring(0, 2)
  }
  return {
    homeUrl: selectedWorkspace ? `/app/dashboard/${selectedWorkspace}` : '/',
    isDashboard: state.pageOptions.isDashboard,
    isSideBarShownMobile,
    initials,
    isMobileOnly
  }
}

function mapDispatchToProps(dispatch, { toggleNavHandler }) {
  return {
    toggleNavHandler,
    logout: () => {
      dispatch(logout())
      // physical refresh
      window.location.href = '/log-in'
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
