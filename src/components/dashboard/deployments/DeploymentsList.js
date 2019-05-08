import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import DeploymentCardContainer from 'containers/dashboard/deployments/deploymentsList/DeploymentCardContainer'

class DeploymentsList extends Component {
  static propTypes = {
    deployments: PropTypes.array.isRequired,
    lastFetched: PropTypes.instanceOf(Date),
    redirectToCreate: PropTypes.func.isRequired,
    fetchDeployments: PropTypes.func.isRequired
  }

  componentDidMount() {
    const {
      lastFetched,
      deployments,
      fetchDeployments,
      redirectToCreate
    } = this.props
    if (new Date() - lastFetched > 1000) {
      fetchDeployments()
    } else {
      if (!deployments.length) {
        redirectToCreate()
      }
    }
  }

  render() {
    return (
      <div className="my-kintoapps">
        <div className="page-title">
          <h2>My Deployments</h2>
          <Link to="create" className="button default">
            Create New Deployment
          </Link>
        </div>

        <div className="kintoapp-list">
          <Link to="create" className="kintoapp create">
            <div className="text">
              <img src="/images/icon-generic-application.svg" alt="" />
              <h3>Create New Deployment</h3>
            </div>
            <div className="icons">
              <div className="applications">
                <div className="dependency application" />
                <div className="dependency kintoblock-dep" />
              </div>
              <div className="add-new">
                <div className="inner" />
                <div className="pulsate" />
              </div>
            </div>
          </Link>
          {this.props.deployments.map((deployment, i) => (
            <DeploymentCardContainer
              deployment={deployment}
              key={i}
              index={i}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default DeploymentsList
