import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import iscroll from 'iscroll'
import ReactIScroll from 'react-iscroll'
import PropTypes from 'prop-types'
import { pages } from 'constants/pages'
import { getPageUrl } from 'helpers/urlHelper'
import AddNewEnvironmentForm from './deploymentManageSidebar/AddNewEnvironmentForm'
import SideBarList from '../../ui/ContextualSidebar/SideBarList'
import ComplexModal from '../ui/ComplexModal'
import SimpleModal from 'components/dashboard/ui/SimpleModal'

class DeploymentManageSidebar extends Component {
  static propTypes = {
    environments: PropTypes.array.isRequired,
    deployment: PropTypes.object.isRequired,
    selectedDeploymentId: PropTypes.string,
    selectedEnvironmentId: PropTypes.string,
    selectedWorkspace: PropTypes.string.isRequired,
    topPageItem: PropTypes.string,
    reorderEnvironments: PropTypes.func.isRequired,
    addNewEnvironment: PropTypes.func.isRequired,
    deployEnvironmentFromTag: PropTypes.func.isRequired,
    scrollToSection: PropTypes.func,
    isSimple: PropTypes.bool
  }

  state = {
    isDeploymentModalOpen: false,
    showAddEnvironmentButton: false,
    isPromoteModalOpen: false,
    promoteEnvironmentIndex: null,
    promoteVersion: null
  }

  toggleDeploymentModal = () => {
    this.setState(prevState => ({
      isDeploymentModalOpen: !prevState.isDeploymentModalOpen
    }))
  }

  goToEnvironment = id => {
    const { deployment, selectedWorkspace, push } = this.props
    const url = getPageUrl(pages.dashboardDeploymentsManage, {
      workspaceId: selectedWorkspace,
      id: deployment.id,
      envId: id
    })
    push(url)
    this.scrollEnvironmentToTop(id)
  }

  scrollEnvironmentToTop = id => {
    const iscroll = this.scrollArea.getIScroll()

    iscroll.refresh()
    setTimeout(() => {
      iscroll.scrollToElement(`#ID-${id}`, 200, 0, -50)
    }, 0)

    iscroll.on('scrollEnd', () => {
      this.setState({
        showAddEnvironmentButton: iscroll.y < 0
      })
    })
  }

  onEnvironmentSort = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      this.props.reorderEnvironments(
        this.props.deployment.id,
        oldIndex,
        newIndex
      )
    }
  }

  showPromoteModal = (envIndex, version) => {
    this.setState({
      isPromoteModalOpen: true,
      promoteVersion: version,
      promoteEnvironmentIndex: envIndex
    })
  }

  hidePromoteModal = () => {
    this.setState({
      isPromoteModalOpen: false,
      promoteVersion: null,
      promoteEnvironmentIndex: null
    })
  }

  deployPromotedEnvironment = () => {
    const { deployment, environments, deployEnvironmentFromTag } = this.props
    const { promoteVersion, promoteEnvironmentIndex } = this.state

    const env = environments[promoteEnvironmentIndex]
    deployEnvironmentFromTag(
      deployment.id,
      env.environmentId,
      promoteVersion
    ).then(this.hidePromoteModal)
  }

  getPromoteModalText() {
    const { promoteVersion, promoteEnvironmentIndex } = this.state
    if (!promoteVersion || isNaN(promoteEnvironmentIndex)) {
      return {}
    }
    const env = this.props.environments[promoteEnvironmentIndex]
    return {
      title: `Promote ${env.name}`,
      message: `Promote ${env.name} to ${promoteVersion}`,
      cancelText: 'Cancel',
      cancelClass: 'secondary',
      confirmText: 'Deploy'
    }
  }

  render() {
    const {
      environments,
      addNewEnvironment,
      deployment,
      selectedWorkspace,
      selectedEnvironmentId,
      topPageItem,
      scrollToSection,
      isSimple
    } = this.props

    const backUrl = getPageUrl(pages.dashboardDeploymentsList, {
      workspaceId: selectedWorkspace
    })
    return (
      <div className="deployment-environment-sidebar">
        <div className="top-fixed">
          <Link to={backUrl} className="return-link">
            <img src="/images/icon-nav-back.svg" alt="" />
            Back to Main Menu
          </Link>
          <div className="line" />
          <div className="title">
            Environments ({environments.length}){' '}
            <div
              onClick={this.toggleDeploymentModal}
              className={`icon plus ${
                this.state.showAddEnvironmentButton ? '' : 'hide'
              }`}
            />
          </div>
        </div>

        <div className="contextual-sidebar-list">
          <ReactIScroll
            iScroll={iscroll}
            ref={iscroll => (this.scrollArea = iscroll)}
            options={{
              scrollbars: true,
              mouseWheel: true,
              fadeScrollbars: true,
              shrinkScrollbars: 'scale',
              interactiveScrollbars: true,
              disableTouch: true,
              disablePointer: true,
              disableMouse: true
            }}
          >
            <SideBarList
              list={environments}
              topPageItem={topPageItem}
              selectedItemId={selectedEnvironmentId}
              goToItem={this.goToEnvironment}
              onOpenForm={this.toggleDeploymentModal}
              onMiniNavigationClick={scrollToSection}
              onSortEnd={this.onEnvironmentSort}
              useDragHandle={true}
              isDraggable={true}
              onPromote={this.showPromoteModal}
              isSimple={isSimple}
              isDeployment={true}
            />
          </ReactIScroll>
        </div>

        <ComplexModal
          component={AddNewEnvironmentForm}
          isOpen={this.state.isDeploymentModalOpen}
          onClose={this.toggleDeploymentModal}
          actions={{ addNewEnvironment }}
          data={{ deployment }}
        />

        <SimpleModal
          options={{
            isOpen: this.state.isPromoteModalOpen,
            text: this.getPromoteModalText(),
            onConfirm: this.deployPromotedEnvironment,
            onClose: this.hidePromoteModal
          }}
        />
      </div>
    )
  }
}

export default DeploymentManageSidebar
