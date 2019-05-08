import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { isAdmin } from 'selectors/auth'
import { Route, Redirect } from 'react-router-dom'

/*
 * workspaceUrl param is optional, if not passed will look at the selectedWorkspace instead
 * workspaceUrl param must be defined in the url of the current route
 */
const AdminRoute = ({
  component: Component,
  userId,
  workspaces,
  selectedWorkspace,
  workspaceUrl,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      const workspaceId = workspaceUrl
        ? props.match.params[workspaceUrl]
        : selectedWorkspace
      return isAdmin(workspaceId, userId, workspaces) ? (
        <Component {...props} />
      ) : (
        <Redirect to="/app" />
      )
    }}
  />
)

function mapStateToProps(state, props) {
  const { selectedWorkspace, byId } = state.workspaces
  return {
    userId: state.currentUser.id,
    selectedWorkspace,
    workspaces: byId
  }
}

export default withRouter(connect(mapStateToProps)(AdminRoute))
