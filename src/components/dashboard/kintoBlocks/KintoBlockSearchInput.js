import React, { Component } from 'react'
import PropTypes from 'prop-types'
import groupBy from 'lodash/groupBy'
import { Async } from 'react-select'
import { OWNED_BLOCK } from 'constants/kintoBlockOwnershipType'
import SelectSearchIcon from 'components/forms/select/SelectSearchIcon'
import SelectKintoBlockOption from 'components/forms/select/SelectKintoBlockOption'
import SelectKintoBlockGroup from 'components/forms/select/SelectKintoBlockGroup'

class KintoBlockSearchInput extends Component {
  static propTypes = {
    searchKintoBlocks: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    placeholder: PropTypes.string,
    itemsToHideFromResult: PropTypes.array,
    sharedOnly: PropTypes.bool,
    selectClass: PropTypes.string,
    isSearch: PropTypes.bool,
    isAdd: PropTypes.bool,
    showTutorialOnly: PropTypes.bool
  }

  state = {
    prepopulatedKintoblocks: []
  }

  async componentDidMount() {
    const result = await this.fetchItems()
    this.setState({ prepopulatedKintoblocks: result })
  }

  getDefaultOptions = () => {
    if (this.props.isSearch) {
      return true
    }
    const itemsToSkip = this.props.itemsToHideFromResult || []
    let result = this.state.prepopulatedKintoblocks
    result = result.filter(r => !itemsToSkip.some(i => i === r.id))
    return this.getGroupedResult(result)
  }

  fetchItems = async filter => {
    // ugly: timeout to get the updated itemsToSkip
    await new Promise(r => setTimeout(r, 0))
    const itemsToSkip = this.props.itemsToHideFromResult || []
    const sharedOnly = this.props.sharedOnly || false
    let result = await this.props.searchKintoBlocks(
      filter,
      sharedOnly,
      itemsToSkip
    )

    //TODO: hide until we have disabled state
    result = result.filter(r => !r.isSkippedOnSearch)
    if (this.props.showTutorialOnly) {
      result = result.filter(r => r.isExample)
    }
    return result
  }

  getGroupedResult = result => {
    const groupedResult = groupBy(result, r => r.ownershipType)
    return Object.keys(groupedResult)
      .map(k => {
        return {
          type: k,
          options: groupedResult[k]
        }
      })
      .sort(a => (a === OWNED_BLOCK ? -1 : 1))
  }

  onSearch = async query => {
    const result = await this.fetchItems(query)
    return this.getGroupedResult(result)
  }

  render() {
    const { onSelect, onBlur, placeholder, selectClass } = this.props
    const defaultOptions = this.getDefaultOptions()

    return (
      <Async
        tabSelectsValue={false}
        placeholder={placeholder}
        loadOptions={this.onSearch}
        onChange={onSelect}
        onBlur={onBlur}
        openMenuOnFocus
        defaultOptions={defaultOptions}
        classNamePrefix="react-select"
        className={`react-select ${selectClass}`}
        value=""
        formatGroupLabel={SelectKintoBlockGroup}
        components={{
          DropdownIndicator: SelectSearchIcon,
          Option: SelectKintoBlockOption
        }}
      />
    )
  }
}

export default KintoBlockSearchInput
