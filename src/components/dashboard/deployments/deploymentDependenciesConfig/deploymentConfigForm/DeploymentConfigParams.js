import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FieldArray } from 'redux-form'
import DeploymentConfigScroller from '../DeploymentConfigScroller'
import DeploymentConfigParamsItem from './DeploymentConfigParamsItem'
import SearchInput from 'components/forms/SearchInput'
import { findDependency } from 'helpers/kintoBlocksHelper'
import BlockIcon from '../../../../ui/BlockIcon'
import { genericKintoBlock } from 'constants/genericIcons'
import { SERVICE } from 'constants/kintoBlockTypes'

function getIsShownClass(shownDependenciesIds, data) {
  return !shownDependenciesIds.some(id => data.dependencyId === id)
    ? 'hide'
    : ''
}

class DeploymentConfigParams extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    allDependenciesInfo: PropTypes.array.isRequired,
    itemToScrollTo: PropTypes.string,
    shownDependenciesIds: PropTypes.array.isRequired,
    onChangeActive: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    resetToKintoBlockDefaults: PropTypes.func.isRequired,
    onResetToDefaults: PropTypes.func.isRequired
  }

  state = {
    paramsFilterText: ''
  }

  onChangeActive = (index, isShown) => {
    this.props.onChangeActive(
      this.props.fields.get(index).dependencyId,
      isShown
    )
  }

  updateFilterText = e => {
    this.setState({ paramsFilterText: e.target.value })
  }

  getVisibleParams() {
    const dependencyConfigs = this.props.fields.getAll() || []
    const { paramsFilterText } = this.state
    const result = {}

    dependencyConfigs.forEach(d => {
      result[d.dependencyId] = d.params.filter(p =>
        p.key.toUpperCase().includes(paramsFilterText.toUpperCase())
      )
    })
    return result
  }

  resetToKintoBlockDefaults = block => {
    this.props.resetToKintoBlockDefaults(block)
    this.props.onResetToDefaults()
  }

  render() {
    const {
      fields,
      allDependenciesInfo,
      itemToScrollTo,
      shownDependenciesIds,
      isDisabled
    } = this.props

    const visibleParams = this.getVisibleParams()

    return (
      <div>
        <SearchInput
          placeholder="Search environment variables"
          className="white"
          value={this.state.paramsFilterText}
          onChange={this.updateFilterText}
        />
        <div className="ka-config-params">
          <DeploymentConfigScroller
            type="params"
            itemToScrollTo={itemToScrollTo}
            onChangeActive={this.onChangeActive}
          >
            {fields.map((field, key) => {
              const dependencyConfigRow = fields.get(key)
              const info = findDependency(
                allDependenciesInfo,
                dependencyConfigRow.dependencyId
              )
              const isShownClass = getIsShownClass(
                shownDependenciesIds,
                fields.get(key)
              )

              const isService = info.type === SERVICE

              return (
                <div
                  key={key}
                  data-scroll={`params-${dependencyConfigRow.dependencyId}`}
                  className={`ka-config-item ka-config-params-item ${isShownClass}`}
                >
                  <div className="top">
                    <div className="left">
                      {info && (
                        <>
                          <div className="block-icon">
                            <BlockIcon
                              icon={info.iconImageName}
                              name={info.displayName}
                              defaultIcon={genericKintoBlock}
                              iconClass="main-icon small"
                            />
                          </div>

                          <div>
                            <h3>{info && info.displayName}</h3>
                            {!isService && (
                              <button
                                type="button"
                                className="button secondary"
                                onClick={() =>
                                  this.resetToKintoBlockDefaults(info)
                                }
                              >
                                Reset to Default Values
                              </button>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                    <div className="right" />
                  </div>
                  <div className="line" />
                  <div className="bottom">
                    <FieldArray
                      name={`${field}.params`}
                      component={DeploymentConfigParamsItem}
                      isDisabled={isDisabled}
                      visibleParams={
                        visibleParams[dependencyConfigRow.dependencyId]
                      }
                    />
                  </div>
                </div>
              )
            })}
          </DeploymentConfigScroller>
        </div>
      </div>
    )
  }
}

export default DeploymentConfigParams
