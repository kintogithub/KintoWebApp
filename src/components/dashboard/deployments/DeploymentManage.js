import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DEPLOYMENT_WORKFLOW_SUBSCRIPTION } from 'constants/graphql'
import VerifyEmailPopup from './deploymentManage/VerifyEmailPopup'
import DeploymentFormContainer from 'containers/dashboard/deployments/DeploymentFormContainer'
import DeploymentManageSidebarContainer from 'containers/dashboard/deployments/DeploymentManageSidebarContainer'
import DeploymentTagAndDeployFormContainer from 'containers/dashboard/deployments/DeploymentTagAndDeployFormContainer'
import ShutDownModal from './deploymentManage/ShutDownModal'
import DeploymentBasicInfoModalContainer from 'containers/dashboard/deployments/deploymentManage/DeploymentBasicInfoModalContainer'
import SideBarPortal from 'components/ui/SideBarPortal'
import CopyButton from 'components/forms/CopyButton'
import ComplexModal from '../ui/ComplexModal'
import SimpleModal from '../ui/SimpleModal'

class DeploymentManage extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    envId: PropTypes.string.isRequired,
    version: PropTypes.object,
    deployment: PropTypes.object.isRequired,
    fetchDeployment: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    deployValidation: PropTypes.object,
    isEmailVerified: PropTypes.bool.isRequired,
    hasOnlyExampleBlocks: PropTypes.bool.isRequired,
    hasLiveEnvironments: PropTypes.bool.isRequired,
    selectedEnvironmentId: PropTypes.string,
    getDeploymentEnvironment: PropTypes.func.isRequired,
    environment: PropTypes.object.isRequired,
    liveEnvInfo: PropTypes.object.isRequired,
    versionText: PropTypes.string.isRequired,
    isCongratsModalShown: PropTypes.bool.isRequired,
    hasWorkflowFailed: PropTypes.bool,
    isVersionMatch: PropTypes.bool,
    hideCongratsModal: PropTypes.func.isRequired,
    preFillInformation: PropTypes.object
  }

  state = {
    isVersionModalOpen: false,
    isEmailVerificationPopUpShown: false,
    isShutDownModalOpen: false,
    isBasicInfoOpen: false,
    unsubscribe: null
  }

  async componentDidMount() {
    const { id, envId, data } = this.props
    await this.props.fetchDeployment(id, envId)
    this.props.getDeploymentEnvironment(envId, id)

    // the graphql data could be cached need to setup the subscription
    if (!data.loading) {
      this.receiveAndSubscribeWorkflows(this.props)
    }
  }

  componentWillUnmount(data) {
    if (this.state.unsubscribe) {
      this.state.unsubscribe()
    }
  }

  componentWillReceiveProps(nextProps) {
    const { id, envId, data } = nextProps

    const hasDeploymentOrEnvironmentChanged =
      this.props.envId !== envId || this.props.id !== id

    if (hasDeploymentOrEnvironmentChanged) {
      this.props.resetForm()
      this.props.fetchDeployment(id, envId)
      this.props.getDeploymentEnvironment(envId, id)
    }

    const hasWorkflowChanged =
      data.deploymentSteps !== this.props.data.deploymentSteps

    if (hasWorkflowChanged || hasDeploymentOrEnvironmentChanged) {
      this.receiveAndSubscribeWorkflows(
        nextProps,
        hasDeploymentOrEnvironmentChanged
      )
      // MUST be called AFTER a change and sub/unsub happened
      this.props.deploymentWorkflowReceive(data.deploymentSteps, id, envId)
      this.props.refetchEnvStatus()
    }
  }

  receiveAndSubscribeWorkflows = (
    props,
    hasDeploymentOrEnvironmentChanged = false
  ) => {
    const { unsubscribe } = this.state
    const { id, envId, data } = props

    if (unsubscribe) {
      if (hasDeploymentOrEnvironmentChanged) {
        unsubscribe()
      } else {
        // if the sub is already established and no url/env change happened
        // the re-sub should NOT happen
        return
      }
    }

    const updatedUnsubscribe = data.subscribeToMore({
      document: DEPLOYMENT_WORKFLOW_SUBSCRIPTION,
      variables: {
        deploymentId: id,
        environmentId: envId
      },
      updateQuery: (previousResult, { subscriptionData }) => {
        const { deploymentStep } = subscriptionData.data
        switch (deploymentStep.mutation) {
          case 'CREATED': {
            const newSteps = {
              deploymentSteps: [
                ...previousResult.deploymentSteps,
                deploymentStep.node
              ]
            }
            this.props.deploymentWorkflowReceive(
              newSteps.deploymentSteps,
              id,
              envId
            )
            return newSteps
          }
          case 'UPDATED': {
            const newSteps = {
              deploymentSteps: previousResult.deploymentSteps.map(dep =>
                dep.id === deploymentStep.node.id ? deploymentStep.node : dep
              )
            }
            this.props.deploymentWorkflowReceive(
              newSteps.deploymentSteps,
              id,
              envId
            )
            return newSteps
          }
          default:
            return previousResult
        }
      }
    })
    this.setState({ unsubscribe: updatedUnsubscribe })
  }

  toggleShutDownModal = () => {
    this.setState(prevState => ({
      isShutDownModalOpen: !prevState.isShutDownModalOpen
    }))
  }

  shutDownEnv = async () => {
    await this.props.shutDownEnvironment()
    this.toggleShutDownModal()
  }

  onVersionModalClose = () => {
    this.setState({ isVersionModalOpen: false })
  }

  toggleBasicInfo = () => {
    this.setState(prevState => ({
      isBasicInfoOpen: !prevState.isBasicInfoOpen
    }))
  }

  closeEmailVerificationPopup = () => {
    this.setState({ isEmailVerificationPopUpShown: false })
  }

  onVersionModalOpen = () => {
    const {
      deployValidation,
      showDeployLimitError,
      isEmailVerified,
      hasOnlyExampleBlocks,
      hasLiveEnvironments
    } = this.props
    if (!deployValidation.isValid && !hasLiveEnvironments) {
      showDeployLimitError()
    } else if (!isEmailVerified && !hasOnlyExampleBlocks) {
      this.setState({ isEmailVerificationPopUpShown: true })
    } else {
      this.setState({ isVersionModalOpen: true })
    }
  }

  scrollToSection = id => {
    const element = document.getElementById(id)
    const offsetTop = element.offsetTop - 120
    window.scrollTo({ top: offsetTop, behavior: 'smooth' })
  }

  render() {
    const {
      deployment,
      environment,
      // isVersionMatch,
      liveEnvInfo,
      versionText,
      isCongratsModalShown,
      hideCongratsModal,
      hasWorkflowFailed,
      preFillInformation,
      grafanaUrl
    } = this.props
    // if (!isVersionMatch) {
    //   return null
    // }
    // this is commented till the version object returned matches the current version in an environment

    return (
      <div className="deployment-manage">
        <div className="page-title">
          <div>
            <h2>
              {deployment.name} - {environment.name}
              <span onClick={this.toggleBasicInfo} className="icon edit" />
            </h2>
            <div className="environment-information">
              <div className="inner-env-information">
                <h5 className="bold">
                  Client ID: <span>{environment.clientId}</span>
                </h5>
                <CopyButton type="outline" text={environment.clientId} />
              </div>
              <div className="inner-env-information">
                <h5 className="bold">
                  Secret Key: <span>{environment.secret}</span>
                </h5>
                <CopyButton type="outline" text={environment.secret} />
              </div>
            </div>
          </div>
          <div className={`buttons ${!liveEnvInfo.isLive ? 'two' : ''}`}>
            <a href={grafanaUrl} className="secondary button">
              Metrics
            </a>
            {liveEnvInfo.isLive && (
              <button
                className="dark button"
                onClick={this.toggleShutDownModal}
              >
                Shut Down
              </button>
            )}
          </div>
        </div>
        {hasWorkflowFailed && (
          <div className="failed-deployment">
            <div className="text">
              Deployment {deployment.version.name} to {environment.name}{' '}
              environment failed. Please check and try again.
            </div>
            <div className="image">
              <img src="/images/icon-status-failed.svg" alt="failed icon" />
            </div>
          </div>
        )}
        <DeploymentFormContainer
          deployment={deployment}
          version={versionText}
          isCreate={false}
          preFillInformation={preFillInformation}
        />

        <ComplexModal
          className="tag-and-deploy-modal"
          component={DeploymentTagAndDeployFormContainer}
          isOpen={this.state.isVersionModalOpen}
          onClose={this.onVersionModalClose}
          data={{
            id: deployment.id,
            title: deployment.name,
            environments: deployment.environments,
            deployment: deployment
          }}
        />
        <ComplexModal
          className="verify-modal"
          component={VerifyEmailPopup}
          isOpen={this.state.isEmailVerificationPopUpShown}
          onClose={this.closeEmailVerificationPopup}
        />
        <ComplexModal
          isOpen={this.state.isShutDownModalOpen}
          onClose={this.toggleShutDownModal}
          data={{ environment }}
          actions={{ shutDownEnv: this.shutDownEnv }}
          component={ShutDownModal}
        />
        <ComplexModal
          isOpen={this.state.isBasicInfoOpen}
          onClose={this.toggleBasicInfo}
          component={DeploymentBasicInfoModalContainer}
        />

        <SimpleModal
          options={{
            isOpen: isCongratsModalShown,
            className: 'onboarding',
            text: {
              title: '✅ Create Your First Deployment & Deploy It',
              subtitle:
                'You just created & deployed your first deployment. Omigawd!',
              message:
                'You’ve been taken to the details page with instructions on how to talk to it.',
              cancelText: 'Amazing!',
              cancelClass: 'dark'
            },
            onClose: hideCongratsModal,
            image: {
              src: '/images/popup-create-application-success.svg',
              description: 'successfully created deployment infographic'
            }
          }}
        />

        <SideBarPortal>
          <DeploymentManageSidebarContainer
            scrollToSection={this.scrollToSection}
          />
        </SideBarPortal>
      </div>
    )
  }
}

export default DeploymentManage
