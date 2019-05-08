import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, FieldArray } from 'redux-form'
import DeploymentConfigParams from './deploymentConfigForm/DeploymentConfigParams'

const DeploymentConfigForm = ({
  activeTab,
  itemToScrollTo,
  handleSubmit,
  allDependenciesInfo,
  shownDependenciesIds,
  resetCPUHandler,
  onChangeActive,
  isTag,
  getDefaults,
  onResetToDefaults,
  resetToKintoBlockDefaults
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className={activeTab !== 'params' ? 'hide' : null}>
        <FieldArray
          name="data"
          component={DeploymentConfigParams}
          allDependenciesInfo={allDependenciesInfo}
          shownDependenciesIds={shownDependenciesIds}
          onChangeActive={onChangeActive}
          itemToScrollTo={itemToScrollTo}
          isDisabled={isTag}
          onResetToDefaults={onResetToDefaults}
          resetToKintoBlockDefaults={resetToKintoBlockDefaults}
        />
      </div>
    </form>
  )
}

DeploymentConfigForm.propTypes = {
  activeTab: PropTypes.string.isRequired,
  itemToScrollTo: PropTypes.string,
  allDependenciesInfo: PropTypes.array.isRequired,
  shownDependenciesIds: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetCPUHandler: PropTypes.func.isRequired,
  onResetToDefaults: PropTypes.func.isRequired,
  onChangeActive: PropTypes.func.isRequired,
  isTag: PropTypes.bool
}

export default reduxForm({
  form: 'deploymentConfigForm',
  enableReinitialize: true
})(DeploymentConfigForm)
