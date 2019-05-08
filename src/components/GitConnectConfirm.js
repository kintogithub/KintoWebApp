import { Component } from 'react'
import PropTypes from 'prop-types'

class GithubConnect extends Component {
  static propTypes = {
    connectGit: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.connectGit()
  }

  render() {
    return null
  }
}

export default GithubConnect
