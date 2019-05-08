import React, { Component } from 'react'
import isArray from 'lodash/isArray'

class LoadingSpinner extends Component {
  state = {
    loadingMessage: 'Loading',
    animationClass: ''
  }

  componentWillReceiveProps(nextProps) {
    const { message } = nextProps
    if (this.props.isShown !== nextProps.isShown) {
      if (nextProps.isShown === true) {
        if (!isArray(message)) {
          this.setState({ loadingMessage: message })
        } else {
          this.loopMessage = setInterval(() => {
            const randomNumber = Math.floor(Math.random() * 13)
            const selectedMessage = message[randomNumber]
            this.setState(
              {
                loadingMessage: selectedMessage
              },
              () => this.setState({ animationClass: 'start' })
            )
          }, 1800)
        }
      } else {
        clearInterval(this.loopMessage)
      }
    }
  }

  render() {
    const { isShown } = this.props
    return isShown ? (
      <div className="loading-spinner">
        <div className="loading-icon" />
        <h2 className={this.state.animationClass}>
          {this.state.loadingMessage}
          <span className="one">.</span>
          <span className="two">.</span>
          <span className="three">.</span>
        </h2>
      </div>
    ) : null
  }
}

export default LoadingSpinner
