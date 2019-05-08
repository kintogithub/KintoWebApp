import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import qs from 'query-string'
import Footer from './ui/Footer'
import LandingNavBar from './ui/LandingNavBar'
import ForgotPasswordFormContainer from 'containers/landing/forgotPassword/ForgotPasswordFormContainer'

class ForgotPassword extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  }

  state = {
    isForgotPasswordSubmitted: false
  }

  forgotPasswordSuccess = () => {
    this.setState({ isForgotPasswordSubmitted: true })
    window.scrollTo(0, 0)
  }

  render() {
    const { email } = qs.parse(this.props.location.search)
    return (
      <div className="forgot-password-page">
        <LandingNavBar url="/" />
        {this.state.isForgotPasswordSubmitted ? (
          <div>
            <div className="content forgot-password-wrapper">
              <div className="forgot-password-confirmation">
                <div className="icon" />
                <h2>A confirmation link has been sent to your email.</h2>
                <h6>
                  Trouble finding the email? Have a look in your spam folder,
                  just in case.
                </h6>
                <Link to="/log-in" className="button secondary">
                  Log In
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <ForgotPasswordFormContainer
              onSuccess={this.forgotPasswordSuccess}
              email={email}
            />
          </div>
        )}
        <Footer />
      </div>
    )
  }
}

export default ForgotPassword
