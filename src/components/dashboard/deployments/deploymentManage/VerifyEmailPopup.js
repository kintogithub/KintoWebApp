import React, { Component } from 'react'
import PropTypes from 'prop-types'

class VerifyEmailPopup extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired
  }

  render() {
    const { onClose } = this.props
    return (
      <div className="verify-email-popup">
        <div className="kh-modal-title">Verify Your Account Email Address</div>
        <div className="kh-modal-body">
          <h4>
            To deploy your application with custom KintoBlocks, please verify
            your account email address. Here are some common email services:
          </h4>

          <div className="links-to-mail">
            <a
              aria-label="open your google mail"
              href="https://mail.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="google" />
            </a>
            <a
              aria-label="open your icloud mail"
              href="https://www.icloud.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="icloud" />
            </a>
            <a
              aria-label="open your outlook mail"
              href="https://outlook.live.com/mail"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="outlook" />
            </a>
            <a
              aria-label="open your yahoo mail"
              href="https://mail.yahoo.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="yahoo" />
            </a>
          </div>
          <div className="kh-modal-actions">
            <button onClick={onClose} className="button dark">
              OK
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default VerifyEmailPopup
