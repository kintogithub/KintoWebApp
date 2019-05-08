import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import iscroll from 'iscroll'
import IScroll from 'react-iscroll'
import Tooltip from 'rc-tooltip'
import { truncate } from 'helpers/stringHelper'
import { getKbTypeClass } from 'helpers/kintoBlocksHelper'
import { getVersionName } from 'helpers/versionHelper'

class KintoBlockTagAndBranchDropDown extends Component {
  static propTypes = {
    kintoBlock: PropTypes.object.isRequired,
    versionType: PropTypes.string.isRequired,
    kintoBlockType: PropTypes.string,
    branchArray: PropTypes.array.isRequired,
    tagArray: PropTypes.array.isRequired,
    dropdownText: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onClickHandler: PropTypes.func.isRequired,
    isForm: PropTypes.bool
  }

  state = {
    isShown: false,
    noClose: false,
    filterText: null,
    selectedTab: this.props.versionType
  }

  componentDidMount() {
    window.addEventListener('click', this.onClickOutside, false)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onClickOutside, false)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isShown && !this.state.isShown) {
      this.setState({ isShown: true, noClose: true })
      setTimeout(() => {
        if (this.filterInput) {
          this.filterInput.focus()
        }
      })
    }

    if (nextProps.versionType !== this.props.versionType) {
      this.setState({ selectedTab: nextProps.versionType })
    }
  }

  onClickOutside = e => {
    if (this.state.noClose) {
      this.setState({ noClose: false })
      return
    }
    if (this.props.id) {
      const selector = `#${this.props.id}`
      if (
        document.querySelector(selector).contains(e.target) &&
        !e.target.matches('.dropdown-content-items button')
      ) {
        return
      }
    }

    if (this.state.isShown) {
      if (this.props.onHide) {
        this.props.onHide()
      }
      if (this.filterInput) {
        this.filterInput.value = ''
      }
      this.setState({ isShown: false, filterText: null })
      if (this.filterInput) {
        this.filterInput.value = ''
      }
    }
  }

  onToggle = () => {
    let toggledState = !this.state.isShown
    this.setState({
      isShown: toggledState,
      selectedTab: this.props.versionType
    })
    if (!toggledState && this.props.onHide) {
      this.props.onHide()
    }
  }

  onUpdateFilter = e => {
    this.setState({ filterText: e.target.value })
  }

  onPreventDefault(e) {
    e.preventDefault()
  }

  toggleTab = tabName => {
    this.setState({ selectedTab: tabName })
  }

  getFilteredList = array => {
    return array.filter(r => {
      const { filterText } = this.state
      if (!filterText) return true
      return getVersionName(r.name)
        .toUpperCase()
        .includes(filterText.toUpperCase())
    })
  }

  isActive = name => {
    return !this.props.noHighlight && this.props.dropdownText === name
  }

  render() {
    const { isShown, selectedTab } = this.state

    const {
      id,
      branchArray,
      tagArray,
      dropdownText,
      versionType,
      kintoBlockType,
      className,
      onClickHandler,
      isForm
    } = this.props

    const isTag = selectedTab === 'tag'
    const list = this.getFilteredList(isTag ? tagArray : branchArray)

    return (
      <div
        id={id}
        className={`dropdown dropdown-filter ${className ? className : ''}`}
        onClick={this.onPreventDefault}
      >
        {isForm ? (
          <div className="tag-and-branch-input-wrapper">
            <div className="tag-and-branch-input">
              <input
                data-test="dropdown-filter"
                className="dropdown-filter-input tag-and-branch-dropdown"
                onKeyUp={this.onUpdateFilter}
                placeholder={getVersionName(dropdownText)}
                onClick={this.onToggle}
                ref={input => {
                  this.filterInput = input
                }}
              />
              <span className={`icon ${isShown ? 'search' : ''}`} />
            </div>
            <div>
              <Tooltip
                placement="top"
                overlay={getKbTypeClass(kintoBlockType)}
                trigger="hover"
                overlayClassName="kbtype"
              >
                <span
                  className={`type-icon ${getKbTypeClass(kintoBlockType)}`}
                />
              </Tooltip>
            </div>
          </div>
        ) : (
          <div className="breadcrumb-with-icon">
            <Tooltip
              placement="top"
              overlay={isTag ? 'Tag' : 'Branch'}
              trigger="hover"
            >
              {versionType === 'tag' ? (
                <>
                  <div className="tag icon small" />
                  <span className="tag">Tag :</span>
                </>
              ) : (
                <>
                  <div className="branch icon small" />
                  <span className="branch">Branch :</span>
                </>
              )}
            </Tooltip>
            <h4 data-test="breadcrumb-text">{getVersionName(dropdownText)}</h4>
            <button
              type="button"
              onClick={this.onToggle}
              className="dropdown-button breadcrumb-icon"
              data-test="breadcrumb-toggle-tag-and-branch"
            />
          </div>
        )}

        <div
          className={`dropdown-content tag-branch ${isShown ? 'isShown' : ''} ${
            isForm ? 'form-dropdown' : ''
          }`}
        >
          <div className="dropdown-tabs">
            <div
              className={`tab branches ${isTag ? '' : 'active'}`}
              onClick={() => this.toggleTab('branch')}
              data-test="branch-tab"
            >
              <div className="branch icon" />
              <h3>branches</h3>
            </div>

            <div
              className={`tab tags ${isTag ? 'active' : ''}`}
              onClick={() => this.toggleTab('tag')}
              data-test="tag-tab"
            >
              <h3>tags</h3>
              <div className="tag icon" />
            </div>
          </div>

          {!isForm && (
            <div className="dropdown-content-filter tags-and-branches">
              <input
                data-test="dropdown-filter"
                className="dropdown-filter-input"
                onKeyUp={this.onUpdateFilter}
                ref={input => {
                  this.filterInput = input
                }}
              />
            </div>
          )}

          <div className="dropdown-content-items dropdown-content-items-scroll">
            <IScroll
              iScroll={iscroll}
              options={{
                scrollbars: true,
                mouseWheel: true,
                fadeScrollbars: true,
                shrinkScrollbars: 'scale',
                interactiveScrollbars: true
              }}
            >
              <div
                className={`dropdown-scroll-container ${
                  isForm ? 'form-scroll-container' : ''
                }`}
              >
                <div className="tag-list" data-test="tag-list">
                  {list.map((item, index) => (
                    <button
                      key={index}
                      className={`tag-item tag-button ${
                        this.isActive(item.name) ? 'active' : ''
                      }`}
                      onClick={() => onClickHandler(item)}
                    >
                      <div className="tag-and-commit">
                        <div className={isTag ? 'group-together' : ''}>
                          <div className="tag-name">
                            {getVersionName(item.name)}
                          </div>
                          {isTag && item.activeBuildId ? (
                            <div className="tag-date">- {item.lastUpdated}</div>
                          ) : null}
                        </div>
                      </div>

                      <div className="group-together">
                        <div className="tag-commit">
                          <span
                            className={`icon ${
                              item.activeBuildId ? 'build' : 'lapis-alert'
                            }`}
                          />
                          <span className="uppercase">
                            {item.activeBuildId
                              ? 'Build #'
                              : 'No Successful Build'}
                            {truncate(item.activeBuildId, 5)}
                          </span>
                        </div>
                        {!isTag && item.lastUpdated && item.activeBuildId ? (
                          <div className="tag-date">- {item.lastUpdated}</div>
                        ) : null}
                      </div>

                      {item.activeBuildId && (
                        <div className="note">{item.note}</div>
                      )}
                    </button>
                  ))}

                  {!list.length && (
                    <div className="no-tags">
                      No {isTag ? 'tags' : 'branches'} added.
                    </div>
                  )}
                </div>
              </div>
            </IScroll>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(KintoBlockTagAndBranchDropDown)
