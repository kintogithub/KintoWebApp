import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import { getVersionAsText, textToObject } from 'helpers/versionHelper'
import { getLiveEnvironments } from 'selectors/deploymentEnvironments'
import { deployKintoAppValidation } from 'selectors/limitations'
import { deployEnvironment } from 'actions/deployments'
import DeploymentTagAndDeployForm from 'components/dashboard/deployments/DeploymentTagAndDeployForm'

function mapStateToProps(state) {
  const selector = formValueSelector('versionCreate')
  const { selectedDeploymentId } = state.pageOptions
  const deployment = state.deployments.byId[selectedDeploymentId]
  const deployValidation = deployKintoAppValidation(state)
  const hasReachedLimit = !deployValidation.isValid

  const selectedEnvironment =
    selector(state, 'environment') || deployment.environments[0].id // selector(..) is always undefined on modal open
  const liveEnvironments = getLiveEnvironments(state, deployment.id)
  let isDeployingOnExistingEnvironment = false
  if (liveEnvironments.length) {
    isDeployingOnExistingEnvironment = liveEnvironments.some(
      e => e.environmentId === selectedEnvironment
    )
  }
  const versionText = getVersionAsText(selector(state, 'version'))
  let submitLabel = 'Deploy'

  if (versionText) {
    submitLabel += ` ${versionText}`
  }

  const lastVersion = deployment.versions[deployment.versions.length - 1].name
  const editedVersion = textToObject(lastVersion)
  if (editedVersion) {
    editedVersion.revision += 1
  }

  return {
    isDeployErrorShown: hasReachedLimit && !isDeployingOnExistingEnvironment,
    deployErrorMessage: deployValidation.message,
    deployment,
    submitLabel,
    initialValues: {
      environment: deployment.environments[0].id,
      version: editedVersion
    }
  }
}

function mapDispatchToProps(dispatch, { deployment, id }) {
  return {
    onSubmit: formValues => {
      const envId = formValues.environment
      const data = {
        notes: formValues.notes,
        version: { name: getVersionAsText(formValues.version) }
      }
      return dispatch(deployEnvironment(id, envId, data))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeploymentTagAndDeployForm)
