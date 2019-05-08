import React from 'react'
import PropTypes from 'prop-types'

const TitleWithLines = ({ text }) => (
  <div className="title-with-lines">
    <div className="line" />
    <h2 className="gallery">{text}</h2>
    <div className="line" />
  </div>
)
TitleWithLines.propTypes = {
  text: PropTypes.string.isRequired
}

export default TitleWithLines
