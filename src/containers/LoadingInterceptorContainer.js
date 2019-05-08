import { connect } from 'react-redux'
import { showSpinner, hideSpinner } from '../actions/pageOptions'
import LoadingInterceptor from '../components/LoadingInterceptor'

export default connect(undefined, {
  showSpinner,
  hideSpinner
})(LoadingInterceptor)
