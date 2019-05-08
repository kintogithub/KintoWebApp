import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DeploymentFormContainer from 'containers/dashboard/deployments/DeploymentFormContainer'

class DeploymentCreate extends Component {
  static propTypes = {
    throwOutIfReachLimit: PropTypes.func.isRequired,
    preFillInformation: PropTypes.object
  }

  componentDidMount() {
    this.props.throwOutIfReachLimit()
  }

  render() {
    const { preFillInformation } = this.props
    return (
      <div className="create-kintoapp">
        <h2>Create New Deployment</h2>
        <div className="what-is-a-kintoapp">
          <div className="text">
            <h5>What is a Deployment?</h5>
            <h5 className="body-copy">
              Deployments are tailored back-end features packages, ready to be
              consumed by your clients and whose feature can scale independently
              to fit your needs. They are composed of KintoBlocks and services
              with unique configuration parameters, and either a client or a
              protocol to allow your clients to talk to the deployment. Start
              building an deployment below or{' '}
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
            href="https://docs.kintohub.com/docs/kintoapps"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="icon" />
          </a>

          {/* TODO: add links for help center here when they are available */}
        </div>

        <DeploymentFormContainer
          isCreate={true}
          preFillInformation={preFillInformation}
        />
      </div>
    )
  }
}

export default DeploymentCreate
