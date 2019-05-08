import React, { Component } from 'react'
import CreateNewPasswordFormContainer from '../containers/landing/createNewPassword/CreateNewPasswordFormContainer'
import Footer from './ui/Footer'
import LandingNavBar from './ui/LandingNavBar'

class CreateNewPassword extends Component {
  render() {
    const { token } = this.props
    return (
      <div className="create-new-password-page">
        <LandingNavBar url="/" />
        <CreateNewPasswordFormContainer token={token} />
        <Footer />
      </div>
    )
  }
}

export default CreateNewPassword
