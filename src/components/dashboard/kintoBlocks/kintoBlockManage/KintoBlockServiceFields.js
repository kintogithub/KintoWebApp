import React, { Component } from 'react'
import PropTypes from 'prop-types'
import includes from 'lodash/includes'
import ServiceCard from '../../../workspaces/servicesList/ServiceCard'
import { kintoBlockServices } from 'constants/serviceInfo'

class KintoBlockServiceFields extends Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    services: PropTypes.array
  }

  getServiceStatus = service => {
    return includes(this.props.services, service)
  }

  render() {
    const { mongodb, messagePassing, sharedMemory } = kintoBlockServices
    const { disabled } = this.props
    return (
      <div className="kintoblock-service service-fields full-row">
        <div className="cards">
          <div>
            <ServiceCard
              title={mongodb.title}
              description={mongodb.description}
              type={mongodb.type}
              isActive={this.getServiceStatus(mongodb.type)}
              disabled={disabled}
              isAnalytics={false}
              isToggleField={true}
              updateServicesField={this.props.updateServicesField}
            />
          </div>
          <div>
            <ServiceCard
              title={messagePassing.title}
              description={messagePassing.description}
              type={messagePassing.type}
              disabled={true}
              isActive={this.getServiceStatus(messagePassing.type)}
              isComing={true}
              isAnalytics={false}
              isToggleField={true}
              updateServicesField={this.props.updateServicesField}
            />
          </div>
          <div>
            <ServiceCard
              title={sharedMemory.title}
              description={sharedMemory.description}
              type={sharedMemory.type}
              disabled={true}
              isActive={this.getServiceStatus(sharedMemory.type)}
              isComing={true}
              isAnalytics={false}
              isToggleField={true}
              updateServicesField={this.props.updateServicesField}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default KintoBlockServiceFields
