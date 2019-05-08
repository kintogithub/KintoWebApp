import React, { Component } from 'react'

class AdvancedCollapse extends Component {
  state = {
    isExpanded: false
  }

  toggleVisibility = () => {
    this.setState(
      prevState => ({
        isExpanded: !prevState.isExpanded
      }),
      this.props.refreshScroll
    )
  }

  componentDidMount() {
    if (this.props.isOpen === true) {
      this.toggleVisibility()
    }
  }

  render() {
    return (
      <div
        className={`form-wrapper advanced-collapse-options ${
          this.state.isExpanded ? 'open' : 'closed'
        }`}
      >
        <div className="header" onClick={this.toggleVisibility}>
          <h4>Advanced Options</h4>
          <div
            onClick={this.toggleVisibility}
            className={`toggle-advance-options ${
              this.state.isExpanded ? 'expanded' : 'collapsed'
            }`}
          >
            <div className="toggle-collapse" onClick={this.toggleVisibility}>
              {this.state.isExpanded ? 'Collapse' : 'Expand'}
              <span
                className={`advance-icon ${
                  this.state.isExpanded ? 'expanded' : 'collapsed'
                }`}
              />
            </div>
          </div>
        </div>

        {this.state.isExpanded && (
          <div className="advanced">{this.props.children}</div>
        )}
      </div>
    )
  }
}

export default AdvancedCollapse
