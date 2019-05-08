import React, { Component } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { secondsToMins, secondsToHumanMins } from 'helpers/stringHelper'

class KintoBlockBuilds extends Component {
  static propTypes = {
    start: PropTypes.string,
    isTimeOnly: PropTypes.bool,
    isHumanFormat: PropTypes.bool
  }

  state = {
    elapsedTime: '',
    hasErrored: false
  }

  componentDidMount() {
    if (!this.props.start) {
      return
    }
    this.updateElapsedTime()
    this.intervalId = setInterval(this.updateElapsedTime, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  getElapsedTime = () => {
    const secondsPassed = moment().diff(moment(this.props.start), 'seconds')
    // if seconds are more than an hour acts as it errored
    if (secondsPassed > 3600) {
      return false
    }
    return this.props.isHumanFormat
      ? secondsToHumanMins(secondsPassed)
      : secondsToMins(secondsPassed)
  }

  updateElapsedTime = () => {
    const elapsedTime = this.getElapsedTime()
    if (elapsedTime === false) {
      this.setState({ hasErrored: true })
      clearInterval(this.intervalId)
    } else {
      this.setState({ elapsedTime })
    }
  }

  render() {
    let { elapsedTime, hasErrored } = this.state
    if (hasErrored) {
      elapsedTime = null
    }

    return this.props.isTimeOnly ? (
      <span>{elapsedTime}</span>
    ) : (
      <div className="processing-time-information">
        <p className="processing-text">
          {!hasErrored ? <span>Elapsed: {elapsedTime}</span> : null}
        </p>
        <img src="/images/icon-processing.svg" alt="retry icon" />
      </div>
    )
  }
}

export default KintoBlockBuilds
