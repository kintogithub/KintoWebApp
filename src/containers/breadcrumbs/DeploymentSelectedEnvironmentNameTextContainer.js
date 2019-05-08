import { connect } from 'react-redux'
import LinkComponent from 'components/breadcrumbs/Link'

function mapStateToProps(state) {
  const { selectedEnvironmentId, selectedDeploymentId } = state.pageOptions
  const selectedDeployment = state.deployments.byId[selectedDeploymentId] || {}
  const selectedEnvironment = selectedDeployment.environments
    ? selectedDeployment.environments.find(e => e.id === selectedEnvironmentId)
    : ''

  return {
    text: selectedEnvironment ? selectedEnvironment.name : 'loading...'
  }
}

export default connect(mapStateToProps)(LinkComponent)
