import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { filterArrayAndChildren, flattenNestedToIds } from 'helpers/arrayHelper'
import DeploymentConfigFormContainer from 'containers/dashboard/deployments/deploymentDependenciesConfig/DeploymentConfigFormContainer'
import DeploymentConfigSidebar from './deploymentDependenciesConfig/DeploymentConfigSidebar'

// TODO fix anchor and replace with buttons
/* eslint-disable jsx-a11y/anchor-is-valid */
class DeploymentDependenciesConfig extends Component {
  static propTypes = {
    deploymentId: PropTypes.string.isRequired,
    deploymentVersion: PropTypes.string.isRequired,
    envId: PropTypes.string.isRequired,
    dependencies: PropTypes.array.isRequired,
    getDefaults: PropTypes.func.isRequired
  }

  state = {
    filterText: '',
    activeTab: 'params',
    activeDependencies: {},
    itemToScrollTo: null
  }

  componentDidMount() {
    const {
      deploymentId,
      deploymentVersion,
      envId,
      filteredDependency
    } = this.props
    this.loadData(deploymentId, deploymentVersion, envId)
    this.props.environmentSelect(envId)
    if (filteredDependency) {
      this.setState({ filterText: `id:${filteredDependency}` })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.deploymentVersion !== nextProps.deploymentVersion ||
      this.props.envId !== nextProps.envId
    ) {
      this.loadData(
        nextProps.deploymentId,
        nextProps.deploymentVersion,
        nextProps.envId
      )
      this.props.environmentSelect(nextProps.envId)
    }
  }

  getFilteredDependencies() {
    const filter = this.state.filterText
    return filterArrayAndChildren(
      this.props.dependencies,
      'dependencies',
      item => {
        if (filter.startsWith('id:')) {
          return item['dependencyId'] === filter.substring(3)
        } else {
          return item['name'].toUpperCase().includes(filter.toUpperCase())
        }
      }
    )
  }

  getShownDependenciesIds() {
    const filteredDeps = this.getFilteredDependencies()
    return flattenNestedToIds(filteredDeps, 'dependencies', 'dependencyId')
  }

  getActiveFilteredDependencies(filteredDependencies) {
    const { activeDependencies } = this.state
    return filteredDependencies.map(d => {
      const dependencies = d.dependencies || []
      return {
        ...d,
        active: activeDependencies[d.dependencyId],
        dependencies: dependencies.map(cd => ({
          ...cd,
          active: activeDependencies[cd.dependencyId]
        }))
      }
    })
  }

  resetToKintoBlockDefaults = block => {
    const { dependencyId, blockId, version, type } = block

    this.props.getDefaults(blockId, dependencyId, version, type)
  }

  loadData = async (deploymentId, deploymentVersion, envId) => {
    await this.props.fetchDeployment(deploymentId, envId, deploymentVersion)
    this.props.fetchDeploymentDependenciesConfig(
      deploymentId,
      deploymentVersion,
      envId
    )
  }

  updateFilterText = text => {
    this.setState({ filterText: text })
  }

  showHardwareTab = () => {
    this.setState({ activeTab: 'hardware' })
  }

  showParamsTab = () => {
    this.setState({ activeTab: 'params' })
  }

  onChangeActive = (dependencyId, isShown) => {
    this.setState(oldState => ({
      activeDependencies: {
        ...oldState.activeDependencies,
        [dependencyId]: isShown
      }
    }))
  }

  onScrollToItem = dependencyId => {
    this.setState({
      itemToScrollTo: `${this.state.activeTab}-${dependencyId}`
    })
  }

  render() {
    const { deploymentId, deploymentVersion, envId, dependencies } = this.props
    const filteredDependencies = this.getFilteredDependencies()
    return (
      <div className="ka-dependencies-page">
        <div className="ka-config-dependencies">
          <div className="ka-config-header">
            <div className="left-side" />
            <ul className="right-side uppercase tab-list">
              <li>
                <a
                  onClick={this.showParamsTab}
                  className={this.state.activeTab === 'params' ? 'active' : ''}
                >
                  Environment Variables
                </a>
              </li>
              {/*
                <li>
                <a
                  onClick={this.showHardwareTab}
                  className={
                this.state.activeTab === 'hardware' ? 'active' : ''
                  }
                >
                  Hardware Requirements
                </a>
                </li>
              */}
            </ul>
          </div>
          <div className="ka-config-body">
            <div className="left-side">
              <DeploymentConfigSidebar
                list={this.getActiveFilteredDependencies(filteredDependencies)}
                filter={this.state.filterText}
                onUpdateFilter={this.updateFilterText}
                onScrollToItem={this.onScrollToItem}
              />
            </div>
            <div className="right-side">
              <DeploymentConfigFormContainer
                id={deploymentId}
                ver={deploymentVersion}
                env={envId}
                resetToKintoBlockDefaults={this.resetToKintoBlockDefaults}
                activeTab={this.state.activeTab}
                itemToScrollTo={this.state.itemToScrollTo}
                allDependenciesInfo={dependencies}
                shownDependenciesIds={this.getShownDependenciesIds()}
                onChangeActive={this.onChangeActive}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DeploymentDependenciesConfig
