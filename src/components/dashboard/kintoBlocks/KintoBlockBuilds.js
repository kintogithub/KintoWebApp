import React, { Component } from 'react'
import PropTypes from 'prop-types'

class KintoBlockBuilds extends Component {
  static propTypes = {
    getKintoBlockBuilds: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    buildId: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
  }

  state = {
    logs: []
  }

  async componentDidMount() {
    const { name, buildId } = this.props
    const { data } = await this.props.getKintoBlockBuilds(name, buildId)
    this.setState({ logs: data })
  }

  render() {
    const failed = this.props.status === 'FAILED'
    return (
      <div className="build-logs">
        <h1>Build Logs</h1>
        <div className={`top ${failed ? 'error' : 'success'}`}>
          {failed ? (
            <div>
              <div className="heading row">
                <div className="left">
                  <span className="icon" />
                </div>
                <div className="right">
                  <h3>Errors Found</h3>
                </div>
              </div>
            </div>
          ) : (
            <div className="icon-and-text">
              <span className="icon" />
              <h3>No Error Found</h3>
            </div>
          )}
        </div>
        <div className="code-window">
          {this.state.logs.length ? (
            <div>
              {this.state.logs.map((line, i) => (
                <div key={i}>
                  {line.text && <h5 className="code">{line.text}</h5>}
                </div>
              ))}
            </div>
          ) : (
            <h5 className="code">There are no logs to display</h5>
          )}
        </div>
      </div>
    )
  }
}

export default KintoBlockBuilds
