import React, { Component } from 'react'
import KintoBlockServicesContainer from 'containers/workspaces/servicesList/KintoBlockServicesContainer'
import { isProduction } from 'helpers/pageHelper'
import AnalyticsServicesContainer from 'containers/workspaces/servicesList/AnalyticsServicesContainer'

class ServicesList extends Component {
  render() {
    return (
      <div className="service-list">
        <KintoBlockServicesContainer />

        {isProduction() ? null : (
          <div>
            <div className="line" />
            <AnalyticsServicesContainer />
          </div>
        )}
      </div>
    )
  }
}

export default ServicesList
