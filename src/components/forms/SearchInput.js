import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SearchInput extends Component {
  static propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
  }

  state = {
    isIconHidden: false
  }

  toggleIcon = () => {
    this.setState(state => ({
      isIconHidden: !state.isIconHidden
    }))
  }

  render() {
    return (
      <div
        className={`search ${this.props.className ? this.props.className : ''}`}
      >
        <input
          type="text"
          placeholder={this.props.placeholder}
          onFocus={this.toggleIcon}
          onBlur={this.toggleIcon}
          value={this.props.value}
          onChange={this.props.onChange}
        />
        <div
          className={`inner-search-icon ${this.state.isIconHidden
            ? 'hide'
            : ''}`}
        />
      </div>
    )
  }
}

export default SearchInput
