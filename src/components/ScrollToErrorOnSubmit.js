import { Component } from 'react'
import { scrollToError } from 'helpers/domHelper'

class ScrollToErrorOnSubmit extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.scrollToError) {
      scrollToError()
    }
  }
  render() {
    return null
  }
}

export default ScrollToErrorOnSubmit
