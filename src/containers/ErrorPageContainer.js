import { connect } from 'react-redux'
import { showErrorPage } from '../actions/pageOptions'
import {
  continueWithoutJoiningWorkspace,
  logOutAndKeepToken
} from '../actions/workspaces'
import ErrorPage from '../components/ErrorPage'

function mapStateToProps(state) {
  const { errorPageType, errorPageMessage } = state.pageOptions
  return {
    errorPageType,
    errorPageMessage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showErrorPage: () => dispatch(showErrorPage()),
    goToDashboard: () => dispatch(continueWithoutJoiningWorkspace()),
    logOutAndKeepToken: () => {
      dispatch(logOutAndKeepToken())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorPage)
