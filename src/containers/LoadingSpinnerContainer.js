import { connect } from 'react-redux'
import LoadingSpinner from '../components/ui/LoadingSpinner'

function mapStateToProps(state) {
  const { isShown, message } = state.pageOptions.loadingSpinner
    ? state.pageOptions.loadingSpinner
    : {}

  return {
    isShown,
    message
  }
}

export default connect(mapStateToProps)(LoadingSpinner)
