import { Component } from 'react'
import PropTypes from 'prop-types'

class ConfirmWorkspaceInvite extends Component {
  static propTypes = {
    storeWorkspaceInviteToken: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.storeWorkspaceInviteToken()
  }

  render() {
    return null
  }
}

export default ConfirmWorkspaceInvite
