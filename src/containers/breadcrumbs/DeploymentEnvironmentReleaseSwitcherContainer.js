import { connect } from 'react-redux'
import { uniqBy, isEmpty, reverse } from 'lodash'
import moment from 'moment'
import { getUrl } from 'helpers/urlHelper'
import DeploymentEnvironmentReleaseSwitcher from 'components/breadcrumbs/DeploymentEnvironmentReleaseSwitcher'
import { timeDayMonthYear } from 'constants/dateFormat.js'

function mapStateToProps(state, { url }) {
  const {
    selectedDeploymentId,
    selectedEnvironmentId,
    selectedReleaseVersion
  } = state.pageOptions
  const workspaceId = state.workspaces.selectedWorkspace
  const app = state.deployments.byId[selectedDeploymentId] || {}
  let environments = app.environments || []
  const selectedEnv =
    environments.find(e => e.id === selectedEnvironmentId) || {}

  const dropdownItems = !isEmpty(selectedEnv)
    ? uniqBy(selectedEnv.releases, release => {
        return release.version.name
      }).map(r => ({
        text: r.version.name,
        active: r.version.name === selectedReleaseVersion,
        tag:
          r.version ===
          selectedEnv.releases[selectedEnv.releases.length - 1].version
            ? 'live'
            : '',
        lastDeployed: moment(r.lastUpdated).format(timeDayMonthYear),
        url:
          workspaceId &&
          getUrl(url, {
            workspaceId: workspaceId,
            id: selectedDeploymentId,
            envId: selectedEnvironmentId,
            appVersion: r.version.name
          })
      }))
    : []

  return {
    hideAction: true,
    deployment: app,
    dropdownItems: reverse(dropdownItems),
    selectedReleaseVersion
  }
}

export default connect(
  mapStateToProps,
  undefined
)(DeploymentEnvironmentReleaseSwitcher)
