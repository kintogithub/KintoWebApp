import { connect } from 'react-redux'
import { updateLoadingStatus } from '../actions/pageOptions'
import AttributeInterceptor from '../components/AttributeInterceptor'

function mapStateToProps(state) {
  return {
    loadingStatus: state.pageOptions.loadingStatus
  }
}

export default connect(mapStateToProps, {
  updateLoadingStatus
})(AttributeInterceptor)
