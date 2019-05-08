import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { scrollToElement } from 'helpers/domHelper'
import ServiceCard from './ServiceCard'

import { kintoBlockServices } from 'constants/serviceInfo'

class KintoBlockServices extends Component {
  static propTypes = {
    toggleService: PropTypes.func.isRequired,
    services: PropTypes.object.isRequired
  }

  state = {
    activeCard: ''
  }

  selectCard = type => {
    const selectedCard = this.state.activeCard === type ? '' : type
    this.setState({ activeCard: selectedCard }, () =>
      scrollToElement('.bottom-scroll')
    )
  }

  getServiceStatus = type => {
    return this.props.services[type]
      ? this.props.services[type].isActive
      : false
  }

  render() {
    const { mongodb, messagePassing, sharedMemory } = kintoBlockServices
    const { inKintoAppManage } = this.props
    return (
      <div className="kintoblock-service">
        {inKintoAppManage ? null : <h2>KintoBlock Services</h2>}
        <div className="cards">
          <div onClick={() => this.selectCard(mongodb.type)}>
            <ServiceCard
              title={mongodb.title}
              description={mongodb.description}
              type={mongodb.type}
              isActive={this.getServiceStatus(mongodb.type)}
              isAnalytics={false}
              isSelected={this.state.activeCard === mongodb.type}
            />
          </div>
          <div>
            <ServiceCard
              title={messagePassing.title}
              description={messagePassing.description}
              type={messagePassing.type}
              isActive={this.getServiceStatus(messagePassing.type)}
              isComing={true}
              isAnalytics={false}
              isSelected={this.state.activeCard === messagePassing.type}
            />
          </div>
          <div>
            <ServiceCard
              title={sharedMemory.title}
              description={sharedMemory.description}
              type={sharedMemory.type}
              isActive={this.getServiceStatus(sharedMemory.type)}
              isComing={true}
              isAnalytics={false}
              isSelected={this.state.activeCard === sharedMemory.type}
            />
          </div>
        </div>

        {this.state.activeCard === mongodb.type && (
          <div className={`extended-information ${mongodb.type}`}>
            <div className="information-area">
              <div className="main-image">
                <div className={`main-service-icon ${mongodb.type}`} />
              </div>
              <div className="information-text">
                <h2>{mongodb.title}</h2>
                <h5>{mongodb.longDescription}</h5>
                <ul>
                  <li>
                    <h5>
                      Add MongoDB to your chosen KintoBlock or Application in
                      just 3 clicks, directly from KintoHub's interface
                    </h5>
                  </li>
                  <li>
                    <h5>
                      Full-fledged hosted MongoDB 3.4 with isolated sub-domains
                    </h5>
                  </li>
                  <li>
                    <h5>
                      More info on MongoDB{' '}
                      <a href="https://www.mongodb.com/">here</a>
                    </h5>
                  </li>
                  <li>
                    <h5>FREE to try for a limited time during alpha period</h5>
                  </li>
                </ul>
              </div>
            </div>
            <div className="action-area">
              {this.getServiceStatus(mongodb.type) ? (
                <button className="button default" type="button" disabled>
                  Enabled
                </button>
              ) : (
                <button
                  className="button default"
                  type="button"
                  onClick={() =>
                    this.props.toggleService(
                      mongodb.type,
                      !this.getServiceStatus(mongodb.type)
                    )
                  }
                >
                  Enable {mongodb.title}
                </button>
              )}
              <h5>
                <b>IMPORTANT NOTE</b> This is an early feature, disabling mongo
                services is currently not supported. But not to worry - we're
                not charging you anything!{' '}
                <span role="img" className="emoji" aria-label="smiling emoji">
                  😊
                </span>
                <br /> <br />
                This service is free to use during the alpha period. After that,
                a subscription or pay-as-you-go fee will be required. You will
                be notified before any charge is incurred.
              </h5>
            </div>
            <span className="bottom-scroll" />
          </div>
        )}
        {this.state.activeCard === messagePassing.type && (
          <div className={`extended-information ${messagePassing.type}`}>
            <div className="information-area">
              <div className="main-image">
                <div className={`main-service-icon ${messagePassing.type}`} />
              </div>
              <div className="information-text">
                <h2>{messagePassing.title}</h2>
                <h5>{messagePassing.longDescription}</h5>
                <ul>
                  <li>
                    <h5>
                      I am thou, thou art I... Thou hast acquired a new vow.
                    </h5>
                  </li>
                  <li>
                    <h5>
                      It shall become the wings of rebellion that breaketh thy
                      chains of captivity.
                    </h5>
                  </li>
                  <li>
                    <h5>
                      With the birth of the Chariot Persona, I have obtained the
                      winds of blessing
                    </h5>
                  </li>
                  <li>
                    <h5>that shall lead to freedom and new power...</h5>
                  </li>
                </ul>
              </div>
            </div>
            <div className="action-area">
              {this.getServiceStatus(messagePassing.type) ? (
                <button
                  className="button destructive"
                  onClick={() =>
                    this.props.toggleService(
                      messagePassing.type,
                      !this.getServiceStatus(messagePassing.type)
                    )
                  }
                >
                  Disable {messagePassing.title}
                </button>
              ) : (
                <button
                  className="button default"
                  onClick={() =>
                    this.props.toggleService(
                      messagePassing.type,
                      !this.getServiceStatus(messagePassing.type)
                    )
                  }
                >
                  Enable This Service
                </button>
              )}
              <h5>
                This service is free to use during private alpha period. After
                that, a subscription or pay-as-you-go fee will be required. You
                will be notified before any charge is incurred.
              </h5>
            </div>
          </div>
        )}
        {this.state.activeCard === sharedMemory.type && (
          <div className={`extended-information ${sharedMemory.type}`}>
            <div className="information-area">
              <div className="main-image">
                <div className={`main-service-icon ${sharedMemory.type}`} />
              </div>
              <div className="information-text">
                <h2>{sharedMemory.title}</h2>
                <h5>{sharedMemory.longDescription}</h5>
                <ul>
                  <li>
                    <h5>
                      I am thou, thou art I... Thou hast acquired a new vow.
                    </h5>
                  </li>
                  <li>
                    <h5>
                      It shall become the wings of rebellion that breaketh thy
                      chains of captivity.
                    </h5>
                  </li>
                  <li>
                    <h5>
                      With the birth of the Chariot Persona, I have obtained the
                      winds of blessing
                    </h5>
                  </li>
                  <li>
                    <h5>that shall lead to freedom and new power...</h5>
                  </li>
                </ul>
              </div>
            </div>
            <div className="action-area">
              {this.getServiceStatus(sharedMemory.type) ? (
                <button
                  className="button destructive"
                  onClick={() =>
                    this.props.toggleService(
                      sharedMemory.type,
                      !this.getServiceStatus(sharedMemory.type)
                    )
                  }
                >
                  Disable This Service
                </button>
              ) : (
                <button
                  className="button default"
                  onClick={() =>
                    this.props.toggleService(
                      sharedMemory.type,
                      !this.getServiceStatus(sharedMemory.type)
                    )
                  }
                >
                  Enable {sharedMemory.title}
                </button>
              )}
              <h5>
                This service is free to use during private alpha period. After
                that, a subscription or pay-as-you-go fee will be required. You
                will be notified before any charge is incurred.
              </h5>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default KintoBlockServices
