import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { pages } from 'constants/pages'
import { pageTypes } from 'constants/gitRepos'
import { MICROSERVICE, WEBSITE, SERVICE } from 'constants/kintoBlockTypes'
import { getPageUrl } from 'helpers/urlHelper'
import LinkRepoModal from './kintoBlockCreate/LinkRepoModal'
import ComplexModal from '../ui/ComplexModal'

class KintoBlockTypeSelection extends Component {
  static propTypes = {
    workspaceId: PropTypes.string,
    redirectToDashboard: PropTypes.func.isRequired,
    throwOutIfReachLimit: PropTypes.func.isRequired,
    isTutorial: PropTypes.bool.isRequired,
    hasGitSources: PropTypes.bool.isRequired,
    showLinkModal: PropTypes.bool.isRequired
  }

  state = {
    isLinkRepoModalOpen: false
  }

  componentDidMount() {
    this.props.throwOutIfReachLimit()
    if (!this.props.hasGitSources || this.props.showLinkModal) {
      this.setState({ isLinkRepoModalOpen: true })
    }
  }

  getCreateUrl = type =>
    getPageUrl(
      pages.dashboardKintoBlocksCreate,
      {
        workspaceId: this.props.workspaceId
      },
      { kintoBlockType: type }
    )

  closeLinkModal = () => {
    if (this.props.hasGitSources) {
      this.setState(prevState => ({
        isLinkRepoModalOpen: false
      }))
    } else {
      this.props.redirectToDashboard()
    }
  }

  closeConnectModal = () => {
    this.setState({
      isConnectModalOpen: false
    })
  }

  render() {
    const { hasGitSources, isTutorial, workspaceId } = this.props
    return (
      <div className="kinto-block-type-select">
        <h2>Create New KintoBlock</h2>
        <div className="select-flavour">
          <span className="information" />
          <h4>Please select a KintoBlock flavour:</h4>
        </div>
        <ul className="unstyled-list select-cards">
          <li>
            <Link to={this.getCreateUrl(MICROSERVICE)}>
              <div className="selection-card">
                <div className="top">
                  <div className="icon-circle">
                    <div className="icon microservice" />
                  </div>
                  <h3 className="uppercase">Microservice</h3>
                  <h4>
                    There's only one rule in Microservice Club. With great power
                    comes only one, single & simple responsibility.
                  </h4>
                </div>
                <div className="bottom">
                  <button className="button default">Select This Flavor</button>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link to={this.getCreateUrl(WEBSITE)}>
              <div className="selection-card">
                <div className="top">
                  <div className="icon-circle">
                    <div className="icon website" />
                  </div>
                  <h3 className="uppercase">Website</h3>
                  <h4>
                    Host and manage static HTML, CSS and JavaScript files
                    straight from a repo source!
                  </h4>
                </div>

                <div className="bottom">
                  <button className="button default">Select This Flavor</button>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link to={this.getCreateUrl(SERVICE)}>
              <div className="selection-card">
                <div className="top">
                  <div className="icon-circle">
                    <div className="icon service" />
                  </div>
                  <h3 className="uppercase">Custom service</h3>
                  <h4>
                    Define always on, resilient stateful applications such as
                    Databases, Cache, Queues and more!
                  </h4>
                </div>
                <div className="bottom">
                  <button className="button default">Select This Flavor</button>
                </div>
              </div>
            </Link>
          </li>
        </ul>
        <div className="what-is-a-kintoblock">
          <div className="text">
            <h5>What is a KintoBlock?</h5>
            <h5 className="body-copy">
              KintoBlocks make coding microservices easy for all your
              application needs. Build, combine, manage dependencies, document,
              CI/CD, host and scale across languages. Start building KintoBlocks
              below or{' '}
              <a
                href="https://docs.kintohub.com/docs/getting-started"
                target="_blank"
                rel="noopener noreferrer"
              >
                learn more here
              </a>
              .
            </h5>
          </div>
          <a
            href="https://docs.kintohub.com/docs/kintoblocks"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="icon" />
          </a>
        </div>

        <ComplexModal
          className="link-repo-sources"
          component={LinkRepoModal}
          isOpen={this.state.isLinkRepoModalOpen}
          onClose={this.closeLinkModal}
          data={{
            isTutorial,
            hasGitSources,
            workspaceId,
            pageType: pageTypes.KB_TYPE_SELECT
          }}
        />
      </div>
    )
  }
}

export default KintoBlockTypeSelection
