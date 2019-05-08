import React, { Component } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import InlineTooltip from '../../ui/InlineTooltip'
import PropTypes from 'prop-types'

class EndpointExamples extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string,
    type: PropTypes.string,
    isDefinition: PropTypes.bool.isRequired,
    tooltipText: PropTypes.string.isRequired
  }

  state = {
    isExpanded: false
  }

  toggleExpand = () => {
    this.setState(prevState => ({
      isExpanded: !prevState.isExpanded
    }))
  }

  render() {
    const { title, text, type, isDefinition, tooltipText } = this.props
    return (
      <div className="endpoint-example">
        <h3>
          {title}
          <InlineTooltip trigger="click" text={tooltipText} placement="top" />
        </h3>
        <div
          className={`message-box ${this.state.isExpanded ? 'expanded' : ''}`}
        >
          {!isDefinition && <div className="coming">Coming</div>}
          <div className="left">
            <div className="endpoint-name box">
              {isDefinition && <span className={`type ${type}`}>{type}</span>}
              {isDefinition && <span className="code">{text}</span>}
            </div>
          </div>
          <div className="right">
            <CopyToClipboard text={text}>
              {isDefinition ? (
                <button className="button secondary" type="button">
                  Copy
                </button>
              ) : (
                <button
                  className="button secondary disabled"
                  type="button"
                  disabled
                >
                  Copy
                </button>
              )}
            </CopyToClipboard>
            {!isDefinition && (
              <div className="toggle-expand" onClick={this.toggleExpand}>
                <h6>{this.state.isExpanded ? 'Collapse' : 'Expand'}</h6>
                <span
                  className={`collapse-icon ${
                    this.state.isExpanded ? 'expanded' : ''
                  }`}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default EndpointExamples
