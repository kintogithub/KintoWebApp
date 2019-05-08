import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import iscroll from 'iscroll'
import IScroll from 'react-iscroll'

import { filterArray } from 'helpers/arrayHelper'
import { Button } from '../forms'

class DropDown extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    dropdownClass: PropTypes.string,
    dropdownText: PropTypes.string,
    dropdownContentClass: PropTypes.string,
    id: PropTypes.string,
    list: PropTypes.array,
    component: PropTypes.func,
    filterField: PropTypes.string,
    actionText: PropTypes.string,
    actionHandler: PropTypes.func,
    className: PropTypes.string,
    hideAction: PropTypes.bool,
    hasDraft: PropTypes.bool,
    draftUrl: PropTypes.string,
    placeholderText: PropTypes.string
  }

  state = {
    isShown: false,
    filterText: null,
    // this is a workaround for when opening a dropdown externally we don't
    // want the onexit to fire for the first time
    noClose: false
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
    } else if (e.target.matches('.dropdown-button')) {
      return
    }

    if (this.state.isShown) {
      this.setState({ isShown: false, filterText: null })
      if (this.props.onHide) {
        this.props.onHide()
      }
      if (this.filterInput) {
        this.filterInput.value = ''
      }
    }
  }

  actionHandler = () => {
    this.props.actionHandler()
    this.onToggle(false)
  }

  onToggle = flag => {
    let toggledState = !this.state.isShown
    if (typeof flag === 'boolean') {
      toggledState = flag
    }
    this.setState({ isShown: toggledState })
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

  getFilteredList() {
    return filterArray(
      this.props.list,
      this.props.filterField,
      this.state.filterText
    )
  }

  render() {
    const { isShown } = this.state
    const {
      id,
      dropdownText,
      dropdownClass,
      dropdownContentClass,
      className,
      children,
      type,
      actionText,
      history,
      hideAction,
      placeholderText
    } = this.props
    const ItemComponent = this.props.component
    const isFilter = type === 'filter'
    const filterClass = isFilter ? 'dropdown-filter' : ''
    return (
      <div
        id={id}
        onClick={this.onPreventDefault}
        className={`dropdown ${filterClass} ${className || ''}`}
      >
        <button
          type="button"
          onClick={this.onToggle}
          className={`dropdown-button ${dropdownClass || ''}`}
        >
          {dropdownText}
        </button>
        <div
          className={`dropdown-content ${
            isShown ? 'isShown' : ''
          } ${dropdownContentClass || ''}`}
        >
          {isFilter && (
            <div className="dropdown-content-filter">
              <input
                placeholder={placeholderText}
                className="dropdown-filter-input"
                onKeyUp={this.onUpdateFilter}
                ref={input => {
                  this.filterInput = input
                }}
              />
            </div>
          )}

          <div
            className={`dropdown-content-items ${
              isFilter ? 'dropdown-content-items-scroll' : ''
            }`}
          >
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
              <div className="dropdown-scroll-container">
                {isFilter
                  ? this.getFilteredList().map((item, index) => (
                      <ItemComponent
                        {...item}
                        navigateTo={history.push}
                        key={index}
                      />
                    ))
                  : children}
              </div>
            </IScroll>
          </div>

          {isFilter &&
            !hideAction && (
              <div className="dropdown-content-action">
                <Button buttonType="dark" onClick={this.actionHandler}>
                  {actionText}
                </Button>
              </div>
            )}
        </div>
      </div>
    )
  }
}

export default withRouter(DropDown)
