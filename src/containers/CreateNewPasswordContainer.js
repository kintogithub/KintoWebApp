import { connect } from 'react-redux'
import CreateNewPassword from '../components/CreateNewPassword'

function mapStateToProps(state, { match }) {
  const { token } = match.params
  return {
    token: token
  }
}

export default connect(mapStateToProps, undefined)(CreateNewPassword)
