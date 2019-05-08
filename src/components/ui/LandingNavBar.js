import React from 'react'
import PropTypes from 'prop-types'

const LandingNavBar = ({ url }) => (
  <nav className="landing main-navigation" data-test="landing-navbar">
    <a
      href={url}
      target={url !== '/' ? '_blank' : ''}
      rel={url !== '/' ? 'noopener noreferrer' : ''}
    >
      <div className="navigation-logo" />
    </a>
  </nav>
)
LandingNavBar.propTypes = {
  url: PropTypes.string.isRequired
}

export default LandingNavBar
