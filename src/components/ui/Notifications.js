import React, { Component } from 'react'
import { INFO, ERROR, TUTORIAL } from 'constants/notificationTypes'

class Notifications extends Component {
  getClassNameForType(type) {
    if (type === INFO) {
      return 'info'
    }
    if (type === ERROR) {
      return 'error'
    }
    if (type === TUTORIAL) {
      return 'tutorial'
    }
    throw new Error('Invalid Type')
  }
  render() {
    const {
      isShown,
      type,
      message,
      closeNotification,
      cancelTutorialMode
    } = this.props

    return isShown ? (
      <div className={`notification-message ${this.getClassNameForType(type)}`}>
        <h4> {message} </h4>

        {type !== TUTORIAL ? (
          <div className="close" onClick={closeNotification} />
        ) : (
          <button
            className="link-styled-button"
            onClick={() => cancelTutorialMode()}
          >
            Skip Tutorial
          </button>
        )}
      </div>
    ) : null
  }
}

export default Notifications
