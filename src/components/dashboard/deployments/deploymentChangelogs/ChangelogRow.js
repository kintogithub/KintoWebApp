import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  customParams,
  hardwareRequirements,
  version
} from 'constants/changelogs'

class ChangelogRow extends Component {
  static propTypes = {
    action: PropTypes.string.isRequired,
    oldValues: PropTypes.object.isRequired,
    newValues: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired
  }

  render() {
    const { action, oldValues, newValues, type } = this.props
    return (
      <div>
        <div className={`row ${action}`}>
          {type === version && (
            <div>
              <div className="row-inner version">
                <div className={`old ${action === 'add' ? 'no-color' : ''}`}>
                  <h6>{oldValues.name}</h6>
                  <h6>Tag time: {oldValues.tagTime}</h6>
                  <h6>{oldValues.note}</h6>
                </div>
                <div className={`new ${action === 'add' ? '' : 'no-color'}`}>
                  <h6>{newValues.name}</h6>
                  <h6>Tag time: {newValues.tagTime}</h6>
                  <h6>{newValues.note}</h6>
                </div>
              </div>
            </div>
          )}
          {(type === hardwareRequirements || type === customParams) && (
            <div className="row-inner">
              <div className={`old ${action === 'add' ? 'no-color' : ''}`}>
                <h6 className="key">{oldValues.key}</h6>
                <h6 className="value">{oldValues.value}</h6>
              </div>
              <div className={`new ${action === 'add' ? '' : 'no-color'}`}>
                <h6 className="key">{oldValues.key}</h6>
                <h6 className="value">{newValues.value}</h6>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default ChangelogRow
