import React, { Component } from 'react'
import Tooltip from 'rc-tooltip'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Link } from 'react-router-dom'
import posed, { PoseGroup } from 'react-pose'
import PropTypes from 'prop-types'
import { genericKintoBlock } from 'constants/genericIcons'
import { pages } from 'constants/pages'
import { getKbTypeClass } from 'helpers/kintoBlocksHelper'
import { getVersionName } from 'helpers/versionHelper'
import { getPageUrl } from 'helpers/urlHelper'
import { WEBSITE } from 'constants/kintoBlockTypes'
import { tabAnimationOptions } from 'constants/animationOptions'
import {
  externalAccess,
  internalAccess,
  publicAccess,
  show,
  hide,
  active,
  expanded,
  collapsed
} from 'constants/deploymentManagePage'
import CopyButton from 'components/forms/CopyButton'
import BlockIcon from '../../../ui/BlockIcon'
import ExternalAccess from './accessYourApi/ExternalAccess'
import InternalAccess from './accessYourApi/InternalAccess'
import PublicAccess from './accessYourApi/PublicAccess'

const AnimatedTabSection = posed.div(tabAnimationOptions)

class AccessYourApi extends Component {
  static propTypes = {
    authUrl: PropTypes.object.isRequired,
    accessUrl: PropTypes.object.isRequired,
    tutorialUrl: PropTypes.object.isRequired,
    publicUrl: PropTypes.object.isRequired,
    internalUrl: PropTypes.object.isRequired,
    dependencies: PropTypes.array.isRequired,
    isExample: PropTypes.bool.isRequired,
    workspaceId: PropTypes.string.isRequired,
    styledBodyText: PropTypes.array.isRequired,
    envId: PropTypes.string.isRequired,
    deployment: PropTypes.object.isRequired,
    environment: PropTypes.object.isRequired
  }

  state = {
    isHowToSectionShown: true,
    shownTab: externalAccess
  }

  toggleExpand = () => {
    this.setState(prevState => ({
      isHowToSectionShown: !prevState.isHowToSectionShown
    }))
  }

  getWebsiteUrl = blockId => {
    const dependencies = this.props.environment.dependencies || []
    const blockData = dependencies.find(e => e.blockId === blockId) || {}
    return blockData.websiteData ? blockData.websiteData.url : null
  }

  showTab = tabName => {
    this.setState({ shownTab: tabName })
  }

  render() {
    const {
      authUrl,
      accessUrl,
      tutorialUrl,
      publicUrl,
      internalUrl,
      styledBodyText,
      dependencies,
      isExample,
      workspaceId,
      envId,
      deployment,
      environment
    } = this.props

    return (
      <div className="api-access" ref={this.setRef}>
        <h3>API Access</h3>
        <h5>Get the Client ID and Secret Key for this environment.</h5>

        <div className="form-block steps">
          <div
            className={`collapse-header ${
              this.state.isHowToSectionShown ? expanded : collapsed
            }`}
          >
            <div className="environment-information">
              <div className="inner-env-information">
                <h5 className="bold">
                  Client ID: <span>{environment.clientId}</span>
                </h5>
                <CopyButton type="outline" text={environment.clientId} />
              </div>
              <div className="inner-env-information">
                <h5 className="bold">
                  Secret Key: <span>{environment.secret}</span>
                </h5>
                <CopyButton type="outline" text={environment.secret} />
              </div>
            </div>
            <h6 className="collapse" onClick={this.toggleExpand}>
              {this.state.isHowToSectionShown ? 'collapse' : 'expand'}
              <span
                className={`collapse-icon ${
                  this.state.isHowToSectionShown ? expanded : collapsed
                }`}
              />
            </h6>
          </div>
          {this.state.isHowToSectionShown && (
            <div>
              <div className="tabs">
                <div
                  className={`tab ${
                    this.state.shownTab === externalAccess ? active : ''
                  }`}
                  onClick={() => this.showTab(externalAccess)}
                >
                  <h4>External Access</h4>
                </div>
                <div
                  className={`tab ${
                    this.state.shownTab === internalAccess ? active : ''
                  }`}
                  onClick={() => this.showTab(internalAccess)}
                >
                  <h4>Internal Access</h4>
                </div>
                <div
                  className={`tab ${
                    this.state.shownTab === publicAccess ? active : ''
                  }`}
                  onClick={() => this.showTab(publicAccess)}
                >
                  <h4>Public & Webhook Access</h4>
                </div>
              </div>
              <PoseGroup>
                <AnimatedTabSection
                  pose={this.state.shownTab === externalAccess ? show : 'hide'}
                  key="external"
                >
                  <ExternalAccess
                    authUrl={authUrl}
                    accessUrl={accessUrl}
                    tutorialUrl={tutorialUrl}
                    styledBodyText={styledBodyText}
                    isExample={isExample}
                    isShown={this.state.shownTab === externalAccess}
                  />
                </AnimatedTabSection>

                <AnimatedTabSection
                  pose={this.state.shownTab === internalAccess ? show : hide}
                  key="internal"
                >
                  <InternalAccess
                    internalUrl={internalUrl}
                    isShown={this.state.shownTab === internalAccess}
                  />
                </AnimatedTabSection>

                <AnimatedTabSection
                  pose={this.state.shownTab === publicAccess ? show : 'hide'}
                  key="public"
                >
                  <PublicAccess
                    publicUrl={publicUrl}
                    isShown={this.state.shownTab === publicAccess}
                  />
                </AnimatedTabSection>
              </PoseGroup>
            </div>
          )}
        </div>

        {dependencies.length ? (
          <div className="form-block dep-list">
            <div className="button-icon-list">
              <h4 className="list-header">KintoBlocks</h4>
              <ul>
                {dependencies.map((d, i) => (
                  <li key={i} className={getKbTypeClass(d.type)}>
                    <div className="icon-section-wrapper">
                      <div className="block-icon icon-section">
                        <BlockIcon
                          icon={d.iconImageName}
                          name={d.name}
                          defaultIcon={genericKintoBlock}
                        />
                      </div>
                      <div className="text text-section">
                        <h4>
                          {d.displayName}
                          <span className={`${d.version.type}`} />
                          <span className="branch-tag">
                            {getVersionName(d.version.name)}
                          </span>{' '}
                        </h4>
                        <h6>{d.description}</h6>
                      </div>
                      <div className="action-section">
                        {d.type === WEBSITE ? (
                          <div className="website-input">
                            <input
                              type="text"
                              value={this.getWebsiteUrl(d.blockId) || ''}
                            />
                            <CopyToClipboard
                              text={this.getWebsiteUrl(d.blockId)}
                            >
                              <button
                                className="button secondary"
                                type="button"
                              >
                                Copy
                              </button>
                            </CopyToClipboard>
                            <a
                              href={this.getWebsiteUrl(d.blockId) || ''}
                              className="button secondary"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Open
                            </a>
                          </div>
                        ) : (
                          <Link
                            to={getPageUrl(
                              pages.dashboardDeploymentsPathDocumentation,
                              {
                                workspaceId,
                                depId: deployment.id,
                                envId,
                                type: d.version.type,
                                id: d.blockId,
                                version: d.version.name
                              }
                            )}
                            className="button secondary"
                          >
                            View Endpoints
                          </Link>
                        )}

                        <Tooltip
                          placement="top"
                          overlay={getKbTypeClass(d.type)}
                          trigger="hover"
                          overlayClassName="kbtype"
                        >
                          <span
                            className={`type-icon ${getKbTypeClass(d.type)}`}
                          />
                        </Tooltip>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}

export default AccessYourApi
