import React from 'react'
import { components } from 'react-select'

const SelectKintoBlockOption = props => {
  return (
    <components.Option {...props}>
      <div data-test-repo-name={props.data.label}>{props.children}</div>
    </components.Option>
  )
}

export default SelectKintoBlockOption
