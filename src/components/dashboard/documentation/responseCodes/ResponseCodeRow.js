import React, { Component } from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import PropTypes from 'prop-types'

import DocumentationDisplay from 'components/dashboard/documentation/DocumentationDisplay'

class ResponseCodeRow extends Component {
  static propTypes = {
    refreshScroll: PropTypes.func.isRequired,
    response: PropTypes.object.isRequired
  }

  state = {
    isExpanded: false
  }

  componentDidMount() {
    if (this.props.response.statusCode === '200') {
      this.setState({ isExpanded: true }, this.props.refreshScroll)
    }
  }

  toggleExpand = () => {
    this.setState(
      prevState => ({
        isExpanded: !prevState.isExpanded
      }),
      this.props.refreshScroll
    )
  }

  render() {
    const { response } = this.props
    return (
      <div
        className={`response-code ${
          this.state.isExpanded ? 'expanded' : ''
        } code-${response.statusCode}`}
      >
        <div className="top" onClick={this.toggleExpand}>
          <h5>{response.statusCode}</h5>
          <h6>
            {this.state.isExpanded ? 'Collapse' : 'Expand'}
            <span
              className={`icon ${this.state.isExpanded ? 'expanded' : ''}`}
            />
          </h6>
        </div>
        <CSSTransitionGroup
          transitionName="show-hide"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}
        >
          {this.state.isExpanded && (
            <div className="bottom">
              <div className="inner">
                <DocumentationDisplay
                  response={response.responseFields}
                  showTitle={true}
                />
              </div>
            </div>
          )}
        </CSSTransitionGroup>
      </div>
    )
  }
}

export default ResponseCodeRow
