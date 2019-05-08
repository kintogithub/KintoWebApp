import React from 'react'
import PropTypes from 'prop-types'

import DropDown from '../ui/DropDown'
import TagItem from '../dashboard/ui/TagItem'

const WorkspaceSwitcher = ({
  selectedItemName,
  dropdownItems,
  actionHandler
}) => (
  <div className="list-container">
    <div className="disabled text-disabled">{selectedItemName}</div>
    <DropDown
      type="filter"
      dropdownClass="breadcrumb-icon"
      id="workspace-dropdown"
      list={dropdownItems}
      component={TagItem}
      filterField="text"
      actionText="Create New Workspace"
      actionHandler={actionHandler}
      dropdownContentClass="short"
      className="margin-right"
    />
  </div>
)

WorkspaceSwitcher.propTypes = {
  selectedItemName: PropTypes.string.isRequired,
  dropdownItems: PropTypes.array.isRequired,
  actionHandler: PropTypes.func.isRequired
}

export default WorkspaceSwitcher
