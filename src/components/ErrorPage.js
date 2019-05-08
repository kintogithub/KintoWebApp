import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isAnalyticsActive, trackException } from 'helpers/analyticsHelper'
import {
  REFRESH_PAGE,
  NOT_FOUND,
  INVALID_WORKSPACE_INVITE,
  ERROR_WITH_MESSAGE_AND_CONTINUE_OPTION
} from 'constants/errorPageTypes'
import { Button } from './forms'
import LandingNavBar from './ui/LandingNavBar'
import Footer from './ui/Footer'

class ErrorPage extends Component {
  static propTypes = {
    errorPageType: PropTypes.string,
    errorPageMessage: PropTypes.string,
    goToDashboard: PropTypes.func,
    logOutAndKeepToken: PropTypes.func,
    showErrorPage: PropTypes.func.isRequired
  }

  refreshPage() {
    window.location.reload()
  }

  componentDidCatch(error, info) {
    if (isAnalyticsActive()) {
      trackException(error, info)
    }
    this.props.showErrorPage(REFRESH_PAGE)
  }

  render() {
    const {
      errorPageType,
      errorPageMessage,
      goToDashboard,
      logOutAndKeepToken
    } = this.props
    if (errorPageType === REFRESH_PAGE) {
      return (
        <div className="error-page">
          <div className="error-container">
            <a className="navigation-logo hide-text" href="/">
              logo
            </a>
            <div className="error-section">
              <img src="/images/icon-mustard-alert-large.svg" alt="alert" />
              <h2>
                The website has encountered an error. Please reload the page.
              </h2>
              <p className="note">
                If you keep getting this error, please{' '}
                <a href="mailto:info@kintohub.com">contact us</a> for support.
              </p>
              <Button
                type="button"
                buttonType="secondary"
                className="btn-lg"
                onClick={this.refreshPage}
              >
                Reload Page
              </Button>
            </div>
          </div>
        </div>
      )
    }

    if (errorPageType === NOT_FOUND) {
      return (
        <div>
          <LandingNavBar url="/" />
          <div className="content">
            <h1 className="center">Oopsie</h1>
            <h3 className="center">Page not found</h3>
            <div className="center">
              <img src="/images/errors-glitch.gif" alt="Page not found" />
            </div>
          </div>
          <Footer />
        </div>
      )
    }

    if (errorPageType === INVALID_WORKSPACE_INVITE) {
      return (
        <div>
          <LandingNavBar url="/" />
          <div className="workspace-error">
            <img
              src="/images/background.svg"
              alt="background"
              className="background-image"
            />
            <div className="content">
              <div className="error-message-window">
                <div className="warning" />
                <h2 className="center">
                  The token or email is invalid. Please try logging in again.
                </h2>
                <button
                  onClick={() => logOutAndKeepToken()}
                  className="button secondary margin"
                >
                  Log In With a Different Email
                </button>
                <button
                  onClick={() => goToDashboard()}
                  className="button secondary"
                >
                  Continue Without Joining this Workspace
                </button>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )
    }
    if (errorPageType === ERROR_WITH_MESSAGE_AND_CONTINUE_OPTION) {
      return (
        <div>
          <LandingNavBar url="/" />
          <div className="workspace-error">
            <img
              src="/images/background.svg"
              alt="background"
              className="background-image"
            />
            <div className="content">
              <div className="error-message-window">
                <div className="warning" />
                <h2 className="center">{errorPageMessage}</h2>
                <button
                  onClick={() => goToDashboard()}
                  className="button secondary"
                >
                  Continue Without Joining this Workspace
                </button>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorPage
