import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Tooltip from 'rc-tooltip'
import { Link } from 'react-router-dom'
import {
  genericKintoBlock,
  genericDependency,
  genericDependencyWithBorder
} from 'constants/genericIcons'
import { SERVICE } from 'constants/kintoBlockTypes'
import { getKbTypeClass } from 'helpers/kintoBlocksHelper'
import { isProduction } from 'helpers/pageHelper'
import BlockIcon from '../ui/BlockIcon'
import KintoBlockVersionSelectorContainer from 'containers/dashboard/ui/KintoBlockVersionSelectorContainer'

// TODO fix anchor and replace with buttons
/* eslint-disable jsx-a11y/anchor-is-valid */
class DependencyItem extends Component {
  static propTypes = {
    appVersion: PropTypes.string,
    index: PropTypes.number.isRequired,
    field: PropTypes.string.isRequired,
    fields: PropTypes.object.isRequired,
    appDependenciesInfo: PropTypes.object.isRequired,
    data: PropTypes.object,
    disabled: PropTypes.bool,
    isTutorial: PropTypes.bool.isRequired,
    updateDependenciesTutorialFieldStatus: PropTypes.func.isRequired,
    refreshActiveItemInTutorial: PropTypes.func.isRequired
  }

  state = {
    isExpanded: false
  }

  onRemoveItem = () => {
    const {
      fields,
      index,
      isTutorial,
      updateDependenciesTutorialFieldStatus,
      refreshActiveItemInTutorial
    } = this.props
    fields.remove(index)
    if (isTutorial) {
      updateDependenciesTutorialFieldStatus()
      refreshActiveItemInTutorial()
    }
  }

  toggleExpand = () => {
    this.setState(prevState => ({
      isExpanded: !prevState.isExpanded
    }))
  }

  dependencySelectFormat = item => {
    const block = this.props.appDependenciesInfo[this.props.data.blockId]
    if (!block) {
      throw new Error(
        'Dependency version formatter unable to access dependency info'
      )
    }
    return block.versions.findIndex(
      b => item.name === b.name && item.type === b.type
    )
  }

  dependencySelectParse = index => {
    const block = this.props.appDependenciesInfo[this.props.data.blockId]
    if (!block) {
      throw new Error(
        'Dependency version parser unable to access dependency info'
      )
    }
    const selectedVersion = block.versions[index]
    return {
      name: selectedVersion.name,
      type: selectedVersion.type
    }
  }

  render() {
    const {
      appVersion,
      field,
      data,
      appDependenciesInfo,
      disabled,
      isKintoBlock
    } = this.props
    const block = appDependenciesInfo[data.blockId]
    if (!block) {
      return null
    }
    const blockDependencies = block.dependencies.filter(d => d.type !== SERVICE)
    const isProd = isProduction()
    return (
      <div className="block">
        {!disabled ? (
          <a onClick={this.onRemoveItem} className="delete-block hide-text">
            delete
          </a>
        ) : null}
        <div
          className={`icon-text-and-version ${getKbTypeClass(block.type)} ${
            blockDependencies.length ? 'has-dependencies' : ''
          }`}
        >
          <BlockIcon
            icon={block.iconImageName}
            name={block.name}
            iconClass="main-icon"
            defaultIcon={genericKintoBlock}
          />

          <div className="left">
            <h3 className="name">{block.name}</h3>
            <h6 className="description">{block.description}</h6>
          </div>
          <div className="right">
            <KintoBlockVersionSelectorContainer
              isKintoBlock={isKintoBlock}
              field={field}
              kintoBlock={block}
              isForm={true}
            />
            {appVersion && (
              <div>
                {!isProd ? (
                  <Link
                    className="icon gear-circle"
                    data-test="configure-dependencies-icon"
                    to={`${appVersion}/config/0?dependency=${
                      data.dependencyId
                    }`}
                  />
                ) : (
                  <span className="icon dimmed gear-circle" />
                )}
              </div>
            )}
          </div>
        </div>

        {blockDependencies.length ? (
          <div className="dependencies-exist">
            <div
              className={`${this.state.isExpanded ? 'open' : 'closed'} expand`}
            >
              <div className="icons">
                {blockDependencies.slice(0, 4).map((dep, key) => (
                  <BlockIcon
                    icon={dep.iconImageName}
                    name={dep.name}
                    key={key}
                    letterClass="large-letter-dependency"
                    defaultIcon={genericDependencyWithBorder}
                  />
                ))}
                {blockDependencies.length > 4 && (
                  <div className="number">+{blockDependencies.length - 4}</div>
                )}
              </div>

              <div className="icons">
                {block.dependencies.filter(d => d.type === SERVICE).length ? (
                  <div className="mongo icon hide-text">mongo</div>
                ) : null}
              </div>
              <div
                className="expand-close-indicator"
                onClick={this.toggleExpand}
              >
                <h6>{this.state.isExpanded ? 'Collapse' : 'Expand'}</h6>
                <div
                  className={`expand-close ${
                    this.state.isExpanded ? 'expanded' : ''
                  }`}
                />
              </div>
            </div>

            {this.state.isExpanded && (
              <div className="extra-information">
                {blockDependencies.map((dep, key) => (
                  <div key={key} className="row">
                    <div className="left">
                      <BlockIcon
                        icon={dep.iconImageName}
                        name={dep.name}
                        letterClass="large-letter-dependency"
                        defaultIcon={genericDependency}
                      />

                      <div className="text">
                        <h3>{dep.name}</h3>
                        <h6>{dep.description}</h6>
                      </div>
                    </div>

                    <div className="right">
                      <Tooltip
                        placement="top"
                        overlay={getKbTypeClass(dep.type)}
                        trigger="hover"
                        overlayClassName="kbtype"
                      >
                        <div
                          className={`type-icon ${getKbTypeClass(dep.type)}`}
                        />
                      </Tooltip>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : null}
      </div>
    )
  }
}

export default DependencyItem
