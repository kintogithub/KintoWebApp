import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GitConnectContainer from 'containers/dashboard/ui/GitConnectContainer'
import {
  setWorkpaceIdInLocalStorage,
  setExitLocation,
  setTutorial
} from 'helpers/workspaceHelper'
import { pageTypes } from 'constants/gitRepos'

class LinkRepoModal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    cancelTutorialMode: PropTypes.func,
    isTutorial: PropTypes.bool.isRequired,
    hasGitSources: PropTypes.bool.isRequired,
    pageType: PropTypes.string.isRequired,
    workspaceId: PropTypes.string.isRequired
  }

  componentDidMount() {
    setWorkpaceIdInLocalStorage(this.props.workspaceId)
    setExitLocation(pageTypes.KB_CREATE)
    setTutorial(this.props.isTutorial)
  }

  render() {
    const {
      onClose,
      hasGitSources,
      isTutorial,
      cancelTutorialMode,
      pageType
    } = this.props

    return (
      <div className="link-repo-modal">
        <div className="kh-modal-title">Link Repo Sources</div>

        {isTutorial && (
          <div className="tutorial-notification">
            <h4>Allow access to at least one repo source.</h4>
            <button className="link-styled-button" onClick={cancelTutorialMode}>
              Skip
            </button>
          </div>
        )}

        <div className="kh-modal-body">
          <h4 className="information">
            <span className="icon exclamation" />
            Please link at least one repo source:
          </h4>
          <GitConnectContainer isModalUI={true} pageType={pageType} />
          <p className="link-description">
            Linking a repo source allows you to use any existing repositories
            within and create new ones.{' '}
            <span className="bold">
              Please make sure every workspace member has the correct access to
              the organization.
            </span>{' '}
            Once it’s been linked you cannot unlink it.
          </p>
        </div>
        <div className="kh-modal-footer">
          {hasGitSources ? (
            <div
              className={`button-and-tooltip ${
                isTutorial ? 'with-tooltip' : 'no-tooltip'
              }`}
            >
              <div className="tutorial top">
                <img src="/images/help-tooltip-top-blank.svg" alt="tooltip" />
                <div className="tutorial-step">▼</div>
              </div>
              <button type="button" onClick={onClose} className="button">
                I'm Done
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="button secondary"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    )
  }
}

export default LinkRepoModal
