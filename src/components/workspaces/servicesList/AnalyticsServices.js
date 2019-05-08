import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ServiceCard from './ServiceCard'
import { analyticsServices } from 'constants/serviceInfo'

class AnalyticsServices extends Component {
  static propTypes = {
    toggleService: PropTypes.func.isRequired,
    services: PropTypes.object.isRequired
  }

  state = {
    activeCard: ''
  }

  selectCard = type => {
    this.setState(state => {
      const selectedCard = state.activeCard === type ? '' : type
      return {
        activeCard: selectedCard
      }
    })
  }

  getServiceStatus = type => {
    return this.props.services[type] ? this.props.services[type].isActive : null
  }

  getServiceUrl = type => {
    return this.props.services[type] ? this.props.services[type].url : null
  }

  render() {
    const { kibana, prometheus, zipkin } = analyticsServices
    return (
      <div className="analytics-services">
        <h2>Analytics Services</h2>
        <div className="cards">
          <div onClick={() => this.selectCard(kibana.type)}>
            <ServiceCard
              title={kibana.title}
              description={kibana.description}
              type={kibana.type}
              isAnalytics={true}
              isActive={this.getServiceStatus(kibana.type)}
              isSelected={this.state.activeCard === kibana.type}
              serviceUrl={this.getServiceUrl(kibana.type)}
            />
          </div>
          <div onClick={() => this.selectCard(prometheus.type)}>
            <ServiceCard
              title={prometheus.title}
              description={prometheus.description}
              type={prometheus.type}
              isAnalytics={true}
              isActive={this.getServiceStatus(prometheus.type)}
              isSelected={this.state.activeCard === prometheus.type}
              serviceUrl={this.getServiceUrl(prometheus.type)}
            />
          </div>
          <div onClick={() => this.selectCard(zipkin.type)}>
            <ServiceCard
              title={zipkin.title}
              description={zipkin.description}
              type={zipkin.type}
              isAnalytics={true}
              isActive={this.getServiceStatus(zipkin.type)}
              isSelected={this.state.activeCard === zipkin.type}
              serviceUrl={this.getServiceUrl(zipkin.type)}
            />
          </div>
        </div>
        {this.state.activeCard === kibana.type && (
          <div className={`extended-information ${kibana.type}`}>
            <div className="information-area">
              <div className="main-image">
                <div className={`main-service-icon ${kibana.type}`} />
              </div>
              <div className="information-text">
                <h2>{kibana.title}</h2>
                <h5>{kibana.longDescription}</h5>
                <ul>
                  <li>
                    <h5>
                      Access detailed logs with powerful visualisation tools for
                      all your apps
                    </h5>
                  </li>
                  <li>
                    <h5>
                      Exclusive one-click setup on KintoHub: activate and you
                      are ready to go
                    </h5>
                  </li>
                  <li>
                    <h5>Built with ElasticSearch and Kibana 6.1.1</h5>
                  </li>
                  <li>
                    <h5>
                      More info on Kibana{' '}
                      <a
                        href="https://www.elastic.co/products/kibana"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        here
                      </a>
                    </h5>
                  </li>
                  <li>
                    <h5>FREE to try for a limited time during alpha period</h5>
                  </li>
                </ul>
              </div>
            </div>
            <div className="action-area">
              {this.getServiceStatus(kibana.type) ? (
                <button
                  className="button destructive"
                  type="button"
                  onClick={() =>
                    this.props.toggleService(
                      kibana.type,
                      !this.getServiceStatus(kibana.type)
                    )
                  }
                >
                  Disable This Service
                </button>
              ) : (
                <button
                  className="button default"
                  type="button"
                  onClick={() =>
                    this.props.toggleService(
                      kibana.type,
                      !this.getServiceStatus(kibana.type)
                    )
                  }
                >
                  Enable {kibana.title}
                </button>
              )}
              <h5>
                This service is free to use for a limited time during alpha
                period. In the future, fees will apply to use visualization
                services. You will be notified of all policy changes at least
                72h before any charge is incurred.
              </h5>
            </div>
          </div>
        )}
        {this.state.activeCard === prometheus.type && (
          <div className={`extended-information ${prometheus.type}`}>
            <div className="information-area">
              <div className="main-image">
                <div className={`main-service-icon ${prometheus.type}`} />
              </div>
              <div className="information-text">
                <h2>{prometheus.title}</h2>
                <h5>{prometheus.longDescription}</h5>
                <ul>
                  <li>
                    <h5>
                      Get detailed monitoring data and set tailored alert rules
                      for all your apps
                    </h5>
                  </li>
                  <li>
                    <h5>
                      Exclusive one-click setup on KintoHub: activate and you
                      are ready to go
                    </h5>
                  </li>
                  <li>
                    <h5>Built with Prometheus 2.0.0</h5>
                  </li>
                  <li>
                    <h5>
                      More info on Prometheus{' '}
                      <a
                        href="https://prometheus.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        here
                      </a>
                    </h5>
                  </li>
                  <li>
                    <h5>FREE to try for a limited time during alpha period</h5>
                  </li>
                </ul>
              </div>
            </div>
            <div className="action-area">
              {this.getServiceStatus(prometheus.type) ? (
                <button
                  className="button destructive"
                  type="button"
                  onClick={() =>
                    this.props.toggleService(
                      prometheus.type,
                      !this.getServiceStatus(prometheus.type)
                    )
                  }
                >
                  Disable This Service
                </button>
              ) : (
                <button
                  className="button default"
                  type="button"
                  onClick={() =>
                    this.props.toggleService(
                      prometheus.type,
                      !this.getServiceStatus(prometheus.type)
                    )
                  }
                >
                  Enable {prometheus.title}
                </button>
              )}
              <h5>
                This service is free to use for a limited time during alpha
                period. In the future, fees will apply to use monitoring &
                alerting capabilities. You will be notified of all policy
                changes at least 72h before any charge is incurred.
              </h5>
            </div>
          </div>
        )}
        {this.state.activeCard === zipkin.type && (
          <div className={`extended-information ${zipkin.type}`}>
            <div className="information-area">
              <div className="main-image">
                <div className={`main-service-icon ${zipkin.type}`} />
              </div>
              <div className="information-text">
                <h2>{zipkin.title}</h2>
                <h5>{zipkin.longDescription}</h5>
                <ul>
                  <li>
                    <h5>
                      Get dependency diagrams and timing data for all your apps
                    </h5>
                  </li>
                  <li>
                    <h5>
                      Exclusive one-click setup on KintoHub: activate and you
                      are ready to go
                    </h5>
                  </li>
                  <li>
                    <h5>Built with Jaegertracing/all-in-one 1.20</h5>
                  </li>
                  <li>
                    <h5>
                      More info on Jaeger{' '}
                      <a
                        href="https://jaeger.readthedocs.io/en/latest/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        here
                      </a>
                    </h5>
                  </li>
                  <li>
                    <h5>FREE to try for a limited time during alpha period</h5>
                  </li>
                </ul>
              </div>
            </div>
            <div className="action-area">
              {this.getServiceStatus(zipkin.type) ? (
                <button
                  className="button destructive"
                  type="button"
                  onClick={() =>
                    this.props.toggleService(
                      zipkin.type,
                      !this.getServiceStatus(zipkin.type)
                    )
                  }
                >
                  Disable This Service
                </button>
              ) : (
                <button
                  className="button default"
                  type="button"
                  onClick={() =>
                    this.props.toggleService(
                      zipkin.type,
                      !this.getServiceStatus(zipkin.type)
                    )
                  }
                >
                  Enable Jaeger
                </button>
              )}

              <h5>
                This service is free to use for a limited time during alpha
                period. In the future, fees will apply to use tracing
                capabilities. You will be notified of all policy changes at
                least 72h before any charge is incurred.
              </h5>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnalyticsServices
