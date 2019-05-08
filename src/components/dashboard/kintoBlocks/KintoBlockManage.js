import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Tooltip from 'rc-tooltip'
import PropTypes from 'prop-types'
import { pages } from 'constants/pages'
import { MICROSERVICE } from 'constants/kintoBlockTypes'
import { BRANCH } from 'constants/version'
import { KINTOBLOCK_STEPS_SUBSCRIPTION } from 'constants/graphql'
import { topOfPageContentsHeight } from 'constants/scrollConstants'
import { getPageUrl } from 'helpers/urlHelper'
import { getKbTypeClass } from 'helpers/kintoBlocksHelper'
import { getVersionType, getVersionName } from 'helpers/versionHelper'
import ComplexModal from '../../dashboard/ui/ComplexModal'
import SimpleModal from '../ui/SimpleModal'
import SaveBarPortal from '../../ui/SaveBarPortal'
import SideBarPortal from 'components/ui/SideBarPortal'
import KintoBlockManageSidebarContainer from 'containers/dashboard/kintoBlocks/KintoBlockManageSidebarContainer'
import Button from '../../forms/Button'
import KintoBlockManageFormContainer from 'containers/dashboard/kintoBlocks/kintoBlockManage/KintoBlockManageFormContainer'
import KintoBlockCreateTagModalContainer from 'containers/dashboard/kintoBlocks/kintoBlockManage/KintoBlockCreateTagModalContainer'
import KintoBlockBasicInfoModalContainer from 'containers/dashboard/kintoBlocks/kintoBlockManage/KintoBlockBasicInfoModalContainer'
import AddToDeploymentContainer from 'containers/dashboard/kintoBlocks/kintoBlockManage/AddToDeploymentContainer'

