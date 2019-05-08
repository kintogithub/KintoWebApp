import React from 'react'
import PropTypes from 'prop-types'
import DropDown from '../ui/DropDown'
import TagItem from '../dashboard/ui/TagItem'

const EnvironmentSwitcher = ({ selectedItemName, dropdownItems }) => (
  <div className="list-container">
    <div className="disabled text-disabled">{selectedItemName}</div>
    <DropDown
      type="filter"
      dropdownClass="breadcrumb-icon"
      id="environment-dropdown"
      list={dropdownItems}
      component={TagItem}
      filterField="text"
      dropdownContentClass="short"
      className="margin-right"
      hideAction={true}
    />
  </div>
)

EnvironmentSwitcher.propTypes = {
  selectedItemName: PropTypes.string,
  dropdownItems: PropTypes.array.isRequired
}

export default EnvironmentSwitcher
