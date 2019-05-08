import React, { PureComponent } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { timeDayMonthYearShort } from 'constants/dateFormat'
import { SUCCESS, RUNNING } from 'constants/buildStates'
import { deploymentType } from 'constants/deploymentStates'
import { pages } from 'constants/pages'
import { getPageUrl } from 'helpers/urlHelper'
import DeploymentStep from './DeploymentStep'
import ProgressBar from '../../ui/ProgressBar'
import SimpleModal from '../../ui/SimpleModal'

class StatusAndHistory extends PureComponent {
  static propTypes = {
    selectedEnvironmentId: PropTypes.string,
    deployment: PropTypes.object.isRequired,
    workflows: PropTypes.array.isRequired,
    lastWorkflow: PropTypes.object.isRequired,
    percentageProgress: PropTypes.number,
    hasWorkflowFailed: PropTypes.bool,
    activeStep: PropTypes.object,
    selectedWorkspace: PropTypes.string,
    lastDeploymentType: PropTypes.string
  }

  state = {
    isExpanded: false,
    areNotesOpen: false,
    text: ''
  }

  toggleDetails = () => {
    this.setState(prevState => ({
      isExpanded: !prevState.isExpanded
    }))
  }

  openNotes = text => {
    this.setState({
      areNotesOpen: true,
      text: text
    })
  }

  closeNotes = () => {
    this.setState(prevState => ({
      areNotesOpen: false,
      text: ''
    }))
  }

  getLogsUrl = deploymentNumber => {
    const {
      releases,
      selectedWorkspace,
      deployment,
      selectedEnvironmentId
    } = this.props
    const release = releases[deploymentNumber - 1]
    return release
      ? getPageUrl(pages.dashboardDeploymentsConsoleLogs, {
          workspaceId: selectedWorkspace,
          id: deployment.id,
          version: release.version.name,
          envId: selectedEnvironmentId,
          releaseNumber: deploymentNumber
        })
      : ''
  }

  rollbackDeployment = versionName => {
    this.props
      .fetchDeploymentForRollback(
        this.props.deployment.id,
        this.props.selectedEnvironmentId,
        versionName
      )
      .then(response => {
        this.props.rollback(
          this.props.deployment.id,
          this.props.selectedEnvironmentId,
          response.data
        )
      })
  }

  render() {
    const {
      deployment,
      workflows,
      workflowStatus,
      percentageProgress,
      hasWorkflowFailed,
      workflowEndTime,
      currentVersion,
      releases,
      lastDeploymentType
    } = this.props
    let workflowStatusClass = workflowStatus ? workflowStatus.toLowerCase() : ''
    let displayStatus = ''

    const colors = hasWorkflowFailed
      ? { start: 'F46464', end: 'FF943C' }
      : { start: '3ECFF0', end: 'FBE250' }

    if (workflowStatus === SUCCESS) {
      if (lastDeploymentType === deploymentType.shutdown) {
        displayStatus = deploymentType.shutdown
        workflowStatusClass = 'shutdown'
      } else {
        displayStatus = 'DEPLOYED'
      }
    } else displayStatus = workflowStatus

    return workflows ? (
      <div className="status-and-history-wrapper">
        <div className="status-and-history" onClick={this.toggleDetails}>
          <div className="top">
            <div className="left">
              <div className="upper">
                {workflowStatus && (
                  <>
                    <span className={`icon ${workflowStatusClass}`} />
                    <div className={`tag main ${workflowStatusClass}`}>
                      {displayStatus}
                    </div>
                  </>
                )}
                <div className="time-and-date">
                  {workflowStatus
                    ? moment(workflowEndTime).format(timeDayMonthYearShort)
                    : 'No Deployment'}
                </div>
              </div>
              {/* <div className="lower">Notes will go here {deployment.notes}</div>   removed till we have notes */}
            </div>
            <div className="right">
              <div className="upper">
                <span className="microservices icon" />
                <h5>{deployment.appDependencies.length}</h5>
              </div>
              <div className="lower">
                <h5>
                  {currentVersion}{' '}
                  <span className="bold">Standard Release</span>
                </h5>

                <div
                  className={`rocket-wrapper ${
                    workflowStatus === RUNNING ? 'running' : ''
                  }`}
                >
                  <div className="flame" />
                  <div className="rocket" />
                </div>
                <div className="progress">
                  <ProgressBar
                    percentage={percentageProgress}
                    startColor={`#${colors.start}`}
                    endColor={`#${colors.end}`}
                    gradientId="deploymentProgress"
                    extraClass={workflowStatus === RUNNING ? 'running' : ''}
                  >
                    <h3>{percentageProgress}%</h3>
                    <h6>{hasWorkflowFailed ? 'Failed' : 'Deployed'}</h6>
                  </ProgressBar>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="deployment-history">
          {this.state.isExpanded ? (
            <div className="expanded">
              {workflows.map((workflow, index) => (
                <div key={index} className="release">
                  <div className="left">
                    <div className={`dot index-${index}`} />
                    <div className="vertical-line" />
                  </div>
                  <div className="right-wrapper">
                    <div className="heading">
                      <h2 className="left">#{workflow.deploymentNumber}</h2>
                      <div className="right">
                        <Link
                          className="button outline"
                          to={this.getLogsUrl(workflow.deploymentNumber)}
                        >
                          View Logs
                        </Link>
                        {/* <button
                          className="button outline"
                          onClick={() => this.openNotes(deployment.notes)}
                          >
                          View Notes
                        </button> hidden till we sort out with notes*/}

                        <button
                          className="button secondary"
                          disabled={releases.length ? true : false}
                        >
                          {releases[workflow.deploymentNumber - 1]
                            ? releases[workflow.deploymentNumber - 1].version
                                .name
                            : 'Tag'}
                          {releases && <span className="icon tag" />}
                        </button>

                        <button
                          className="button secondary"
                          disabled={index === 0 || workflow.status !== SUCCESS}
                          onClick={() =>
                            this.rollbackDeployment(
                              releases[workflow.deploymentNumber - 1].version
                                .name
                            )
                          }
                          type="button"
                        >
                          Rollback
                        </button>
                      </div>
                    </div>
                    {workflow.groups.map((group, index) => (
                      <DeploymentStep
                        key={index}
                        index={index}
                        group={group}
                        workflow={workflow}
                      />
                    ))}
                  </div>
                </div>
              ))}
              <div className="bottom" onClick={this.toggleDetails}>
                <div className="icon toggle" />
                <h6>Collapse Deployment History</h6>
              </div>
            </div>
          ) : (
            <div className="closed" onClick={this.toggleDetails}>
              <span className="icon toggle" />
              <h6>Expand Deployment History</h6>
            </div>
          )}
        </div>
        <SimpleModal
          options={{
            isOpen: this.state.areNotesOpen,
            onClose: this.closeNotes,
            className: 'deployment-notes',
            text: {
              title: `Deployment Notes - ${deployment.name}`,
              message: `${deployment.notes} Notes are here`,
              cancelText: 'OK',
              cancelClass: 'dark'
            }
          }}
        />
      </div>
    ) : null
  }
}

export default StatusAndHistory
