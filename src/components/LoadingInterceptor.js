import { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import debounce from 'lodash/debounce'

class LoadingInterceptor extends Component {
  static propTypes = {
    showSpinner: PropTypes.func.isRequired,
    hideSpinner: PropTypes.func.isRequired
  }

  componentDidMount() {
    let debouncedShow = debounce(() => {
      this.props.showSpinner()
    }, 700)
    let requests = 0
    let skippedRequests = 0
    axios.interceptors.request.use(config => {
      if (config.noSpinner) {
        delete config.noSpinner
        skippedRequests += 1
      } else {
        requests += 1
        if (requests === 1) {
          debouncedShow()
        }
      }
      return config
    })
    axios.interceptors.response.use(
      response => {
        if (skippedRequests) {
          skippedRequests -= 1
        } else {
          requests -= 1
          if (requests <= 0) {
            requests = 0
            this.props.hideSpinner()
            debouncedShow.cancel()
          }
        }
        return response
      },
      error => {
        if (skippedRequests) {
          skippedRequests -= 1
        } else {
          requests -= 1
          if (requests <= 0) {
            requests = 0
            this.props.hideSpinner()
            debouncedShow.cancel()
          }
        }
        return Promise.reject(error)
      }
    )
  }

  render() {
    return null
  }
}

export default LoadingInterceptor
