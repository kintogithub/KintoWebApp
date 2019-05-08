import React from 'react'
import PropTypes from 'prop-types'
import { getKbTypeClass } from 'helpers/kintoBlocksHelper'
const TagItem = ({
  text,
  tag,
  className,
  url,
  navigateTo,
  active,
  version,
  kintoBlockType,
  isDisabled
}) => (
  <button
    className={`tag-item ${active ? 'active' : ''} ${
      isDisabled ? 'disabled' : ''
    }`}
    onClick={!isDisabled ? () => navigateTo(url) : null}
  >
    <div className="tag-item-text">
      {kintoBlockType && (
        <span className={`type-icon ${getKbTypeClass(kintoBlockType)}`} />
      )}
      {text}
    </div>
    <div className={`text-highlight ${className} ${tag} `}>{tag}</div>
    {version && <div className="tag-item-breadcrumb-version">{version}</div>}
  </button>
)

TagItem.propTypes = {
  text: PropTypes.string,
  tag: PropTypes.string,
  className: PropTypes.string,
  url: PropTypes.string.isRequired,
  navigateTo: PropTypes.func.isRequired,
  active: PropTypes.bool,
  version: PropTypes.string,
  kintoBlockType: PropTypes.string
}

export default TagItem
