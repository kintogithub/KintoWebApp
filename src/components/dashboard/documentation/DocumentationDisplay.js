import React, { Component } from 'react'
import Tooltip from 'rc-tooltip'
import PropTypes from 'prop-types'

class DocumentationDisplay extends Component {
  static propTypes = {
    response: PropTypes.array.isRequired,
    showTitle: PropTypes.bool.isRequired
  }

  getProcessedResponse = () => {
    if (this.props.response) {
      return this.props.response.map(response => {
        let fieldArray = response.field ? response.field.split('.') : ''

        if (fieldArray.length > 2) {
          fieldArray = fieldArray.slice(fieldArray.length - 2)
          fieldArray.unshift('\u2026')
        }

        const optionalText = response.optional === false ? 'required' : null

        return {
          type: response.type,
          optionalText: optionalText,
          field: fieldArray,
          description: response.description
        }
      })
    } else {
      return []
    }
  }

  render() {
    const { showTitle } = this.props
    return (
      <div className="documentation-display">
        {showTitle && (
          <h3>
            Response Parameters{' '}
            <Tooltip
              placement="top"
              overlay="Returned data from the API"
              trigger="click"
            >
              <span className="tooltip" />
            </Tooltip>
          </h3>
        )}
        <div className="parameter-box">
          <div className="title">
            <h5>parameter name</h5>
            <h5>type</h5>
          </div>
          {this.getProcessedResponse().map((response, i) => (
            <div className="row" key={i}>
              <div className="top-row">
                <div className="fields">
                  {response.field
                    ? response.field.map((field, i) => (
                        <h5 className="field-array-item" key={i}>
                          {field}
                        </h5>
                      ))
                    : null}

                  {response.optionalText && <h6>{response.optionalText}</h6>}
                </div>
                <h5>{response.type}</h5>
              </div>
              <div className="description">
                <h5>{response.description}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default DocumentationDisplay
