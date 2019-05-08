import React, { Component } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import iscroll from 'iscroll'
import ReactIScroll from 'react-iscroll'
import Select from 'react-select'
import { hoursMinutesSecondsMilliseconds } from 'constants/dateFormat'
import SideBarPortal from 'components/ui/SideBarPortal'
import DeploymentManageSidebarContainer from 'containers/dashboard/deployments/DeploymentManageSidebarContainer'

class DeploymentConsoleLogs extends Component {
  static propTypes = {
    consoleLogs: PropTypes.array.isRequired,
    lastLogDate: PropTypes.string,
    id: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
    envId: PropTypes.string.isRequired,
    releaseNumber: PropTypes.string.isRequired,
    deployment: PropTypes.object,
    kintoBlockOptions: PropTypes.array.isRequired,
    requestLogsUrl: PropTypes.string.isRequired,
    logBlockName: PropTypes.string,
    fetchDeployment: PropTypes.func.isRequired,
    fetchDeploymentConsoleLogs: PropTypes.func.isRequired,
    getDeploymentEnvironments: PropTypes.func.isRequired,
    environmentSelect: PropTypes.func.isRequired,
    state: PropTypes.string.isRequired
  }

  state = {
    scrollToBottom: false,
    filterText: ''
  }

  async componentDidMount() {
    const {
      id,
      version,
      envId,
      fetchDeployment,
      getDeploymentEnvironments,
      environmentSelect
    } = this.props
    environmentSelect(envId)
    const environmentPromise = getDeploymentEnvironments()
    const deploymentPromise = fetchDeployment(id, null, version)
    await Promise.all([environmentPromise, deploymentPromise])
    // get environment id
    const option = this.props.kintoBlockOptions[0]
    this.loadConsoleLogs(option)
  }

  async componentWillReceiveProps(nextProps) {
    if (this.props.version !== nextProps.version) {
      clearTimeout(this.requestTimer)
      await this.props.fetchDeployment(this.props.id, null, nextProps.version)
      const option = this.props.kintoBlockOptions[0]
      this.loadConsoleLogs(option)
    }
    // check that there are new logs & the new logs are appearing in the filter
    if (
      this.state.scrollToBottom &&
      nextProps.consoleLogs.length !== this.props.consoleLogs.length &&
      this.getFilteredLogs(nextProps.consoleLogs).length !==
        this.getFilteredLogs(this.props.consoleLogs).length
    ) {
      setTimeout(() => {
        const iscroll = this.scrollArea.getIScroll()
        iscroll.scrollTo(0, iscroll.maxScrollY, 200)
      }, 0)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.requestTimer)
  }

  // start date is optional
  loadConsoleLogs = (block, startDate) => {
    const {
      id,
      envId,
      version,
      fetchDeploymentConsoleLogs,
      releaseNumber
    } = this.props
    const endDate = new Date().toISOString()
    fetchDeploymentConsoleLogs(
      id,
      version,
      envId,
      releaseNumber,
      block.value,
      block.type,
      {
        endDate,
        startDate
      }
    ).then(() => {
      this.requestTimer = setTimeout(() => {
        this.loadConsoleLogs(block, this.props.lastLogDate)
      }, 10000)
    })
  }

  onChangeSelectedKintoBlock = (option, e) => {
    clearTimeout(this.requestTimer)
    this.loadConsoleLogs(option)
  }

  onUpdateFilter = e => {
    this.setState({
      filterText: e.target.value
    })
  }

  toggleScrollToBottom = () => {
    this.setState(prevState => ({
      scrollToBottom: !prevState.scrollToBottom
    }))
  }

  getFilteredLogs = logs => {
    const { filterText } = this.state
    if (!filterText) {
      return logs
    }
    return logs.filter(l =>
      l.log.toLowerCase().includes(filterText.toLowerCase())
    )
  }

  render() {
    const {
      consoleLogs,
      environment,
      version,
      logBlockName,
      kintoBlockOptions,
      releaseNumber,
      state
    } = this.props
    const selectedKB = kintoBlockOptions.find(k => k.value === logBlockName)
    return (
      <div className="console-logs-page">
        <div className="header">
          <div className="page-title">
            <div className="text">
              <h2>
                {environment.name} - {version} - {releaseNumber}
              </h2>
              <h6 className={`status ${state.toLowerCase()}`}>{state}</h6>
            </div>
            <div className="logs-buttons">
              {/* TODO request logs are not working
              <Link className="button secondary" to={requestLogsUrl}>
                View Requests
              </Link>
              */}
            </div>
          </div>
        </div>

        <div>
          <div className="console-logs-head">
            <div className="react-select">
              <label>Date Range</label>
              <Select
                classNamePrefix="react-select"
                placeholder="Real-time"
                isDisabled={true}
              />
            </div>
            <div className="react-select">
              <label>KintoBlocks</label>
              <Select
                classNamePrefix="react-select"
                options={kintoBlockOptions}
                isSearchable={false}
                onChange={this.onChangeSelectedKintoBlock}
                value={selectedKB}
              />
            </div>

            <div className="toggle-content field-input-wrapper">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={this.state.scrollToBottom}
                  onChange={this.toggleScrollToBottom}
                />
                <span className="toggle-slider" />
              </label>
              <div className="toggle-message">
                <h6>Keep Console Pinned to the Bottom</h6>
              </div>
            </div>

            <input
              className="filter"
              placeholder="Filter messages..."
              value={this.state.filterText}
              onChange={this.onUpdateFilter}
            />
          </div>
          <div className="commit-details-header">
            <div className="commit-hash">Time</div>
            <div className="message">Message</div>
          </div>
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
              {!consoleLogs.length ? (
                <div className="no-logs-message">
                  <h3>No Logs Found</h3>
                </div>
              ) : (
                this.getFilteredLogs(consoleLogs).map((log, i) => (
                  <div key={i} className="commit-details-code">
                    <div className="left">
                      <div className="sha">
                        {moment(log.date).format(
                          hoursMinutesSecondsMilliseconds
                        )}
                      </div>
                    </div>
                    <div className="right">
                      <div className="code">{log.log}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ReactIScroll>
        </div>
        <SideBarPortal>
          <DeploymentManageSidebarContainer isSimple={true} />
        </SideBarPortal>
      </div>
    )
  }
}

export default DeploymentConsoleLogs
