import { Component } from 'react'
import ReactDOM from 'react-dom'

class SaveBarPortal extends Component {
  constructor(props) {
    super(props)
    this.el = document.createElement('div')
  }
  componentDidMount() {
    document.getElementById('savebar-portal').appendChild(this.el)
  }
  componentWillUnmount() {
    document.getElementById('savebar-portal').removeChild(this.el)
  }
  render() {
    return ReactDOM.createPortal(this.props.children, this.el)
  }
}

export default SaveBarPortal
