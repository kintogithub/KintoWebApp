import React from 'react'
import PropTypes from 'prop-types'
import Tooltip from 'rc-tooltip'
import RcSlider from 'rc-slider'

const Slider = props => {
  const { input, label, min, marks, step, help } = props
  return (
    <div>
      <label>{label}</label>
      {help && (
        <Tooltip placement="top" overlay={help} trigger="click">
          <span className="tooltip" />
        </Tooltip>
      )}
      <div className="slider-container">
        <RcSlider
          value={input.value || 0}
          onChange={input.onChange}
          className={input.className}
          min={min}
          marks={marks}
          step={step}
        />
      </div>
    </div>
  )
}
Slider.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  step: PropTypes.number,
  marks: PropTypes.object.isRequired,
  help: PropTypes.string
}

export default Slider
