import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DropDown from '../ui/DropDown'
import PropTypes from 'prop-types'
import { isProduction } from 'helpers/pageHelper'

class NavBar extends Component {
  static propTypes = {
    isDashboard: PropTypes.bool.isRequired,
    isSideBarShownMobile: PropTypes.bool.isRequired,
    toggleNavHandler: PropTypes.func.isRequired,
    initials: PropTypes.string.isRequired,
    homeUrl: PropTypes.string.isRequired
  }

  state = {
    showSearch: false,
    isIconHidden: false
  }

  displaySearchBar = () => {
    this.setState({ showSearch: !this.state.showSearch })
  }

  toggleInnerIcon = () => {
    this.setState({ isIconHidden: !this.state.isIconHidden })
  }

  render() {
    const {
      isDashboard,
      isSideBarShownMobile,
      toggleNavHandler,
      initials,
      homeUrl,
      isMobileOnly
    } = this.props
    const isProd = isProduction()
    return (
      <div
        className={`navbar main-navigation ${isMobileOnly ? 'left-align' : ''}`}
        data-test="navbar"
      >
        {!isMobileOnly && (
          <div
            className={`mobile-menu-toggle ${
              isSideBarShownMobile ? 'cross' : 'hamburger'
            }`}
            onClick={toggleNavHandler}
          />
        )}

        <Link to={homeUrl}>
          <div
            className={`mobile-navigation-logo ${
              isSideBarShownMobile || isMobileOnly ? 'show' : ''
            }`}
          />
        </Link>

        <div
          className={`left ${
            isSideBarShownMobile || isMobileOnly ? 'hide' : ''
          } ${this.state.showSearch ? 'hide-search' : ''}`}
        >
          <Link className="navigation-logo" to={homeUrl} />

          {isDashboard ? (
            <div className="dashboard-buttons-wrapper">
              <Link className="on-dashboard" to={homeUrl} />

              {!isProd ? (
                <Link className="go-to-market" to={'/app/market'} />
              ) : null}

              <Link className="responsive-on dashboard" to={homeUrl} />

              {!isProd ? (
                <Link className="responsive-go to-market" to={'/app/market'} />
              ) : null}
              <h5 id="alphaAccessNav">alpha access</h5>
            </div>
          ) : (
            <div className="market-buttons-wrapper">
              <Link className="on-market" to={'/app/market'} />
              <Link className="go-to-dashboard" to={homeUrl} />
              <Link className="responsive-on market" to={'/app/market'} />
              <Link className="responsive-go to-dashboard" to={homeUrl} />
            </div>
          )}
        </div>
        <div className={`right ${isSideBarShownMobile ? 'hide' : ''}`}>
          {!isMobileOnly && (
            <div className="inner-right">
              <a
                href="https://docs.kintohub.com/docs/getting-started"
                aria-label="go to kintohub's documentation"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="docs-button" />
              </a>
              <div
                className={`search-icon ${this.state.showSearch ? '' : 'show'}`}
                onClick={this.displaySearchBar}
              />
              <div
                className={`notifications ${
                  this.state.showSearch ? 'hide-search' : ''
                } ${isProd ? 'dimmed' : ''}`}
              />
            </div>
          )}
          <div className={this.state.showSearch ? 'hide-search' : ''}>
            <DropDown
              type="simple"
              className="direction-left"
              dropdownClass="user-avatar uppercase"
              dropdownText={initials}
            >
              <button type="button" onClick={this.props.logout}>
                Logout
              </button>
            </DropDown>
          </div>

          {/* TODO: show search after enabled */}
          {/* <div className={`search ${this.state.showSearch ? 'show' : ''}`}>
            <input
              type="text"
              placeholder="Search"
              onFocus={this.toggleInnerIcon}
              onBlur={this.toggleInnerIcon}
              disabled={isProduction()}
            />
            <div
              className={`inner-search-icon ${
            this.state.isIconHidden ? 'hide' : ''
              }`}
            />
            <div className="close-search" onClick={this.displaySearchBar} />
          </div> */}
        </div>
      </div>
    )
  }
}

export default NavBar
