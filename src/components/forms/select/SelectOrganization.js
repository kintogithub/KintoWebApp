import React, { Component } from 'react'
import Select, { components } from 'react-select'

const Option = props => {
  return (
    <components.Option {...props}>
      <div className="select-repo-info" data-test-label={props.data.label}>
        <div className="icon-and-label">
          <span className={`icon ${props.data.gitSourceType}`} />
          <p className="name">{props.label}</p>
        </div>
        {props.data.linkedText && (
          <div>
            <p className="is-linked">{props.data.linkedText}</p>
          </div>
        )}
      </div>
    </components.Option>
  )
}

const Group = props => {
  return <components.Group {...props} />
}

class SelectOrganization extends Component {
  onInputChange = option => {
    if (option.group === 'gitSources') {
      if (!this.props.gitSources[option.value]) {
        this.props.openModalFromDropdown(option.value)
        return
      }
    }
    this.props.input.onChange(option.value)
    this.props.onToggleOrganization(option.gitSourceType)
  }

  render() {
    const { options, input, label } = this.props
    const { value, name } = input
    const organizationOptions = options.find(o => o.label === 'organization')
      .options
    const inputVal = organizationOptions.find(o => o.value === value)

    return (
      <div>
        <label htmlFor={name}>{label}</label>
        <Select
          components={{ Option, Group }}
          classNamePrefix={`${
            inputVal ? inputVal.gitSourceType : ''
          } react-select`}
          className="react-select repository-fields"
          options={options}
          onChange={this.onInputChange}
          value={inputVal}
          isSearchable={false}
          placeholder="Select an Organization"
        />
      </div>
    )
  }
}

export default SelectOrganization
