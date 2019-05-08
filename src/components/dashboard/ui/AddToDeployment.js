import React, { Component } from 'react'
import iscroll from 'iscroll'
import IScroll from 'react-iscroll'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { filterArray } from 'helpers/arrayHelper'

class AddToDeployment extends Component {
  static propTypes = {
    fetchDeployments: PropTypes.func.isRequired,
    goToCreateDeployment: PropTypes.func.isRequired,
    isShown: PropTypes.bool.isRequired,
    deploymentArray: PropTypes.array
  }

  state = {
    showCreateShortcut: false,
    filterText: null
  }

  componentDidMount() {
    this.props.fetchDeployments()
  }

  showCreate = () => {
    this.setState({ showCreateShortcut: true })
  }

  goToCreateAndInitialize = () =>
    this.props.goToCreateDeployment(this.newDeploymentName.value)

  onUpdateFilter = e => {
    this.setState({ filterText: e.target.value })
  }

  getFilteredList() {
    return filterArray(
      this.props.deploymentArray,
      this.props.filterField,
      this.state.filterText
    )
  }

  render() {
    const { isShown, deploymentArray } = this.props
    return (
      <div className="dropdown add-to-deployment">
        <div
          className={`dropdown-content add-to-deployment ${
            isShown ? 'isShown' : ''
          }`}
        >
          <div className="list-container">
            <div className="dropdown-content-filter">
              <input
                placeholder="Search deployments..."
                className="dropdown-filter-input"
                onKeyUp={this.onUpdateFilter}
                ref={input => {
                  this.filterInput = input
                }}
              />
            </div>
            <div className="dropdown-content-items dropdown-content-items-scroll">
              <IScroll
                iScroll={iscroll}
                options={{
                  scrollbars: true,
                  mouseWheel: true,
                  fadeScrollbars: true,
                  shrinkScrollbars: 'scale',
                  interactiveScrollbars: true
                }}
              >
                <div className="dropdown-scroll-container">
                  {deploymentArray.length ? (
                    this.getFilteredList().map((item, index) => (
                      <div key={index}>
                        <h2 className="deployment-section" key={index}>
                          {item.name}
                        </h2>
                        {item.environments.map((env, i) => (
                          <Link to={env.url} key={i} className="sub-tree">
                            <div className="tree-icon" />
                            <h3>{env.name}</h3>
                          </Link>
                        ))}
                      </div>
                    ))
                  ) : (
                    <h4>
                      You don't have any deployments yet, please create one by
                      clicking the button below.
                    </h4>
                  )}
                </div>
              </IScroll>
            </div>
            <div className="dropdown-action-button">
              {this.state.showCreateShortcut ? (
                <form onSubmit={this.goToCreateAndInitialize}>
                  <div className="create-shortcut">
                    <input
                      type="text"
                      placeholder="Enter deployment name"
                      className="dropdown-filter-input"
                      ref={input => {
                        this.newDeploymentName = input
                      }}
                    />

                    <button type="submit" className="default button">
                      Create
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  type="button"
                  className="dark button"
                  onClick={this.showCreate}
                >
                  New Deployment
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AddToDeployment
