import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import qs from 'query-string'
import { getPageUrl } from 'helpers/urlHelper'
import { pages } from 'constants/pages'
import { addKintoAppValidation } from 'selectors/limitations'
import { showAlert } from '../../../actions/pageOptions'
import DeploymentCreate from '../../../components/dashboard/deployments/DeploymentCreate'

function mapStateToProps(state, { location }) {
  const query = qs.parse(location.search)
  const {
    kintoBlockId,
    kintoBlockVersion,
    kintoBlockVersionType,
    isPrefilled,
    newDeploymentName
  } = query
  return {
    preFillInformation: {
      kintoBlockId,
      kintoBlockVersion,
      kintoBlockVersionType,
      isPrefilled,
      newDeploymentName
    },
    workspaceId: state.workspaces.selectedWorkspace,
    addKintoAppValidation: addKintoAppValidation(state)
  }
}

function mergeProps(stateProps, dispatchProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    throwOutIfReachLimit: () => {
      const validation = stateProps.addKintoAppValidation
      if (validation.isValid) return
      dispatchProps.showAlert(validation.message)
      dispatchProps.push(
        getPageUrl(pages.dashboardDeploymentsList, {
          workspaceId: stateProps.workspaceId
        })
      )
    }
  }
}

export default connect(
  mapStateToProps,
  { push, showAlert },
  mergeProps
)(DeploymentCreate)
