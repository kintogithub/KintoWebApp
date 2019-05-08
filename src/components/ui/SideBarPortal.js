import { Component } from 'react'
import ReactDOM from 'react-dom'

class SideBarPortal extends Component {
  constructor(props) {
    super(props)
    this.el = document.createElement('div')
  }

  componentDidMount() {
    document.getElementById('sidebar-portal').appendChild(this.el)
  }

  componentWillUnmount() {
    document.getElementById('sidebar-portal').removeChild(this.el)
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el)
  }
}

export default SideBarPortal
