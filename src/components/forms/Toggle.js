import React from 'react'
import PropTypes from 'prop-types'
import HelpTooltipContainer from 'containers/dashboard/ui/HelpTooltipContainer'
import Tooltip from 'rc-tooltip'

// TODO: checked prop is because of a bug in redux-form
// https://github.com/erikras/redux-form/issues/1372
const Toggle = ({
  input,
  id,
  label,
  help,
  disabled,
  tutorialPosition,
  subLabel,
  isReverse,
  className
}) => (
  <div
    className={`toggle-content field-input-wrapper ${
      className ? className : ''
    }`}
  >
    {tutorialPosition && (
      <HelpTooltipContainer
        fieldName={input.name}
        tutorialPosition={tutorialPosition}
      />
    )}
    <label
      className={`switch ${disabled ? 'disabled' : ''}`}
      data-test={id || input.name}
    >
      <input
        {...input}
        type="checkbox"
        id={id || input.name}
        disabled={disabled}
        checked={input.value === true || input.value === 'true'}
      />
      <span className="toggle-slider" />
    </label>
    <div className={`toggle-message ${subLabel ? 'sublabel' : ''}`}>
      <h6>
        {label}
        {help && (
          <Tooltip placement="top" overlay={help} trigger="click">
            <span className="tooltip" />
          </Tooltip>
        )}
      </h6>

      {subLabel && <h6 className="sublabel">{subLabel}</h6>}
    </div>
  </div>
)
Toggle.propTypes = {
  input: PropTypes.object.isRequired,
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  help: PropTypes.string,
  disabled: PropTypes.bool,
  tutorialPosition: PropTypes.string,
  subLabel: PropTypes.string,
  className: PropTypes.string
}

export default Toggle
