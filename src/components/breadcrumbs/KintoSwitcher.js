import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Tooltip from 'rc-tooltip'
import { getKbTypeClass } from 'helpers/kintoBlocksHelper'

import DropDown from '../ui/DropDown'
import TagItem from '../dashboard/ui/TagItem'

const KintoSwitcher = ({
  disabled,
  selectedItemName,
  selectedItemUrl,
  dropdownItems,
  actionHandler,
  selectedItemType,
  isDeployment
}) => (
  <div className="list-container">
    {selectedItemUrl && !disabled ? (
      <div className="breadcrumb-text">
        {!isDeployment && (
          <Tooltip
            placement="top"
            overlay={getKbTypeClass(selectedItemType)}
            trigger="hover"
            overlayClassName="kbtype"
          >
            <span className={`type-icon ${getKbTypeClass(selectedItemType)}`} />
          </Tooltip>
        )}
        <Link to={selectedItemUrl}>{selectedItemName}</Link>
      </div>
    ) : (
      <div className="disabled text-disabled">{selectedItemName}</div>
    )}
    <DropDown
      type="filter"
      dropdownClass="breadcrumb-icon"
      id="application-dropdown"
      list={dropdownItems}
      component={TagItem}
      filterField="text"
      actionText={
        isDeployment ? 'Create New Deployment' : 'Create New KintoBlock'
      }
      actionHandler={actionHandler}
      dropdownContentClass="short"
      className="margin-right"
    />
  </div>
)

KintoSwitcher.propTypes = {
  disabled: PropTypes.bool,
  selectedItemName: PropTypes.string,
  selectedItemUrl: PropTypes.string,
  dropdownItems: PropTypes.array.isRequired,
  actionHandler: PropTypes.func.isRequired,
  isDeployment: PropTypes.bool.isRequired,
  selectedItemType: PropTypes.string
}

export default KintoSwitcher
