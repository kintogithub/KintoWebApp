import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import AdminRoute from './app/AdminRoute'
import WorkspaceEditContainer from 'containers/workspaces/WorkspaceEditContainer'
import KintoBlocksContainer from 'containers/dashboard/KintoBlocksContainer'
import KintoBlockBuildsContainer from 'containers/dashboard/kintoBlocks/KintoBlockBuildsContainer'
import DeploymentsContainer from 'containers/dashboard/DeploymentsContainer'
import WorkspaceCreateContainer from 'containers/workspaces/WorkspaceCreateContainer'
import DashboardHomeContainer from 'containers/dashboard/DashboardHomeContainer'

class Dashboard extends Component {
  static propTypes = {
    workspaceId: PropTypes.string,
    fetchWorkspace: PropTypes.func.isRequired,
    workspaceSelect: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { workspaceId, fetchWorkspace, workspaceSelect } = this.props
    fetchWorkspace(workspaceId)
    workspaceSelect(workspaceId)
  }

  componentWillReceiveProps(nextProps) {
    const { workspaceId, fetchWorkspace, workspaceSelect } = this.props
    if (workspaceId !== nextProps.workspaceId) {
      fetchWorkspace(nextProps.workspaceId)
      workspaceSelect(nextProps.workspaceId)
    }
  }

  render() {
    const { match, selectedWorkspace } = this.props

    return selectedWorkspace ? (
      <div>
        <Switch>
          <Route
            path={`${match.url}/create`}
            component={WorkspaceCreateContainer}
          />
          <AdminRoute
            path={`${match.url}/edit`}
            component={WorkspaceEditContainer}
          />

          <Route
            path={`${match.url}/kintoblocks/:id/:name/builds/:buildId`}
            component={KintoBlockBuildsContainer}
          />

          <Route
            path={`${match.url}/kintoblocks`}
            component={KintoBlocksContainer}
          />
          <Route
            path={`${match.url}/deployments`}
            component={DeploymentsContainer}
          />
          <Route path={`${match.url}`} component={DashboardHomeContainer} />
        </Switch>
      </div>
    ) : null
  }
}

export default Dashboard
