import React, { PureComponent } from 'react'
import { DEPLOYMENT } from 'constants/deletionConstants'
import PropTypes from 'prop-types'

class DeletionModal extends PureComponent {
  static propTypes = {
    type: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    deployment: PropTypes.object
  }

  state = {
    isConfirmationComplete: false
  }

  deleteAndClose = () => {
    const { id, name } = this.props.item
    if (this.props.type === DEPLOYMENT) {
      this.props.deleteItem(id, name)
      this.props.onClose()
    } else {
      this.props.deleteItem(this.props.deployment.id, id, name)
      this.props.onClose()
    }
  }

  checkConfirm = e => {
    if (e.target.value === 'DELETE') {
      this.setState({ isConfirmationComplete: true })
    } else {
      return
    }
  }

  render() {
    const { onClose, item, type, deployment } = this.props
    const canDelete =
      type === DEPLOYMENT ? true : deployment.environments.length !== 1
    return (
      <div>
        <div className="kh-modal-title">
          <h4 className="title">Delete Application - {item.name}</h4>
        </div>
        <div className="kh-modal-body">
          {canDelete ? (
            <>
              <h4>
                Permanently delete this{' '}
                <span>
                  {type === DEPLOYMENT ? (
                    <>
                      deployment ({item.name}) and all{' '}
                      {item.versions ? item.versions.length : ''} versions of it
                    </>
                  ) : (
                    <>environment ({item.name}) </>
                  )}
                </span>
                - projects requiring this{' '}
                {item === DEPLOYMENT ? 'deployment' : 'environment'} will not be
                able to function properly.
              </h4>
              <input
                type="text"
                placeholder="Enter 'DELETE' in all caps to confirm"
                onChange={this.checkConfirm}
              />
            </>
          ) : (
            <h4>
              You can not delete <span>{item.name}</span>. <br /> Every
              deployment requires at least one environment.
            </h4>
          )}
          <div className="kh-modal-actions">
            <button
              className="secondary button"
              type="button"
              onClick={onClose}
            >
              {canDelete ? 'Do Nothing' : 'Go Back'}
            </button>
            {canDelete && (
              <button
                className={`destructive button ${
                  this.state.isConfirmationComplete ? '' : 'disabled'
                }`}
                onClick={() => this.deleteAndClose()}
                disabled={!this.state.isConfirmationComplete}
              >
                Delete {type === DEPLOYMENT ? 'Deployment' : 'Environment'}
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default DeletionModal
