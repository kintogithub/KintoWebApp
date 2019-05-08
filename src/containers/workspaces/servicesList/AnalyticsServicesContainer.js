import { connect } from 'react-redux'
import AnalyticsServices from '../../../components/workspaces/servicesList/AnalyticsServices'
import { toggleService } from '../../../actions/workspaces'

function mapStateToProps(state) {
  const selectedWorkspace = state.workspaces.selectedWorkspace
  const workspaceServices = state.workspaces.byId[selectedWorkspace]
    ? state.workspaces.byId[selectedWorkspace].services
    : []
  let services = {}

  workspaceServices.map(service => {
    return (services[service.service] = {
      isActive: service.isActive,
      url: service.serviceUrl
    })
  })

  return {
    services
  }
}

export default connect(mapStateToProps, { toggleService })(AnalyticsServices)
