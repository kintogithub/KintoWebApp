import React, { Component } from 'react'
import PropTypes from 'prop-types'
import iscroll from 'iscroll'
import IScroll from 'react-iscroll'
import SearchInput from 'components/forms/SearchInput'
import { getVersionName } from 'helpers/versionHelper'
import { truncate } from 'helpers/stringHelper'
import {
  genericKintoBlock,
  genericDependency
} from '../../../../constants/genericIcons'

// TODO fix anchor and replace with buttons
/* eslint-disable jsx-a11y/anchor-is-valid */
class DeploymentConfigSidebar extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    filter: PropTypes.string,
    onScrollToItem: PropTypes.func.isRequired
  }

  onScrollToItem = dependencyId => {
    this.props.onScrollToItem(dependencyId)
  }

  onChangeFilter = e => {
    this.props.onUpdateFilter(e.target.value)
  }

  render() {
    const { list, filter } = this.props

    return (
      <div>
        <SearchInput
          placeholder="Search KintoBlocks & services..."
          className="white"
          value={filter}
          onChange={this.onChangeFilter}
        />
        <div className="ka-config-scroll-container">
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
            <div className="ka-config-blocks-list">
              <ul>
                {list &&
                  list.map((item, index) => (
                    <li className="parent" key={index}>
                      <a
                        onClick={() => this.onScrollToItem(item.dependencyId)}
                        className={`item ${item.active ? 'active' : ''}`}
                      >
                        <div className="main-icon">
                          <img
                            src={`/images/${item.iconImageName ||
                              genericKintoBlock}`}
                            alt="kintoblock icon"
                          />
                          <h1 className="large-letter">
                            {truncate(item.displayName, 1)}
                          </h1>
                        </div>
                        <div className="text">
                          <div className="name">{item.displayName}</div>
                          <div className="version">
                            {getVersionName(item.version.name)}
                          </div>
                        </div>
                      </a>
                      <ul>
                        {item.dependencies &&
                          item.dependencies.map((d, index) => (
                            <li key={index}>
                              <a
                                onClick={() =>
                                  this.onScrollToItem(d.dependencyId)
                                }
                                className={`item ${d.active ? 'active' : ''}`}
                              >
                                <div className="main-icon smaller">
                                  {' '}
                                  <img
                                    src={`/images/${d.iconImageName ||
                                      genericDependency}`}
                                    alt="kintoblock dependency icon"
                                  />
                                  <h3 className="smaller-letter">
                                    {truncate(d.displayName, 1)}
                                  </h3>
                                </div>
                                <div className="text">
                                  <div className="name">{d.displayName}</div>
                                  <div className="version">
                                    {d.version.name}
                                  </div>
                                </div>
                              </a>
                            </li>
                          ))}
                      </ul>
                    </li>
                  ))}
              </ul>
            </div>
          </IScroll>
        </div>
      </div>
    )
  }
}

export default DeploymentConfigSidebar
