import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import DeploymentsListContainer from 'containers/dashboard/deployments/DeploymentsListContainer'
import DeploymentManageContainer from 'containers/dashboard/deployments/DeploymentManageContainer'
import DeploymentCreateContainer from 'containers/dashboard/deployments/DeploymentCreateContainer'
import DeploymentRequestLogsContainer from 'containers/dashboard/deployments/DeploymentRequestLogsContainer'
import DeploymentChangelogsContainer from 'containers/dashboard/deployments/DeploymentChangelogsContainer'
import DeploymentDependenciesConfigContainer from 'containers/dashboard/deployments/DeploymentDependenciesConfigContainer'
import DeploymentConsoleLogsContainer from 'containers/dashboard/deployments/DeploymentConsoleLogsContainer'
import KintoBlockEndpointsContainer from 'containers/dashboard/documentation/KintoBlockEndpointsContainer'

class Deployments extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    deploymentEnvironmentsQuery: PropTypes.object,
    deploymentEnvironmentsStatusQuery: PropTypes.object,
    fetchDeployments: PropTypes.func.isRequired,
    deploymentEnvironmentsReceiveInfo: PropTypes.func.isRequired
  }

  state = {
    isLoaded: false,
    lastFetched: null
  }

  componentDidMount() {
    this.props.fetchDeployments().then(() => {
      this.setState({ isLoaded: true, lastFetched: new Date() })
    })
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.deploymentEnvironmentsQuery &&
      nextProps.deploymentEnvironmentsQuery &&
      !nextProps.deploymentEnvironmentsQuery.loading
    ) {
      this.props.deploymentEnvironmentsReceiveInfo(
        nextProps.deploymentEnvironmentsQuery.deploymentEnvironments,
        false
      )
    }
    if (
      this.props.deploymentEnvironmentsStatusQuery &&
      nextProps.deploymentEnvironmentsStatusQuery &&
      !nextProps.deploymentEnvironmentsStatusQuery.loading
    ) {
      this.props.deploymentEnvironmentsReceiveInfo(
        nextProps.deploymentEnvironmentsStatusQuery.deploymentEnvironments,
        true
      )
    }
  }

  render() {
    const { url } = this.props.match
    const { deploymentEnvironmentsQuery } = this.props
    const { isLoaded, lastFetched } = this.state
    return isLoaded ? (
      <Switch>
        <Route
          path={`${url}/list`}
          render={props => (
            <DeploymentsListContainer lastFetched={lastFetched} {...props} />
          )}
        />
        <Route path={`${url}/create`} component={DeploymentCreateContainer} />
        <Route
          exact
          path={`${url}/:id/environments/:envId`}
          render={props => (
            <DeploymentManageContainer
              deploymentEnvironmentsQuery={deploymentEnvironmentsQuery}
              {...props}
            />
          )}
        />

        <Route
          path={`${url}/:id/versions/:ver/config/:env`}
          component={DeploymentDependenciesConfigContainer}
        />
        <Route
          path={`${url}/:id/versions/:version/environment/:envId/releases/:releaseNumber/requestLogs`}
          component={DeploymentRequestLogsContainer}
        />
        <Route
          path={`${url}/:id/versions/:version/environment/:envId/releases/:releaseNumber/consoleLogs`}
          component={DeploymentConsoleLogsContainer}
        />
        <Route
          path={`${url}/:id/changelogs`}
          component={DeploymentChangelogsContainer}
        />

        <Route
          path={`${url}/:depId/environment/:envId/kintoblock/:id/versions/:version/:type/documentation`}
          component={KintoBlockEndpointsContainer}
        />
      </Switch>
    ) : null
  }
}

export default Deployments
