import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  genericKintoApp,
  genericDependency,
  genericDependencyWithBorder
} from 'constants/genericIcons'
import { DEPLOYMENT } from 'constants/deletionConstants'
import { isProduction } from 'helpers/pageHelper'
import { truncate } from 'helpers/stringHelper'
import DropDown from '../../../ui/DropDown'
import ComplexModal from '../../ui/ComplexModal'
import DeletionModal from '../DeletionModal'

class DeploymentCard extends Component {
  static propTypes = {
    deployment: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired,
    dropdownId: PropTypes.string.isRequired,
    dropdownDependencyId: PropTypes.string.isRequired,
    goToDraft: PropTypes.func.isRequired,
    goToDependencyManage: PropTypes.func.isRequired,
    deploymentDependencies: PropTypes.array.isRequired,
    currentLiveEnvironments: PropTypes.array.isRequired,
    deleteDeployment: PropTypes.func.isRequired
  }

  state = {
    areDependenciesShown: false,
    isDeletionModalShown: false
  }

  showDependencyDropdown = e => {
    e.preventDefault()
    this.setState({ areDependenciesShown: true })
  }

  hideDependencyDropdown = () => {
    this.setState({ areDependenciesShown: false })
  }

  toggleDeletionModal = () => {
    this.setState(prevState => ({
      isDeletionModalShown: !prevState.isDeletionModalShown
    }))
  }

  render() {
    const {
      deployment,
      dropdownId,
      dropdownDependencyId,
      url,
      goToDraft,
      goToDependencyManage,
      deploymentDependencies,
      goToChangelog,
      currentLiveEnvironments,
      deleteDeployment
    } = this.props
    return (
      <>
        <Link
          to={url}
          className="kintoapp coral"
          data-test={`ka-card-${dropdownId}`}
        >
          <div className="top">
            <div className="text">
              <div className="left">
                <div className="image-and-letter">
                  <img
                    src={`/images/${deployment.iconImageName ||
                      genericKintoApp}`}
                    alt=""
                  />
                  <h1 className="large-letter">
                    {truncate(deployment.name, 1)}
                  </h1>
                </div>
              </div>
              <div className="right">
                {currentLiveEnvironments.slice(0, 2).map((env, key) => (
                  <div className="env-item" key={key}>
                    <div className="env-item-ver">{env.deploymentVersion}</div>
                    <div className="env-item-tag">
                      <div>{env.name}</div>
                    </div>
                  </div>
                ))}
                {currentLiveEnvironments.length > 2 ? (
                  <div className="env-item">
                    <div className="env-item-ver">-</div>
                    <div className="env-item-tag">
                      <div>+{currentLiveEnvironments.length - 2}</div>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="name-and-tag">
                <h3 className="name">{deployment.name}</h3>
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
                    Dependencies ({deployment.dependencies.length})
                  </h4>

                  <div className="line" />

                  {deploymentDependencies.map((k, index) => (
                    <button
                      onClick={() => goToDependencyManage(k.url)}
                      type="button"
                      key={index}
                    >
                      <div className="dependency">
                        <img
                          src={`/images/${k.iconImageName ||
                            genericDependency}`}
                          alt="dependency icon"
                        />
                        <h3 className="large-letter-dependency">
                          {truncate(k.name, 1)}
                        </h3>
                      </div>
                      <h5>{k.name}</h5>
                    </button>
                  ))}
                </DropDown>
                <div
                  className="applications"
                  onClick={this.showDependencyDropdown}
                >
                  {deploymentDependencies.slice(0, 4).map((d, i) => (
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

                  {deploymentDependencies.length > 4 && (
                    <div className="dependency number">
                      +{deployment.dependencies.length - 4}
                    </div>
                  )}
                </div>
              </div>

              <div className="right">
                <DropDown type="simple" dropdownClass="menu" id={dropdownId}>
                  <button onClick={goToDraft} type="button">
                    Edit Deployment
                  </button>
                  <button onClick={this.toggleDeletionModal} type="button">
                    Delete Deployment
                  </button>

                  {!isProduction() ? (
                    <button onClick={goToChangelog} type="button">
                      Compare Versions
                    </button>
                  ) : null}
                </DropDown>
              </div>
            </div>
          </div>
        </Link>
        <ComplexModal
          component={DeletionModal}
          isOpen={this.state.isDeletionModalShown}
          className="deletion-modal"
          onClose={this.toggleDeletionModal}
          actions={{ deleteItem: deleteDeployment }}
          data={{
            item: deployment,
            type: DEPLOYMENT
          }}
        />
      </>
    )
  }
}

export default DeploymentCard
