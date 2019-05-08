import { connect } from 'react-redux'
import ScrollToErrorOnSubmit from '../components/ScrollToErrorOnSubmit'

function mapStateToProps(state) {
  return {
    scrollToError: state.pageOptions.scrollToError
  }
}

export default connect(mapStateToProps)(ScrollToErrorOnSubmit)
