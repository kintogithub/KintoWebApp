import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import DropDown from '../ui/DropDown'
import TagItem from '../dashboard/ui/TagItem'

class KintoAppVersionSwitcher extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    dropdownItems: PropTypes.array.isRequired,
    selectedVersion: PropTypes.string,
    selectedVersionUrl: PropTypes.string
  }

  render() {
    const {
      disabled,
      dropdownItems,
      selectedVersion,
      selectedVersionUrl
    } = this.props
    return (
      <div className="list-container">
        {selectedVersionUrl && !disabled ? (
          <Link to={selectedVersionUrl}>{selectedVersion}</Link>
        ) : (
          <div className="disabled text-disabled">{selectedVersion}</div>
        )}
        <DropDown
          type="filter"
          dropdownClass="breadcrumb-icon"
          id="version-dropdown"
          list={dropdownItems}
          component={TagItem}
          filterField="text"
          actionText="Create New Version"
          actionHandler={this.onVersionModalOpen}
          dropdownContentClass="short"
          className="margin-right"
        />
      </div>
    )
  }
}

export default KintoAppVersionSwitcher
