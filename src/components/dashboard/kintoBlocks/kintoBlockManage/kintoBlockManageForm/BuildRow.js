import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import ReactIScroll from 'react-iscroll'
import iscroll from 'iscroll'
import { Link } from 'react-router-dom'
import { FAILED, SUCCESS, RUNNING } from 'constants/buildStates'
import { timeDayMonthYearShort } from 'constants/dateFormat'
import { TAG } from 'constants/version'
import { pages } from 'constants/pages'
import { truncate, secondsToHumanMins } from 'helpers/stringHelper'
import { getPageUrl } from 'helpers/urlHelper'
import InlineTooltip from 'components/ui/InlineTooltip'
import { Button } from 'components/forms'
import ElapsedTime from './ElapsedTime'

class BuildRow extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    build: PropTypes.object.isRequired,
    activeBuild: PropTypes.object,
    kintoBlock: PropTypes.object.isRequired,
    selectedWorkspace: PropTypes.string.isRequired,
    retryBuild: PropTypes.func.isRequired,
    onCreateTagOpen: PropTypes.func.isRequired,
    isVersionTag: PropTypes.bool.isRequired
  }

  state = {
    isExpanded: false
  }

  toggleExpand = () => {
    if (this.scrollArea) {
      this.scrollArea.refresh()
    }
    this.setState(prevState => ({
      isExpanded: !prevState.isExpanded
    }))
  }

  getStepStatusClass(status) {
    switch (status) {
      case FAILED:
        return 'failed'
      case SUCCESS:
        return 'success'
      case RUNNING:
        return 'running'
      default:
        throw new Error('Invalid step status')
    }
  }
  getCommitClass() {
    const { activeBuild, build } = this.props
    const activeClass =
      activeBuild && build.id === activeBuild.id ? 'active' : ''
    const expandedClass = this.state.isExpanded ? 'expanded' : ''
    return `${activeClass} ${expandedClass}`
  }

  isStepFinished(step) {
    const { status } = step
    const isFinished = status === SUCCESS || status === FAILED
    return isFinished && step.endedAt
  }

  getCompletedTime(step) {
    const seconds = moment(step.endedAt).diff(moment(step.createdAt), 'seconds')
    return secondsToHumanMins(seconds)
  }

  onRetryBuild = e => {
    e.stopPropagation()
    this.props.retryBuild(this.props.build.id)
  }

  getKintoBlockManageUrl(tag) {
    const { selectedWorkspace, kintoBlock } = this.props
    return getPageUrl(pages.dashboardKintoBlocksManage, {
      workspaceId: selectedWorkspace,
      id: kintoBlock.id,
      version: tag,
      type: TAG.toLowerCase()
    })
  }

  getBuildLogsUrl() {
    const { selectedWorkspace, kintoBlock, build } = this.props
    return getPageUrl(
      pages.dashboardKintoBlocksBuildLogs,
      {
        id: kintoBlock.id,
        name: kintoBlock.name,
        workspaceId: selectedWorkspace,
        buildId: build.id
      },
      {
        status: build.status
      }
    )
  }

  stopPropogration(e) {
    e.stopPropagation()
  }

  onTagClick = e => {
    e.stopPropagation()
    this.props.onCreateTagOpen(this.props.build)
  }

  componentDidMount() {
    if (this.props.index === 0) {
      this.toggleExpand()
    }
  }

  render() {
    const { build, index, isVersionTag } = this.props
    const commits = [build.commit]
    return (
      <li className="build-row">
        <div className="top" onClick={this.toggleExpand}>
          <ul
            className={`unstyled-list builds-content ${this.getCommitClass()}`}
          >
            <li>
              <div className="code number uppercase">
                {truncate(build.id, 5)}
              </div>
            </li>
            <li>
              {build.tag ? (
                <Link
                  className="button secondary button-icon right"
                  to={this.getKintoBlockManageUrl(build.tag)}
                  onClick={this.stopPropogration}
                >
                  {build.tag} <span className="icon tag-icon med-icon" />
                </Link>
              ) : (
                <Button
                  onClick={this.onTagClick}
                  disabled={build.status !== SUCCESS}
                  buttonType="secondary"
                  type="button"
                >
                  Tag Build
                </Button>
              )}
            </li>
            <li>
              <div className="code number uppercase">
                {truncate(commits[0].sha, 7)}
              </div>
            </li>
            <li>
              <div className="code date">
                {moment(build.createdAt).format(timeDayMonthYearShort)}
              </div>
            </li>
            <li>
              <a
                href={this.getBuildLogsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="view the logs for this build"
                className="open-log"
                onClick={this.stopPropogration}
              >
                <h6>Open Log</h6>
                <img src="/images/icon-open-link.svg" alt="arrow icon" />
              </a>
            </li>
            <li>
              <div className="status-wrapper">
                <div className="status">
                  {build.status}{' '}
                  <span className={`dot ${build.status.toLowerCase()}`} />
                </div>
                {build.status === RUNNING && (
                  <ElapsedTime start={build.createdAt} />
                )}
                {index === 0 && !isVersionTag ? (
                  <div
                    onClick={this.onRetryBuild}
                    className="retry-link open-log"
                  >
                    <h6>Retry</h6>
                    <img src="/images/icon-retry.svg" alt="retry icon" />
                  </div>
                ) : null}
              </div>
            </li>
          </ul>
        </div>

        {this.state.isExpanded && (
          <div className="bottom">
            <div className="build-progress">
              {build.steps.map((s, index) => (
                <div
                  className={`step-status ${this.getStepStatusClass(s.status)}`}
                  key={index}
                >
                  <div className="step-circle-container">
                    <div className="step-circle" />
                    <div className="step-circle-label">{s.name}</div>
                  </div>

                  <div className="line-container">
                    <div className="line" />
                    <div className="line-label">
                      {s.status === RUNNING ? (
                        <ElapsedTime
                          start={s.createdAt}
                          isTimeOnly={true}
                          isHumanFormat={true}
                        />
                      ) : null}
                      {this.isStepFinished(s) ? this.getCompletedTime(s) : null}
                    </div>
                  </div>
                </div>
              ))}
              <div
                className={`step-finish-circle ${this.getStepStatusClass(
                  build.status
                )}`}
              />
            </div>

            <div className="commit-details-wrapper">
              <div className="commit-details-header">
                <div className="commit-hash">commit #</div>
                <div className="message">message</div>
              </div>

              <div className="commit-details-code-wrapper">
                <ReactIScroll
                  iScroll={iscroll}
                  ref={iscroll => (this.scrollArea = iscroll)}
                  options={{
                    scrollbars: true,
                    mouseWheel: true,
                    fadeScrollbars: false,
                    shrinkScrollbars: 'scale',
                    interactiveScrollbars: true,
                    disableTouch: true,
                    disablePointer: true,
                    disableMouse: true
                  }}
                >
                  <div>
                    {commits.map((commit, index) => (
                      <div className="commit-details-code" key={index}>
                        <div className="left">
                          <InlineTooltip
                            trigger="click"
                            text="commit"
                            placement="top"
                            tooltipClass="icon commit"
                          />
                          <div className="sha code uppercase">
                            {truncate(commit.sha, 7)}
                          </div>
                        </div>
                        <div className="right">
                          <div className="code">{commit.message}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ReactIScroll>
              </div>
            </div>
          </div>
        )}
      </li>
    )
  }
}
export default BuildRow
