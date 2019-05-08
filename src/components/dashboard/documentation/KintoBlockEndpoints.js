import React, { Component } from 'react'
import { Route, Switch, Redirect, NavLink } from 'react-router-dom'
import Tooltip from 'rc-tooltip'
import iscroll from 'iscroll'
import ReactIScroll from 'react-iscroll'
import PropTypes from 'prop-types'
import KintoBlockEndpointDetailsContainer from 'containers/dashboard/documentation/KintoBlockEndpointDetailsContainer'
import { filterArray } from 'helpers/arrayHelper'

class KintoBlockEndpoints extends Component {
  static propTypes = {
    fetchKintoBlockForDocumentation: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    match: PropTypes.object.isRequired,
    endpointList: PropTypes.array.isRequired,
    firstEndpointId: PropTypes.string,
    depId: PropTypes.string,
    envId: PropTypes.string,
    kintoBlockName: PropTypes.string
  }

  state = {
    filterText: null,
    isLoaded: false,
    showNoBuildError: false
  }

  componentDidMount() {
    const { id, version, type, depId, envId } = this.props
    this.loadDocs(id, version, type, depId, envId)
  }

  componentWillReceiveProps(nextProps) {
    const { version, type } = this.props
    if (nextProps.version !== version || nextProps.type !== type) {
      this.loadDocs(
        this.props.id,
        nextProps.version,
        nextProps.type,
        nextProps.depId
      )
    }
  }

  loadDocs = async (id, version, type, depId, envId) => {
    this.setState({
      isLoaded: false,
      showNoBuildError: false
    })
    await this.props.fetchKintoBlockForDocumentation(
      id,
      version,
      type,
      depId,
      envId
    )
    const { selectedBuildId, kintoBlockName } = this.props
    if (selectedBuildId === false) {
      this.setState({ showNoBuildError: true })
    } else {
      try {
        await this.props.fetchKintoBlockDocumentation(
          id,
          kintoBlockName,
          selectedBuildId
        )
        this.setState({ isLoaded: true })
      } catch (e) {
        this.setState({ showNoBuildError: true })
      }
    }
  }

  updateFilter = e => {
    this.setState({ filterText: e.target.value })
  }

  getFilteredList = endpoints => {
    return filterArray(endpoints, 'url', this.state.filterText)
  }

  render() {
    const { match, endpointList, firstEndpointId } = this.props

    if (this.state.showNoBuildError) {
      return (
        <div className="endpoints-container">
          <div className="endpoint-title">
            <h3>endpoint documentation</h3>
          </div>
          <h4 className="nobuild-message">
            We couldn't find a successful build for this branch
          </h4>
        </div>
      )
    }
    if (!this.state.isLoaded) return null
    return (
      <div className="endpoints-container">
        <div className="endpoint-title">
          <h3>endpoint documentation</h3>
        </div>

        <div className="endpoint-content">
          <div className="select-endpoint">
            <div className="top">
              <input
                type="search"
                onKeyUp={this.updateFilter}
                ref={input => {
                  this.filterInput = input
                }}
                placeholder="Search Endpoints..."
              />
            </div>
            <div className="bottom">
              <ReactIScroll
                iScroll={iscroll}
                options={{
                  scrollbars: true,
                  mouseWheel: true,
                  fadeScrollbars: true,
                  shrinkScrollbars: 'scale',
                  interactiveScrollbars: true
                }}
              >
                <ul className="unstyled-list">
                  {endpointList &&
                    this.getFilteredList(endpointList).map((ep, index) => (
                      <li key={index}>
                        <NavLink
                          to={`${match.url}/${ep.id}`}
                          activeClassName="selected-endpoint"
                        >
                          <Tooltip
                            placement="right"
                            overlay={
                              <span className={`type overlay ${ep.type}`}>
                                {ep.type} <span className="code">{ep.url}</span>
                              </span>
                            }
                            trigger="hover"
                            overlayClassName="endpoints"
                          >
                            <div>
                              <span className={`type ${ep.type}`}>
                                {ep.type}
                              </span>
                              <span className="code">{ep.url}</span>
                            </div>
                          </Tooltip>
                        </NavLink>
                      </li>
                    ))}
                </ul>
              </ReactIScroll>
            </div>
          </div>
          <Switch>
            <Route
              path={`${match.url}/:endpointId`}
              component={KintoBlockEndpointDetailsContainer}
            />
            <Redirect to={`${match.url}/${firstEndpointId}`} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default KintoBlockEndpoints
