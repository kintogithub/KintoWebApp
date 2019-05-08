import React from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'

const AlertModal = ({ isShown, message, hideAlert }) => {
  return (
    <Modal isOpen={isShown} className="kh-modal">
      <div className="kh-modal-title">Upper Limit Reached</div>
      <div className="kh-modal-body">
        <div className="full-width-field">
          <h4>{message}</h4>
        </div>

        <div className="kh-modal-actions">
          <button onClick={hideAlert} className="button secondary">
            OK
          </button>
        </div>
      </div>
    </Modal>
  )
}

AlertModal.propTypes = {
  isShown: PropTypes.bool,
  message: PropTypes.string,
  hideAlert: PropTypes.func.isRequired
}

export default AlertModal
