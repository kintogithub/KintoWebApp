import { connect } from 'react-redux'
import { hideAlert } from '../actions/pageOptions'
import AlertModal from '../components/AlertModal'

function mapStateToProps(state) {
  const { isShown, message } = state.pageOptions.alertModal
  return {
    isShown,
    message
  }
}
export default connect(mapStateToProps, { hideAlert })(AlertModal)
