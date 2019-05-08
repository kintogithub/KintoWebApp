import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DeploymentConfigScroller from '../DeploymentConfigScroller'
import DeploymentConfigHardwareItem from './DeploymentConfigHardwareItem'
import { findDependency } from 'helpers/kintoBlocksHelper'

function getIsShownClass(shownDependenciesIds, data) {
  return !shownDependenciesIds.some(id => data.dependencyId === id)
    ? 'hide'
    : ''
}

class DeploymentConfigHardware extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    allDependenciesInfo: PropTypes.array.isRequired,
    itemToScrollTo: PropTypes.string,
    shownDependenciesIds: PropTypes.array.isRequired,
    resetCPUHandler: PropTypes.func.isRequired,
    onChangeActive: PropTypes.func.isRequired
  }

  onChangeActive = (index, isShown) => {
    this.props.onChangeActive(
      this.props.fields.get(index).dependencyId,
      isShown
    )
  }

  render() {
    const {
      fields,
      allDependenciesInfo,
      itemToScrollTo,
      shownDependenciesIds,
      resetCPUHandler
    } = this.props
    return (
      <div className="ka-config-hardware">
        <DeploymentConfigScroller
          type="hardware"
          itemToScrollTo={itemToScrollTo}
          onChangeActive={this.onChangeActive}
        >
          {fields.map((field, key) => {
            const data = fields.get(key)
            return (
              <div
                key={key}
                className={getIsShownClass(
                  shownDependenciesIds,
                  fields.get(key)
                )}
                data-scroll={`hardware-${data.dependencyId}`}
              >
                <DeploymentConfigHardwareItem
                  field={field}
                  info={findDependency(allDependenciesInfo, data.dependencyId)}
                  data={data}
                  resetCPUHandler={resetCPUHandler}
                />
              </div>
            )
          })}
        </DeploymentConfigScroller>
      </div>
    )
  }
}

export default DeploymentConfigHardware
