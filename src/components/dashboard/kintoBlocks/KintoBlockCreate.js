import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Tooltip from 'rc-tooltip'
import PropTypes from 'prop-types'
import { pageTypes } from 'constants/gitRepos'
import { getKbTypeClass } from 'helpers/kintoBlocksHelper'
import ComplexModal from '../ui/ComplexModal'
import LinkRepoModal from './kintoBlockCreate/LinkRepoModal'
import KintoBlockCreateFormContainer from 'containers/dashboard/kintoBlocks/kintoBlockCreate/KintoBlockCreateFormContainer'

class KintoBlockCreate extends Component {
  static propTypes = {
    redirectToDashboard: PropTypes.func.isRequired,
    throwOutIfReachLimit: PropTypes.func.isRequired,
    isTutorial: PropTypes.bool.isRequired,
    cancelTutorialMode: PropTypes.func.isRequired,
    kintoBlockType: PropTypes.string.isRequired,
    hasGitSources: PropTypes.bool.isRequired,
    showLinkModal: PropTypes.bool.isRequired,
    workspaceId: PropTypes.string.isRequired
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

  toggleSuccessModal = () => {
    this.setState(prevState => ({
      isSuccessModalOpen: !prevState.isSuccessModalOpen
    }))
  }

  openModalFromDropdown = () => {
    this.setState({ isLinkRepoModalOpen: true })
  }

  closeLinkModal = () => {
    if (this.props.hasGitSources) {
      this.setState(prevState => ({
        isLinkRepoModalOpen: false
      }))
    } else {
      this.props.redirectToDashboard()
    }
  }

  openConnectModal = source => {
    this.setState({
      isConnectModalOpen: true,
      modalSource: source
    })
  }

  closeConnectModal = () => {
    this.setState({
      isConnectModalOpen: false
    })
  }

  render() {
    const {
      cancelTutorialMode,
      isTutorial,
      kintoBlockType,
      hasGitSources,
      workspaceId
    } = this.props
    return (
      <div className="kb-create-wrapper">
        <div className="title">
          <h2>
            <Tooltip
              placement="top"
              overlay={getKbTypeClass(kintoBlockType)}
              trigger="hover"
              overlayClassName="kbtype"
            >
              <span
                className={`icon icon-type ${getKbTypeClass(kintoBlockType)}`}
              />
            </Tooltip>
            Create KintoBlocks
          </h2>
          <Link to="typeselect">
            <span className="icon-edit" />
          </Link>
        </div>
        <div className="what-is-a-kintoblock">
          <div className="text">
            <h5>What is a KintoBlock?</h5>
            <h5 className="body-copy">
              KintoBlocks make coding microservices easy for all your deployment
              needs. Build, combine, manage dependencies, document, CI/CD, host
              and scale across languages. Start building KintoBlocks below or{' '}
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
        <KintoBlockCreateFormContainer
          kintoBlockType={kintoBlockType}
          openModalFromDropdown={this.openModalFromDropdown}
        />

        <ComplexModal
          className="link-repo-sources"
          component={LinkRepoModal}
          isOpen={this.state.isLinkRepoModalOpen}
          onClose={this.closeLinkModal}
          actions={{
            cancelTutorialMode
          }}
          data={{
            isTutorial,
            hasGitSources,
            workspaceId,
            pageType: pageTypes.KB_CREATE
          }}
        />
      </div>
    )
  }
}

export default KintoBlockCreate
