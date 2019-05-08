import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DropDown from '../ui/DropDown'
import TagItem from '../dashboard/ui/TagItem'

class DeploymentEnvironmentReleaseSwitcher extends Component {
  static propTypes = {
    dropdownItems: PropTypes.array.isRequired,
    selectedReleaseVersion: PropTypes.string,
    deployment: PropTypes.object.isRequired,
    hideAction: PropTypes.bool
  }

  render() {
    const { dropdownItems, selectedReleaseVersion, hideAction } = this.props
    return (
      <div className="list-container">
        <div className="text-disabled">{selectedReleaseVersion}</div>

        <DropDown
          type="filter"
          placeholderText="Search application tags..."
          dropdownClass="breadcrumb-icon"
          id="env-release-switch-dropdown"
          list={dropdownItems}
          component={TagItem}
          filterField="text"
          dropdownContentClass="short"
          className="margin-right"
          hideAction={hideAction}
        />
      </div>
    )
  }
}

export default DeploymentEnvironmentReleaseSwitcher
