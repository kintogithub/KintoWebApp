import { connect } from 'react-redux'
import Analytics from '../components/Analytics'

function mapStateToProps(state) {
  return {
    activePage: state.pageOptions.activePage
  }
}

export default connect(mapStateToProps)(Analytics)
