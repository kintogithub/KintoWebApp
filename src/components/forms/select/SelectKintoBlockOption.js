import React from 'react'
import { components } from 'react-select'
import BlockIcon from '../../ui/BlockIcon'
import { genericKintoBlock } from 'constants/genericIcons'

const SelectKintoBlockOption = props => {
  return (
    <components.Option {...props}>
      <div
        className="select-block-option"
        data-test-block-name={props.data.name}
      >
        <BlockIcon
          icon={props.data.iconImageName}
          name={props.data.name}
          defaultIcon={genericKintoBlock}
          iconClass="main-icon small"
        />
        <div className="select-block-info">
          <h4 className="name">{props.children}</h4>
          <p className="description">{props.data.description}</p>
        </div>
      </div>
    </components.Option>
  )
}

export default SelectKintoBlockOption
