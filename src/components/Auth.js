import { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { SubmissionError } from 'redux-form'
import { NOT_FOUND } from 'constants/errorPageTypes'

class Auth extends Component {
  static propTypes = {
    token: PropTypes.string,
    logout: PropTypes.func.isRequired,
    authApp: PropTypes.func.isRequired,
    children: PropTypes.arrayOf(PropTypes.element.isRequired)
  }

  constructor(props) {
    super(props)
    axios.interceptors.request.use(config => {
      if (this.props.token) {
        config.headers.Authorization = `Bearer ${this.props.token}`
      }
      return config
    })
    axios.interceptors.response.use(
      response => {
        const data = response.data || {}
        if (data.errors) {
          if (data.errors.error) {
            data.errors._error = data.errors.error
            delete data.errors.error
          }
          throw new SubmissionError(data.errors)
        }
        return data
      },
      error => {
        // Do something with response error
        if (error && error.response && error.response.status === 404) {
          this.props.showErrorPage(NOT_FOUND)
        }
        if (
          error &&
          error.response &&
          (error.response.status === 403 || error.response.status === 401)
        ) {
          // remove token info
          this.props.logout()
          // TODO: handle case infinite loop when auth fails because of incorrect clientId
          if (window.location.pathname !== '/log-in') {
            window.location.href = '/log-in'
          }
        }
        if (
          error &&
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          let { errors } = error.response.data
          if (errors.error) {
            errors._error = errors.error
            delete errors.error
          }
          throw new SubmissionError(errors)
        }
        // Throw errr again (may be need for some other catch)
        return Promise.reject(error)
      }
    )
  }

  componentDidMount() {
    if (!this.props.token) {
      this.props.authApp()
    }
  }

  render() {
    return this.props.token ? this.props.children : null
  }
}

export default Auth
