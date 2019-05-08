import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Password extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    className: PropTypes.string
  }

  state = {
    isVisible: false
  }

  togglePasswordView = () => {
    this.setState(previousState => ({
      isVisible: !previousState.isVisible
    }))
  }

  render() {
    const { input, id, placeholder } = this.props
    const { touched, submitFailed, error } = this.props.meta
    const hasError = (touched || submitFailed) && error
    let className = this.props.className || ''
    if (hasError) {
      className += ' error'
    }

    return (
      <div data-test={id || input.name} className="password-field-wrapper">
        <label htmlFor={id || input.name}>Password</label>
        <div className="input-with-image-wrapper">
          <input
            {...input}
            type={`${this.state.isVisible ? 'text' : 'password'}`}
            id={id || input.name}
            placeholder={placeholder}
            className={className}
          />
          <div
            className={`show-password ${this.state.isVisible ? 'visible' : ''}`}
            onClick={this.togglePasswordView}
          />
        </div>
        {hasError && <div className="error-message">{error}</div>}
      </div>
    )
  }
}

export default Password
