import React, { Component } from 'react'
import Select, { components } from 'react-select'

const Option = props => {
  return (
    <components.Option {...props}>
      <div className="select-repo-info" data-test-label={props.data.label}>
        <div className="icon-and-label">
          <span className={`icon ${props.value}`} />
          <p className="name">{props.label}</p>
        </div>
        <div>
          <p className="is-linked">{props.data.linkedText}</p>
        </div>
      </div>
    </components.Option>
  )
}

const Placeholder = props => {
  return (
    <components.Placeholder {...props}>
      <div className="select-icons">
        <span className="icon github" />
        <span className="icon bitbucket" />
        <span className="icon gitlab" />
      </div>
      <div className="custom-placeholder">Choose a Git Source</div>
    </components.Placeholder>
  )
}

class SelectGitSource extends Component {
  onInputChange = option => {
    if (!this.props.gitSources[option.value]) {
      this.props.openModalFromDropdown(option.value)
      return
    }
    this.props.input.onChange(option.value)
  }

  render() {
    const { options, input, label } = this.props
    const { value, name } = input

    const inputVal = options.find(o => o.value === value)
    return (
      <div>
        <label htmlFor={name}>{label}</label>
        <Select
          components={{ Option, Placeholder }}
          classNamePrefix={`${value} react-select`}
          className="react-select repository-fields"
          options={options}
          isSearchable={false}
          onChange={this.onInputChange}
          value={inputVal}
        />
      </div>
    )
  }
}

export default SelectGitSource
