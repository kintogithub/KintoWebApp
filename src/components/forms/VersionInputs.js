import React, { Component } from 'react'

class VersionInputs extends Component {
  getError = fieldKey => {
    const field = this.props[fieldKey]
    const { touched, submitFailed, error } = field.meta
    const hasError = (touched || submitFailed) && error
    return hasError ? error : null
  }

  getFieldClassName = fieldKey => {
    const hasError = this.getError(fieldKey)
    let className = this.props[fieldKey].input.className || ''
    if (hasError) {
      className += ' error'
    }
    return className
  }

  onKeyPress = (e, ref) => {
    if (e.key === '.') {
      e.preventDefault()
      const inputOrders = ['majorRef', 'minorRef', 'revisionRef']
      const index = inputOrders.indexOf(ref)
      if (index < 2) {
        this[inputOrders[index + 1]].focus()
      }
    }
  }

  render() {
    const fields = this.props
    const formError =
      this.getError('major') ||
      this.getError('minor') ||
      this.getError('revision')

    const majorInput = fields.major.input
    const minorInput = fields.minor.input
    const revisionInput = fields.revision.input

    return (
      <div>
        {fields.isOptional && (
          <div className="optional-wrapper">
            <label htmlFor={majorInput}>tag version number</label>{' '}
            <span className="optional">Optional</span>
          </div>
        )}
        <div className="input-group version-inputs">
          <div>
            {!fields.isOptional && (
              <label className="uppercase" htmlFor={majorInput.name}>
                Major Version
              </label>
            )}
            <input
              {...majorInput}
              type="number"
              className={this.getFieldClassName('major')}
              disabled={fields.isTagged}
              ref={ref => (this.majorRef = ref)}
              onKeyPress={e => this.onKeyPress(e, 'majorRef')}
            />
          </div>
          <div className="dot">.</div>
          <div>
            {!fields.isOptional && (
              <label className="uppercase" htmlFor={minorInput.name}>
                Minor Version
              </label>
            )}
            <input
              {...minorInput}
              type="number"
              className={this.getFieldClassName('minor')}
              disabled={fields.isTagged}
              ref={ref => (this.minorRef = ref)}
              onKeyPress={e => this.onKeyPress(e, 'minorRef')}
            />
          </div>
          <div className="dot">.</div>
          <div>
            {!fields.isOptional && (
              <label className="uppercase" htmlFor={revisionInput.name}>
                Revision
              </label>
            )}

            <input
              {...revisionInput}
              type="number"
              className={this.getFieldClassName('revision')}
              disabled={fields.isTagged}
              ref={ref => (this.revisionRef = ref)}
              onKeyPress={e => this.onKeyPress(e, 'revisionRef')}
            />
          </div>
        </div>

        {formError && <div className="error-message">{formError}</div>}
      </div>
    )
  }
}

export default VersionInputs
