import React from 'react'
import PropTypes from 'prop-types'

const TagItem = ({
  text,
  tag,
  className,
  url,
  navigateTo,
  active,
  version,
  liveEnvironments,
  lastUpdated,
  notes,
  special
}) => (
  <button
    className={`tag-item ${active ? 'active' : ''}`}
    type="button"
    onClick={() => navigateTo(url)}
  >
    {special ? (
      <div className="kinto-app-tag draft">
        <div className="tag-item-text">{text}</div>
        <div className="draft-icon" />
      </div>
    ) : (
      <div className="kinto-app-tag">
        <div className="tag-name-and-environments">
          <div className="tag-item-text">{text}</div>
          <div className={`text-highlight ${className}`}>{tag}</div>
          {liveEnvironments && liveEnvironments.length ? (
            <div className="environments">
              <h6 className="main">{liveEnvironments[0]}</h6>
              {liveEnvironments.length > 1 && (
                <h6 className="extra">+{liveEnvironments.length - 1}</h6>
              )}
            </div>
          ) : null}
          {version && (
            <div className="tag-item-breadcrumb-version">{version}</div>
          )}
        </div>
        {lastUpdated && (
          <div className="date">
            {' '}
            <h5>{lastUpdated}</h5>
          </div>
        )}
        {notes && (
          <div className="notes">
            <h5>{notes}</h5>
          </div>
        )}
      </div>
    )}
  </button>
)

TagItem.propTypes = {
  text: PropTypes.string.isRequired,
  tag: PropTypes.string,
  className: PropTypes.string,
  url: PropTypes.string.isRequired,
  navigateTo: PropTypes.func.isRequired,
  active: PropTypes.bool,
  version: PropTypes.string,
  liveEnvironments: PropTypes.array,
  lastUpdated: PropTypes.string,
  notes: PropTypes.string
}

export default TagItem
