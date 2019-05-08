import React, { Component } from 'react'
import PropTypes from 'prop-types'
import iscroll from 'iscroll'
import ReactIScroll from 'react-iscroll'
import LogsRowContainer from 'containers/dashboard/deployments/deploymentRequestLogs/LogsRowContainer'

class DeploymentRequestLogs extends Component {
  static propTypes = {
    requestLogs: PropTypes.array,
    environment: PropTypes.object.isRequired,
    appVersion: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    envId: PropTypes.string.isRequired,
    fetchDeploymentRequestLogs: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.getDeploymentEnvironments(this.props.id)
    this.requestTimer = setInterval(
      () =>
        this.props.fetchDeploymentRequestLogs(
          this.props.id,
          this.props.envId,
          this.props.appVersion
        ),
      5000
    )
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.appVersion !== nextProps.appVersion) {
      this.props.fetchDeploymentRequestLogs(
        nextProps.id,
        nextProps.envId,
        nextProps.appVersion
      )
      clearInterval(this.requestTimer)
      this.requestTimer = setInterval(
        () =>
          this.props.fetchDeploymentRequestLogs(
            nextProps.id,
            nextProps.envId,
            nextProps.appVersion
          ),
        5000
      )
    }
  }

  componentWillUnmount() {
    clearInterval(this.requestTimer)
    this.requestTimer = null
  }

  refreshScroll = () => {
    this.scrollArea.refresh()
  }

  render() {
    const { requestLogs, environment, appVersion } = this.props
    let status = ''
    let currentRelease = {}
    let currentStep

    if (environment.releases) {
      currentRelease = environment.releases[environment.releases.length - 1]
      currentStep = currentRelease.steps[currentRelease.steps.length - 1]
      status = currentStep.state
    }

    return (
      <div className="request-logs-page">
        <div className="request-logs-header">
          <h3>Requests</h3>
        </div>
        <div className="request-logs-wrapper">
          <div className="request-logs-title">
            <h2>
              {environment.name} - {appVersion} -{' '}
            </h2>
            <h6 className={`status ${status.toLowerCase()}`}>{status}</h6>
          </div>
          <ReactIScroll
            iScroll={iscroll}
            ref={iscroll => (this.scrollArea = iscroll)}
            options={{
              mouseWheel: true,
              fadeScrollbars: false,
              shrinkScrollbars: 'scale',
              interactiveScrollbars: true,
              scrollX: true,
              scrollbars: 'custom',
              eventPassthrough: true
            }}
          >
            <div className="request-logs-inner">
              <ul className="title unstyled-list">
                <li className="column one">
                  <h5>code</h5>
                </li>
                <li className="column two">
                  <h5>duration</h5>
                </li>
                <li className="column three">
                  <h5>endpoint</h5>
                </li>
                <li className="column four">
                  <h5>kintoblock</h5>
                </li>
                <li className="column five">
                  <h5>version</h5>
                </li>
                <li className="column six">
                  <h5>time & date</h5>
                </li>
              </ul>
              <ul className="unstyled-list container">
                {!requestLogs.length ? (
                  <div className="no-request-logs-message">
                    <h3>No request have been logged</h3>
                  </div>
                ) : (
                  requestLogs.map((requestLog, i) => (
                    <li key={i} className="request-logs-map-item">
                      <LogsRowContainer
                        refreshScroll={this.refreshScroll}
                        requestLog={requestLog}
                      />
                    </li>
                  ))
                )}
              </ul>
            </div>
          </ReactIScroll>
        </div>
      </div>
    )
  }
}

export default DeploymentRequestLogs
