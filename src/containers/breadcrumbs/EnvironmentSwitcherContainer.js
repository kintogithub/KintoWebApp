import { connect } from 'react-redux'
import { pages } from 'constants/pages'
import { getPageUrl } from 'helpers/urlHelper'
import EnvironmentSwitcher from 'components/breadcrumbs/EnvironmentSwitcher'

function mapStateToProps(state) {
  const { selectedWorkspace } = state.workspaces
  const { selectedDeploymentId, selectedEnvironmentId } = state.pageOptions
  const deployment = state.deployments.byId[selectedDeploymentId] || {}
  const allEnvironments = deployment.environments || []
  const selectedEnvironment = allEnvironments.find(
    e => e.id === selectedEnvironmentId
  )

  const dropdownItems = allEnvironments.map(environment => {
    const isDisabled = !environment.releases || !environment.releases.length

    const lastRelease = !isDisabled
      ? environment.releases[environment.releases.length - 1]
      : {}

    return {
      text: environment.name,
      active: selectedEnvironment && selectedEnvironmentId === environment.id,
      isDisabled,
      url: !isDisabled
        ? getPageUrl(pages.dashboardDeploymentsDependenciesConfig, {
            workspaceId: selectedWorkspace,
            id: selectedDeploymentId,
            version: lastRelease.version.name,
            envId: environment.id
          })
        : ''
    }
  })

  return {
    selectedWorkspace,
    selectedDeploymentId,
    selectedEnvironmentId,
    dropdownItems,
    selectedItemName: selectedEnvironment
      ? selectedEnvironment.name
      : 'Loading...'
  }
}

export default connect(mapStateToProps)(EnvironmentSwitcher)
