import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Tooltip from 'rc-tooltip'
import { pages, urls } from 'constants/pages'
import {
  genericKintoBlock,
  genericDependency,
  genericDependencyWithBorder
} from 'constants/genericIcons'
import { MICROSERVICE } from 'constants/kintoBlockTypes'
import { truncate } from 'helpers/stringHelper'
import { getKbTypeClass } from 'helpers/kintoBlocksHelper'
import DropDown from '../../../ui/DropDown'
import KintoBlockTagAndBranchDropDownContainer from 'containers/breadcrumbs/KintoBlockTagAndBranchDropDownContainer'

class KintoBlockCard extends Component {
  static propTypes = {
    kintoBlock: PropTypes.object.isRequired,
    latestVersion: PropTypes.object.isRequired,
    dropdownId: PropTypes.string.isRequired,
    dropdownVersionId: PropTypes.string.isRequired,
    goToLatest: PropTypes.func.isRequired,
    goToEndpoint: PropTypes.func.isRequired,
    kintoBlockDependencies: PropTypes.array.isRequired,
    goToDependencyManage: PropTypes.func.isRequired,
    hasApiDoc: PropTypes.bool.isRequired
  }

  state = {
    areTagsAndBranchesShown: false,
    areDependenciesShown: false
  }

  showVersionDropdown = () => {
    this.setState({ areTagsAndBranchesShown: true })
  }

  hideVersionDropdown = () => {
    this.setState({ areTagsAndBranchesShown: false })
  }

  showDependencyDropdown = e => {
    e.preventDefault()
    this.setState({ areDependenciesShown: true })
  }

  hideDependencyDropdown = () => {
    this.setState({ areDependenciesShown: false })
  }

  render() {
    const {
      kintoBlock,
      latestVersion,
      dropdownId,
      dropdownVersionId,
      dropdownDependencyId,
      goToLatest,
      goToEndpoint,
      kintoBlockDependencies,
      goToDependencyManage,
      hasApiDoc
    } = this.props
    return (
      <Link
        to={latestVersion.url}
        className={`kintoblock ${getKbTypeClass(kintoBlock.type)}`}
        data-test={`kb-card-${dropdownId}`}
      >
        <div className="top">
          <div className="text">
            <div className="left">
              <div className="image-and-letter">
                <img
                  src={`/images/${kintoBlock.iconImageName ||
                    genericKintoBlock}`}
                  alt="kintoblock icon"
                />
                <h1 className="large-letter">
                  {truncate(kintoBlock.displayName, 1)}
                </h1>
              </div>
            </div>
            <div className="right">
              <Tooltip
                placement="top"
                overlay={getKbTypeClass(kintoBlock.type)}
                trigger="hover"
                overlayClassName="kbtype"
              >
                <span
                  className={`type-icon ${getKbTypeClass(kintoBlock.type)}`}
                />
              </Tooltip>
              {/*
                <h4 className="language">lang</h4>
              */}
            </div>
            <div className="name-and-tag">
              <h3 className="name">{kintoBlock.displayName}</h3>

              {/* TODO isLatestVersionPending && (
                <div className={`text-highlight ${latestVersion.className}`}>
                  PENDING
                </div>
              )*/}
            </div>
          </div>
        </div>

        <div className="bottom">
          <div className="icons">
            <div className="left">
              <DropDown
                type="dependencies"
                dropdownClass="dependencies"
                className="menu-hidden dependency-dropdown"
                id={dropdownDependencyId}
                isShown={this.state.areDependenciesShown}
                onHide={this.hideDependencyDropdown}
              >
                <h4 className="title">
                  Dependencies ({kintoBlockDependencies.length})
                </h4>

                <div className="line" />

                {kintoBlockDependencies.map((d, index) => (
                  <button
                    onClick={() => goToDependencyManage(d.url)}
                    type="button"
                    key={index}
                  >
                    <div className="dependency">
                      <img
                        src={`/images/${d.iconImageName || genericDependency}`}
                        alt="dependency icon"
                      />
                      <h3 className="large-letter-dependency">
                        {truncate(d.name, 1)}
                      </h3>
                    </div>
                    <h5>{d.name}</h5>
                  </button>
                ))}
              </DropDown>

              <div
                className="applications"
                onClick={this.showDependencyDropdown}
              >
                {kintoBlockDependencies.slice(0, 4).map((d, i) => (
                  <div className="dependency" key={i}>
                    <img
                      src={`/images/${d.iconImageName ||
                        genericDependencyWithBorder}`}
                      alt="kintoblock icon"
                    />
                    <h3 className="large-letter-dependency">
                      {truncate(d.name, 1)}
                    </h3>
                  </div>
                ))}

                {kintoBlockDependencies.length > 4 && (
                  <div className="dependency number">
                    +{kintoBlockDependencies.length - 4}
                  </div>
                )}
              </div>
            </div>

            <div className="right">
              <DropDown
                type="simple"
                dropdownClass="menu"
                className="wide"
                id={dropdownId}
              >
                <button
                  onClick={goToLatest}
                  className="double-line"
                  type="button"
                >
                  <h5>Edit Branch</h5>
                  <div className="faded">{latestVersion.name}</div>
                </button>
                <button onClick={this.showVersionDropdown} type="button">
                  View All Branches & Tags
                </button>
                {kintoBlock.type === MICROSERVICE &&
                  hasApiDoc && (
                    <button onClick={goToEndpoint} type="button">
                      View Endpoints
                    </button>
                  )}
              </DropDown>

              <KintoBlockTagAndBranchDropDownContainer
                onHide={this.hideVersionDropdown}
                isShown={this.state.areTagsAndBranchesShown}
                id={dropdownVersionId}
                url={urls[pages.dashboardKintoBlocksManage]}
                kintoBlock={kintoBlock}
                noHighlight={true}
                className="menu-hidden"
              />
            </div>
          </div>
        </div>
      </Link>
    )
  }
}
export default KintoBlockCard
