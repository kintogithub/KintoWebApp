import { Component } from 'react'
import PropTypes from 'prop-types'

class AccountActivate extends Component {
  static propTypes = {
    activateAccount: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.activateAccount()
  }

  render() {
    return null
  }
}

export default AccountActivate
