import React, { Component } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { CSSTransitionGroup } from 'react-transition-group'
import { timeDayMonthYearShort } from 'constants/dateFormat'

class DeploymentStep extends Component {
  static propTypes = {
    group: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    workflow: PropTypes.object.isRequired
  }

  render() {
    const { group, index, workflow } = this.props
    const completedGroupClass = workflow.status.toLowerCase()
    const items = group.steps.map((step, i) => (
      <div className="right" key={i}>
        <div className="column2">{step.kintoBlockName}</div>
        <div className="column3">
          <div className="version-name">{step.kintoBlockVersion}</div>
        </div>
        <div className="column4">
          <div className={`icon ${step.status.toLowerCase()}`} />
        </div>
        <div className="column5">
          <div>
            {step.text}
            <span className="completion-time">
              {` - ${moment(step.time).format(timeDayMonthYearShort)}`}
            </span>
          </div>
        </div>
      </div>
    ))

    return (
      <div className="deployment-steps">
        <div className="column1">
          <div className={`group-tag index-${index} ${completedGroupClass}`}>
            {group.groupName}
          </div>
        </div>
        <CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {items}
        </CSSTransitionGroup>
      </div>
    )
  }
}

export default DeploymentStep
