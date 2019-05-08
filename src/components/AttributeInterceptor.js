import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

class AttributeInterceptor extends Component {
  static propTypes = {
    updateLoadingStatus: PropTypes.func.isRequired,
    loadingStatus: PropTypes.object.isRequired
  }

  componentDidMount() {
    let requests = 0
    let initialRequests = 0
    const { updateLoadingStatus } = this.props

    axios.interceptors.request.use(config => {
      if (config.isInitialRequest) {
        delete config.isInitialRequest
        initialRequests += 1
        updateLoadingStatus('initial', 'loading')
      } else {
        requests += 1
        if (requests === 1) {
          updateLoadingStatus('normal', 'loading')
        }
      }
      return config
    })
    axios.interceptors.response.use(
      response => {
        if (initialRequests) {
          initialRequests -= 1
          if (initialRequests <= 0) {
            initialRequests = 0
            updateLoadingStatus('initial', 'finished')
          }
        } else {
          requests -= 1
          if (requests <= 0) {
            requests = 0
            updateLoadingStatus('normal', 'finished')
          }
        }
        return response
      },
      error => {
        if (initialRequests) {
          initialRequests -= 1
          if (initialRequests <= 0) {
            initialRequests = 0
            updateLoadingStatus('initial', 'finished')
          }
        } else {
          requests -= 1
          if (requests <= 0) {
            requests = 0
            updateLoadingStatus('normal', 'finished')
          }
        }
        return Promise.reject(error)
      }
    )
  }

  render() {
    const { normal, initial } = this.props.loadingStatus
    const attributes = {
      'data-initial-loading': initial,
      'data-loading': normal
    }
    return <div id="loadingStatus" {...attributes} />
  }
}

export default AttributeInterceptor
