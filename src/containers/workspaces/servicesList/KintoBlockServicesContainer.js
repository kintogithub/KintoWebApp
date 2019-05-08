import { connect } from 'react-redux'
import KintoBlockServices from '../../../components/workspaces/servicesList/KintoBlockServices'
import { toggleService } from '../../../actions/workspaces'

function mapStateToProps(state) {
  const selectedWorkspace =
    state.workspaces.byId[state.workspaces.selectedWorkspace]
  const workspaceServices = selectedWorkspace
    ? selectedWorkspace.services || []
    : []
  let services = {}
  workspaceServices.forEach(service => {
    services[service.service] = {
      isActive: service.isActive,
      url: service.serviceUrl
    }
  })

  return {
    services
  }
}

export default connect(mapStateToProps, { toggleService })(KintoBlockServices)
