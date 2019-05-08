import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Prompt, Switch, Redirect } from 'react-router-dom'
import { isMobileOnly } from 'react-device-detect'

import NavBarContainer from 'containers/app/NavBarContainer'
import SideBarContainer from 'containers/app/SideBarContainer'
import GlobalSaveBarContainer from 'containers/app/GlobalSaveBarContainer'
import BreadcrumbContainer from 'containers/app/BreadcrumbContainer'
import DashboardContainer from 'containers/DashboardContainer'
import BlockedDeviceDisplay from './blockedDevice/BlockedDeviceDisplay'
import Market from './Market'
import ApolloConnect from './ApolloConnect'

class App extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool,
    token: PropTypes.string,
    blockNavigate: PropTypes.bool.isRequired,
    goToLogin: PropTypes.func.isRequired,
    fetchWorkspaces: PropTypes.func.isRequired,
    fetchCurrentUser: PropTypes.func.isRequired
  }

  state = {
    isSideBarShownMobile: false,
    isLoaded: false
  }

  async componentDidMount() {
    const {
      isLoggedIn,
      fetchWorkspaces,
      fetchCurrentUser,
      goToLogin
    } = this.props
    window.addEventListener('beforeunload', this.onUnload)
    if (isLoggedIn) {
      const workspacesPromise = fetchWorkspaces()
      const currentUserPromise = fetchCurrentUser()
      await Promise.all([workspacesPromise, currentUserPromise])
      this.setState({ isLoaded: true })
    } else if (!isMobileOnly) {
      goToLogin()
    }
  }

  componentWillReceiveProps() {
    if (!this.props.isLoggedIn) this.props.goToLogin()
  }

  toggleNav = () => {
    this.setState({ isSideBarShownMobile: !this.state.isSideBarShownMobile })
  }

  onUnload = e => {
    if (this.props.blockNavigate) {
      // make sure future version will show the same message
      const text =
        'There are unsaved changes on this page. Are you sure you want to leave?'
      e.returnValue = text
      return text
    }
  }

  render() {
    const { firstWorkspaceId, match, isNotification, token } = this.props
    const { isSideBarShownMobile, isLoaded } = this.state

    return (
      <div className={`app ${isNotification ? 'notify' : ''}`}>
        <NavBarContainer
          isSideBarShownMobile={isSideBarShownMobile}
          toggleNavHandler={this.toggleNav}
          isMobileOnly={isMobileOnly}
        />

        {isMobileOnly ? (
          <BlockedDeviceDisplay />
        ) : (
          <div>
            <Prompt
              when={this.props.blockNavigate}
              message={() =>
                'There are unsaved changes on this page. Are you sure you want to leave?'
              }
            />

            <SideBarContainer isSideBarShownMobile={isSideBarShownMobile} />

            <GlobalSaveBarContainer />
            {isLoaded && firstWorkspaceId ? (
              <ApolloConnect authToken={token}>
                <div className="layout-and-breadcrumb">
                  <BreadcrumbContainer />
                  <div className="layout-inner">
                    <div className="dashboard-content">
                      <Switch>
                        <Route
                          path={`${match.url}/dashboard/:workspaceId`}
                          component={DashboardContainer}
                        />
                        <Route
                          path={`${match.url}/market`}
                          component={Market}
                        />
                        <Redirect
                          to={`${match.url}/dashboard/${firstWorkspaceId}`}
                        />
                      </Switch>
                    </div>
                  </div>
                </div>
              </ApolloConnect>
            ) : null}
          </div>
        )}
      </div>
    )
  }
}

export default App
