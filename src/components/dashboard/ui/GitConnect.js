import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  setExitLocation,
  setWorkpaceIdInLocalStorage
} from 'helpers/workspaceHelper'
import { pageTypes } from 'constants/gitRepos'

// TODO fix anchor and replace with buttons
/* eslint-disable jsx-a11y/anchor-is-valid */

class GitConnect extends Component {
  static propTypes = {
    isGithubConnected: PropTypes.bool.isRequired,
    isBitbucketConnected: PropTypes.bool.isRequired,
    githubUrl: PropTypes.string,
    bitbucketUrl: PropTypes.string,
    isModalUI: PropTypes.bool,
    workspaceId: PropTypes.string.isRequired
  }
  componentDidMount() {
    setWorkpaceIdInLocalStorage(this.props.workspaceId)
    if (this.props.isModalUI) {
      setExitLocation(pageTypes.KB_CREATE)
    }
  }

  render() {
    const linkedClasses = 'button-success submitted'
    const {
      isGithubConnected,
      isBitbucketConnected,
      githubUrl,
      bitbucketUrl,
      isModalUI
    } = this.props
    if (isModalUI) {
      // ui used in the modal shown in kb create
      return (
        <div className="repo-cards">
          <div
            className={`repo-source-card ${isGithubConnected ? 'enabled' : ''}`}
          >
            <span className="logo github" />
            <h3 className="bold">GitHub</h3>
            <a
              href={githubUrl}
              className={`button button-icon button-icon-only button-icon-small secondary ${
                isGithubConnected ? linkedClasses : ''
              } `}
            >
              {isGithubConnected ? <span className="icon success" /> : 'Link'}
            </a>
          </div>

          <div
            className={`repo-source-card ${
              isBitbucketConnected ? 'enabled' : ''
            }`}
          >
            <span className="logo bitbucket" />
            <h3 className="bold">Bitbucket</h3>
            <a
              href={bitbucketUrl}
              className={`button button-icon button-icon-only button-icon-small secondary ${
                isBitbucketConnected ? linkedClasses : ''
              }`}
            >
              {isBitbucketConnected ? (
                <span className="icon success" />
              ) : (
                'Link'
              )}
            </a>
          </div>

          <div className="repo-source-card disabled">
            <span className="logo gitlab" />
            <h3 className="bold">GitLab</h3>
            <button className="button">Coming Soon</button>
          </div>
        </div>
      )
    }

    // ui used in workspace edit
    return (
      <div className="repos-connect">
        <a
          className={`button button-icon button-icon-small secondary ${
            isGithubConnected ? linkedClasses : ''
          }`}
          href={githubUrl}
        >
          {isGithubConnected ? (
            <React.Fragment>
              <span className="icon success" />
              GitHub Linked
            </React.Fragment>
          ) : (
            <React.Fragment>
              <span className="icon github" />
              Link GitHub Account
            </React.Fragment>
          )}
        </a>
        <a
          className={`button button-icon button-icon-small secondary ${
            isBitbucketConnected ? linkedClasses : ''
          }`}
          href={bitbucketUrl}
        >
          {isBitbucketConnected ? (
            <React.Fragment>
              <span className="icon success" />
              Bitbucket Linked
            </React.Fragment>
          ) : (
            <React.Fragment>
              <span className="icon bitbucket" />
              Link Bitbucket Account
            </React.Fragment>
          )}
        </a>

        <a className="button button-icon button-icon-small secondary disabled">
          <span className="icon gitlab" />
          GitLab Support Coming Soon
        </a>
      </div>
    )
  }
}

export default GitConnect
