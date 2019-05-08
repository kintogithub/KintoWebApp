import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ServiceCard extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    isComing: PropTypes.bool,
    isActive: PropTypes.bool,
    isAnalytics: PropTypes.bool.isRequired,
    isSelected: PropTypes.bool,
    isToggleField: PropTypes.bool,
    disabled: PropTypes.bool,
    serviceUrl: PropTypes.string
  }

  render() {
    const {
      type,
      title,
      description,
      isComing,
      isActive,
      isAnalytics,
      isSelected,
      isToggleField,
      disabled,
      serviceUrl
    } = this.props
    return (
      <div
        className={`service-card ${isSelected ? 'selected' : ''} ${
          isToggleField ? 'toggle-field' : ''
        } `}
      >
        <div className="face">
          {isComing ? (
            <div className="coming">
              <h6>Coming</h6>
            </div>
          ) : !isToggleField ? (
            <div className={`corner ${isActive ? 'check' : 'plus'}`}>
              <div className="icon" />
            </div>
          ) : null}

          {isAnalytics && isActive ? (
            <div className="open">
              <a
                href={serviceUrl}
                onClick={e => {
                  e.stopPropagation()
                }}
                target="_blank"
                rel="noopener noreferrer"
                className="button secondary"
              >
                Open
              </a>
            </div>
          ) : null}

          <div className="main-content">
            <div className={`main-service-icon ${type}`} />
            <h4>{title}</h4>
            <h5>{description}</h5>
          </div>

          {isToggleField ? (
            <div className="fake-button toggle-services">
              <div className="toggle">
                <label className="switch" data-test={type}>
                  <input
                    type="checkbox"
                    id={type}
                    disabled={disabled}
                    onChange={() => this.props.updateServicesField(type)}
                    checked={isActive}
                  />
                  <span className="toggle-slider" />
                </label>
                <h6 className="toggle-message">
                  {isActive
                    ? 'This Dependency is Active'
                    : 'Activate This Dependency'}
                </h6>
              </div>
            </div>
          ) : (
            <div className={`fake-button ${isComing ? 'disabled' : ''}`}>
              {isActive ? (
                <div className={`button ${isSelected ? 'active' : ''}`}>
                  View Details
                </div>
              ) : (
                <div className={`button ${isSelected ? 'active' : ''}`}>
                  Add {title}
                </div>
              )}
            </div>
          )}
        </div>

        {!isToggleField && (
          <h5 className={`bottom ${isActive ? 'enabled' : 'disabled'}`}>
            {isActive ? 'enabled' : 'disabled'}
          </h5>
        )}
      </div>
    )
  }
}

export default ServiceCard
