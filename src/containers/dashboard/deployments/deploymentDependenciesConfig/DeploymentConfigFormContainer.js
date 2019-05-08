import { connect } from 'react-redux'
import { change, untouch } from 'redux-form'
import { TAG } from 'constants/version'
import { getDeploymentDependenciesEnvConfig } from 'selectors/deployments'
import { updateDeploymentDependenciesConfigData } from 'actions/deployments'
import { toggleCanSave } from 'actions/pageOptions'
import DeploymentConfigForm from 'components/dashboard/deployments/deploymentDependenciesConfig/DeploymentConfigForm'

function mapStateToProps(
  state,
  {
    id,
    ver,
    env,
    activeTab,
    allDependenciesInfo = [],
    shownDependenciesIds = []
  }
) {
  const data = getDeploymentDependenciesEnvConfig(state, {
    id,
    ver,
    env
  })

  const deployment = state.deployments.byId[id]

  return {
    initialValues: {
      data
    },
    allDependenciesInfo,
    shownDependenciesIds,
    isTag: deployment.version.type === TAG
  }
}

function mapDispatchToProps(dispatch, { id, ver, env }) {
  return {
    onResetToDefaults: () => {
      dispatch(toggleCanSave(true))
    },
    onSubmit: data =>
      dispatch(updateDeploymentDependenciesConfigData(id, ver, env, data)),
    resetCPUHandler: itemIndex => {
      dispatch(
        change('deploymentConfigForm', `${itemIndex}.hardwareData.minCpu`, '')
      )
      dispatch(
        change('deploymentConfigForm', `${itemIndex}.hardwareData.maxCpu`, '')
      )
      dispatch(
        untouch(
          'deploymentConfigForm',
          `${itemIndex}.hardwareData.minCpu`,
          `${itemIndex}.hardwareData.maxCpu`
        )
      )
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeploymentConfigForm)
