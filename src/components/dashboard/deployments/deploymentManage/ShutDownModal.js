import React from 'react'
import PropTypes from 'prop-types'

const ShutDownModal = ({ onClose, shutDownEnv, environment }) => {
  const currentRelease = environment.releases[environment.releases.length - 1]

  return (
    <div className="add-new-environment">
      <div className="kh-modal-title">
        <h4>
          Shut Down - {environment.name} - {currentRelease.version.name}
        </h4>
      </div>
      <div className="kh-modal-body">
        <div className="full-width-field">
          <h4>
            The currently deployed application will be stopped, leaving this
            environment empty. You can deploy another tag directly without
            shutting down the current one and disrupting your users.
          </h4>
        </div>
        <div className="kh-modal-actions">
          <button type="button" onClick={onClose} className="button secondary">
            Cancel
          </button>
          <button onClick={() => shutDownEnv()} className="button dark">
            Shut Down Anyway
          </button>
        </div>
      </div>
    </div>
  )
}

ShutDownModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  shutDownEnv: PropTypes.func.isRequired,
  environment: PropTypes.object.isRequired
}

export default ShutDownModal
