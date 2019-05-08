import React, { Component } from 'react'
import PropTypes from 'prop-types'

class HelpTooltip extends Component {
  static propTypes = {
    thisField: PropTypes.object,
    tutorialPosition: PropTypes.string.isRequired,
    isTutorial: PropTypes.bool.isRequired,
    isCompleted: PropTypes.bool
  }

  render() {
    const {
      thisField,
      tutorialPosition,
      isTutorial,
      isCompleted,
      isActive
    } = this.props
    const noStep = !!thisField && !!thisField.step
    const activeClass = isActive ? 'active' : 'inactive'
    const tutorialClass = `tutorial ${tutorialPosition} ${activeClass}`

    return (
      <div className={`help-tooltip ${noStep ? 'step' : 'no-step'}`}>
        {isTutorial && (
          <div>
            {tutorialPosition === 'left' ? (
              <div>
                {!isCompleted ? (
                  <div className={tutorialClass}>
                    <img
                      src="/images/help-tooltip-left-blank.svg"
                      alt="tooltip"
                    />
                    <div className="tutorial-step">{thisField.step}</div>
                  </div>
                ) : (
                  <div className={`${tutorialClass} completed-step`}>
                    <img
                      src="/images/help-tooltip-left-checked.svg"
                      alt="tooltip"
                    />
                  </div>
                )}
              </div>
            ) : (
              <div>
                {isCompleted === false ? (
                  <div className={tutorialClass}>
                    <img
                      src="/images/help-tooltip-top-blank.svg"
                      alt="tooltip"
                    />
                    <div className="tutorial-step">{thisField.step}</div>
                  </div>
                ) : (
                  <div className={`${tutorialClass} completed-step`}>
                    <img
                      src="/images/help-tooltip-top-checked.svg"
                      alt="tooltip"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}

export default HelpTooltip
