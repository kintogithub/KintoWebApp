import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { pages } from 'constants/pages'
import { getPageUrl } from 'helpers/urlHelper'
import { isProduction } from 'helpers/pageHelper'
import Icon from '../ui/Icon'
import DependencyItem from './DependencyItem'
import HelpTooltipContainer from 'containers/dashboard/ui/HelpTooltipContainer'
import KintoBlockSearchInputContainer from 'containers/dashboard/kintoBlocks/KintoBlockSearchInputContainer'

// TODO fix anchor and replace with buttons
/* eslint-disable jsx-a11y/anchor-is-valid */
class DependencyManagement extends Component {
  static propTypes = {
    appVersion: PropTypes.string,
    fields: PropTypes.object.isRequired,
    appDependenciesInfo: PropTypes.object.isRequired,
    onSearchKintoBlocks: PropTypes.func.isRequired,
    fetchKintoBlockDependenciesData: PropTypes.func.isRequired,
    isKintoBlock: PropTypes.bool,
    workspaceId: PropTypes.string,
    selectedDeploymentId: PropTypes.string,
    itemsToSkip: PropTypes.array.isRequired,
    updateDependenciesTutorialFieldStatus: PropTypes.func.isRequired,
    refreshActiveItemInTutorial: PropTypes.func.isRequired,
    isTutorial: PropTypes.bool.isRequired,
    preFillInformation: PropTypes.object
  }

  onSelectKintoBlock = selectedItem => {
    const {
      fetchKintoBlockDependenciesData,
      isTutorial,
      updateDependenciesTutorialFieldStatus,
      refreshActiveItemInTutorial
    } = this.props

    fetchKintoBlockDependenciesData(
      selectedItem.id,
      selectedItem.version.name,
      selectedItem.version.type
    ).then(data => {
      this.props.fields.push(data)
      if (isTutorial) {
        updateDependenciesTutorialFieldStatus()
        refreshActiveItemInTutorial()
      }
    })
  }

  render() {
    const {
      appVersion,
      fields,
      appDependenciesInfo,
      isKintoBlock,
      updateDependenciesTutorialFieldStatus,
      refreshActiveItemInTutorial,
      isTutorial,
      itemsToSkip,
      workspaceId,
      selectedDeploymentId,
      selectedEnvironmentId,
      meta: { dirty, submitFailed, error }
    } = this.props
    const hasError = (dirty || submitFailed) && error

    const configUrl = getPageUrl(
      pages.dashboardDeploymentsDependenciesConfig,
      {
        workspaceId,
        id: selectedDeploymentId,
        version: appVersion,
        envId: selectedEnvironmentId
      },
      null,
      true
    )

    const isProd = isProduction()
    const showConfig = !isKintoBlock || !isProd
    return (
      <div>
        <div className="form-body simple dependency-management">
          <div className="field-input-wrapper">
            <HelpTooltipContainer
              tutorialPosition="left"
              fieldName="appDependencies"
            />

            <div
              className={`search-and-buttons ${
                isKintoBlock ? 'kintoblock' : 'kintoapp'
              }`}
            >
              <KintoBlockSearchInputContainer
                isAdd={true}
                onSelect={this.onSelectKintoBlock}
                onBlur={refreshActiveItemInTutorial}
                itemsToHideFromResult={itemsToSkip}
                showTutorialOnly={isTutorial}
              />

              {showConfig && (
                <div className="dependency-management-buttons">
                  {configUrl ? (
                    <Link
                      to={configUrl}
                      className="button secondary button-icon"
                      data-test="configure-dependencies-main"
                    >
                      <Icon icon="gear-button" />
                      Configure KintoBlocks
                    </Link>
                  ) : (
                    <a className="button secondary disabled button-icon">
                      <Icon icon="gear-button" />
                      <span>Configure KintoBlocks</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          <div>
            {fields.length ? (
              <div className="blocks-or-services">
                <h4 className="dependencies-header">
                  {isKintoBlock ? 'Added Dependencies:' : 'Added KintoBlocks:'}
                </h4>
                {fields.map((field, key, fields) => (
                  <DependencyItem
                    appVersion={appVersion}
                    key={key}
                    index={key}
                    field={field}
                    fields={fields}
                    appDependenciesInfo={appDependenciesInfo}
                    data={fields.get(key)}
                    isKintoBlock={isKintoBlock}
                    updateDependenciesTutorialFieldStatus={
                      updateDependenciesTutorialFieldStatus
                    }
                    refreshActiveItemInTutorial={refreshActiveItemInTutorial}
                    isTutorial={isTutorial}
                  />
                ))}
              </div>
            ) : (
              <div className="no-blocks-or-services">
                <div className="icons">
                  <div className="kinto-block" />
                </div>
                <div className="text">No Dependencies added</div>
              </div>
            )}
          </div>
          {hasError && <div className="error-message">{error}</div>}
        </div>
      </div>
    )
  }
}

export default DependencyManagement
