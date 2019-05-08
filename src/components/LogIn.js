import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LandingNavBar from './ui/LandingNavBar'
import Footer from './ui/Footer'
import LogInFormContainer from 'containers/landing/logIn/LogInFormContainer'
import RequestAccessFormContainer from 'containers/landing/requestAccess/RequestAccessFormContainer'
import SignUpFormContainer from 'containers/landing/signUp/SignUpFormContainer'

class LogIn extends Component {
  static propTypes = {
    flip: PropTypes.bool
  }

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.push('/app')
    }
  }

  state = {
    isSignUpSubmitted: false,
    confirmedEmail: null
  }

  registeredSuccessfully = confirmedEmail => {
    this.setState({ isSignUpSubmitted: true, confirmedEmail })
    window.scrollTo(0, 0)
  }

  render() {
    const { flip, showSignup, queryData } = this.props

    return (
      <div className={`${flip ? 'sign-up-page' : 'log-in-page'}`}>
        <LandingNavBar url="https://kintohub.com" />

        <div className="content">
          <h1 className="center">The one-stop shop for microservices</h1>
          <h3 className="center">
            KintoHub makes it easy to code, combine and deploy microservices.
            Request access today to get an introduction to building and
            consuming microservice-based applications in minutes
          </h3>

          {flip ? (
            <div className="log-in-and-sign-up-wrapper">
              <RequestAccessFormContainer focusHere={true} />
              <LogInFormContainer />
              {showSignup && <SignUpFormContainer queryData={queryData} />}
            </div>
          ) : (
            <div className="log-in-and-sign-up-wrapper">
              <LogInFormContainer focusHere={true} />
              <RequestAccessFormContainer />
              {showSignup && <SignUpFormContainer queryData={queryData} />}
            </div>
          )}
        </div>

        <Footer />
      </div>
    )
  }
}

export default LogIn
