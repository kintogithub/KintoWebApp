import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Icon extends Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
  }

  onClick = () => {
    if (this.props.disabled) {
      return
    }
    if (this.props.onClick) {
      this.props.onClick()
    }
  }

  render() {
    const { icon, disabled } = this.props
    return (
      <button
        type="button"
        onClick={this.onClick}
        disabled={disabled}
        className={`icon ${icon}`}
      />
    )
  }
}

export default Icon
