import React, { Component } from 'react'
import moment from 'moment'
import Tooltip from 'rc-tooltip'
import PropTypes from 'prop-types'

class LogsRow extends Component {
  static propTypes = {
    requestLog: PropTypes.object.isRequired,
    consoleLogs: PropTypes.array,
    hoursMinutesSecondsMilliseconds: PropTypes.string.isRequired,
    fetchDeploymentRequestConsoleLogs: PropTypes.func.isRequired
  }

  state = {
    isExpanded: false
  }

  toggleExpand = () => {
    this.setState(
      prevState => ({
        isExpanded: !prevState.isExpanded
      }),
      this.props.refreshScroll
    )
  }

  getConsoleLogs = async () => {
    await this.props.fetchDeploymentRequestConsoleLogs()
    this.toggleExpand()
  }

  getClassFromData = data => {
    return data ? data.toLowerCase() : ''
  }

  render() {
    const {
      requestLog,
      consoleLogs,
      hoursMinutesSecondsMilliseconds
    } = this.props
    return (
      <div className="row" onClick={this.getConsoleLogs}>
        <ul
          className={`unstyled-list header ${
            this.state.isExpanded ? 'active' : ''
          }`}
        >
          <li className="column one">
            <h5>
              <span className={`dot code-colour-${requestLog.statusCode}`} />
              {requestLog.statusCode}
            </h5>
          </li>
          <li className="column two">
            <h5>{requestLog.duration} ms</h5>
          </li>
          <li className="column three">
            <h5>
              <span
                className={`code verb-${this.getClassFromData(
                  requestLog.httpVerb
                )}`}
              >
                {requestLog.httpVerb}
              </span>{' '}
              <span className="code">{requestLog.url}</span>
            </h5>
          </li>
          <li className="column four">
            <h5>{requestLog.kintoBlockName}</h5>
          </li>
          <li className="column five log-row">
            <h5 className="code">
              <span
                className={`icon ${this.getClassFromData(
                  requestLog.kintoBlockVersionType
                )}`}
              />
              {requestLog.kintoBlockVersionName}
            </h5>
            <h6 className="code">
              <span className="commit icon" />
              Commit {requestLog.kintoBlockCommit}
            </h6>
          </li>
          <li className="column six">
            <h5>{requestLog.date}</h5>
          </li>
        </ul>

        <div
          className={`expanding-details ${
            this.state.isExpanded ? 'expanded' : ''
          }`}
          id="1"
        >
          {/* add tooltip */}
          <div className="title-and-button">
            <h3 className="bold">
              Console Logs
              <Tooltip
                placement="top"
                overlay="These are all the console logs that occurred for this specific endpoint request."
                trigger="hover"
              >
                <span className="tooltip dark" />
              </Tooltip>
            </h3>
            {/* TODO: hidden for now <button className="button secondary" type="button">
                Report An Issue
            </button> */}
          </div>
          <div className="details">
            <ul className="title unstyled-list">
              <li>
                <h5>time</h5>
              </li>
              <li>
                <h5>message</h5>
              </li>
            </ul>
            <div>
              {consoleLogs.length ? (
                consoleLogs.map((log, i) => (
                  <ul key={i} className="contents unstyled-list">
                    <li className="code time">
                      {moment(log.date).format(hoursMinutesSecondsMilliseconds)}
                    </li>
                    <li>
                      <code className="code">{log.log}</code>
                    </li>
                  </ul>
                ))
              ) : (
                <div className="empty-request">
                  <h4 className="code">There are no details for this log</h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LogsRow