class KintoBlockManage extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    ver: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    kintoBlock: PropTypes.object.isRequired,
    isVersionMatch: PropTypes.bool.isRequired,
    resetForm: PropTypes.func.isRequired,
    fetchKintoBlock: PropTypes.func.isRequired,
    hasActiveBuild: PropTypes.bool.isRequired,
    selectedWorkspace: PropTypes.string.isRequired,
    hideCongratsModal: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    isCongratsModalShown: PropTypes.bool.isRequired,
    hasApiDoc: PropTypes.bool.isRequired,
    data: PropTypes.object,
    canSave: PropTypes.bool.isRequired
  }

  state = {
    isTagBuildOpen: false,
    buildToTag: null,
    isBasicInfoOpen: false,
    isAddToDeploymentOpen: false
  }

  componentDidMount() {
    const { id, ver, type, fetchKintoBlock, showNotification } = this.props
    fetchKintoBlock(id, ver, type).then(() => {
      if (!this.props.hasActiveBuild) {
        showNotification(
          'Kudos for creating a KintoBlock - head over to your repo source and start coding!'
        )
      }
    })
  }

  componentWillUnmount() {
    if (this.state.unsubscribe) {
      this.state.unsubscribe()
    }
  }

  componentWillReceiveProps(nextProps) {
    const { id, ver, type } = nextProps
    const hasBlockChanged =
      this.props.ver !== ver || this.props.id !== id || this.props.type !== type

    const { id: nextId, ver: nextVer, data: nextData } = nextProps
    this.receiveAndSubscribeBuilds(nextProps, hasBlockChanged)
    // MUST be called AFTER a change and sub/unsub happened
    this.props.kintoBlockStepsReceive(nextId, nextVer, nextData.buildSteps)

    if (hasBlockChanged) {
      this.props.resetForm()
      this.props.fetchKintoBlock(id, ver, type)
    }
  }

  receiveAndSubscribeBuilds = (props, hasBlockChanged) => {
    const { id, ver, data } = props
    const { unsubscribe } = this.state
    const isBranch = props.type.toUpperCase() === BRANCH
    // if url has change and was subscribed before then unsubscribe

    if (unsubscribe) {
      if (hasBlockChanged) {
        unsubscribe()
      } else {
        // if the sub is already established and no url/env change happened
        // the re-sub should NOT happen
        return
      }
    }

    // only add subscription if it is a branch and url has changed or
    // if its a branch and subscribe was never called (first load)
    if (isBranch) {
      const updatedUnsubscribe = data.subscribeToMore({
        document: KINTOBLOCK_STEPS_SUBSCRIPTION,
        variables: {
          kintoBlockId: id,
          kintoBlockVersionName: ver
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          const { buildStep } = subscriptionData.data
          switch (buildStep.mutation) {
            case 'CREATED': {
              return {
                buildSteps: [...previousResult.buildSteps, buildStep.node]
              }
            }
            case 'UPDATED':
              return {
                buildSteps: previousResult.buildSteps.map(
                  b => (b.id === buildStep.node.id ? buildStep.node : b)
                )
              }
            default:
              return previousResult
          }
        }
      })
      this.setState({ unsubscribe: updatedUnsubscribe })
    }
  }

  toggleBasicInfo = () => {
    this.setState(prevState => ({
      isBasicInfoOpen: !prevState.isBasicInfoOpen
    }))
  }

  onCreateTagOpen = build => {
    this.setState({ isTagBuildOpen: true, buildToTag: build })
  }

  onCreateTagClose = () => {
    this.setState({ isTagBuildOpen: false })
  }

  cancelAndHide = () => {
    this.props.hideCongratsModal()
  }

  openSuccessModal = () => {
    this.setState({
      isSuccessModalOpen: true
    })
  }

  toggleAddToDeployment = () => {
    this.setState(prevState => ({
      isAddToDeploymentOpen: !prevState.isAddToDeploymentOpen
    }))
  }

  scrollToSection = id => {
    const element = document.getElementById(id)
    const offsetTop = element.offsetTop - topOfPageContentsHeight
    window.scrollTo({ top: offsetTop, behavior: 'smooth' })
  }

  render() {
    const {
      kintoBlock,
      isVersionMatch,
      selectedWorkspace,
      isCongratsModalShown,
      hideCongratsModal,
      hasApiDoc,
      canSave
    } = this.props
    const isMicroservice = kintoBlock.type === MICROSERVICE
    if (!isVersionMatch) {
      return null
    }
    return (
      <div className="kintoblock-manage">
        <div className="page-title">
          <h2 onClick={this.toggleBasicInfo}>
            <Tooltip
              placement="top"
              overlay={getKbTypeClass(kintoBlock.type)}
              trigger="hover"
              overlayClassName="kbtype"
            >
              <span
                className={`icon type-icon ${getKbTypeClass(kintoBlock.type)}`}
              />
            </Tooltip>
            <span data-test="title">
              {`${kintoBlock.displayName} - ${getVersionName(
                kintoBlock.version.name
              )}`}
              <span className="icon edit" />
            </span>
          </h2>

          {isMicroservice &&
            hasApiDoc && (
              <Link
                to={getPageUrl(
                  pages.dashboardDocumentation,
                  {
                    workspaceId: selectedWorkspace,
                    id: kintoBlock.id,
                    version: kintoBlock.version.name,
                    type: getVersionType(kintoBlock.version)
                  },
                  null,
                  true
                )}
                className="button dark"
              >
                View Endpoints
              </Link>
            )}
        </div>

        <KintoBlockManageFormContainer
          kintoBlock={kintoBlock}
          onCreateTagOpen={this.onCreateTagOpen}
        />

        <ComplexModal
          component={KintoBlockCreateTagModalContainer}
          isOpen={this.state.isTagBuildOpen}
          onClose={this.onCreateTagClose}
          data={{
            kintoBlock,
            build: this.state.buildToTag
          }}
        />

        <ComplexModal
          isOpen={this.state.isBasicInfoOpen}
          onClose={this.toggleBasicInfo}
          component={KintoBlockBasicInfoModalContainer}
        />

        <SimpleModal
          options={{
            isOpen: isCongratsModalShown,
            className: 'onboarding',
            text: {
              title: '✅ Create Your First KintoBlock',
              subtitle: 'You just created your first KintoBlock. Hooray!',
              message:
                'Code in your favourite editor, commit on your repo source, then come back here to tag the commit.',
              cancelText: 'Amazing!',
              cancelClass: 'dark'
            },
            onClose: hideCongratsModal,
            image: {
              src: '/images/popup-create-kintoblock-success.svg',
              description: 'successfully created application infographic'
            }
          }}
        />

        <AddToDeploymentContainer
          isShown={this.state.isAddToDeploymentOpen}
          filterField="name"
        />

        <SideBarPortal>
          <KintoBlockManageSidebarContainer
            scrollToSection={this.scrollToSection}
          />
        </SideBarPortal>

        {!canSave && (
          <SaveBarPortal>
            <Button
              data-test="create-tag-button"
              type="button"
              onClick={this.toggleAddToDeployment}
            >
              Add to Deployment
            </Button>
          </SaveBarPortal>
        )}
      </div>
    )
  }
}

export default KintoBlockManage
