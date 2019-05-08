import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { pages } from 'constants/pages'
import SimpleModal from './ui/SimpleModal'
import { Button } from '../forms'
import { Mixpanel } from 'helpers/tracking/Mixpanel'

class Index extends Component {
  static propTypes = {
    percentageProgress: PropTypes.number.isRequired,
    progress: PropTypes.object.isRequired,
    startDocumentationStep: PropTypes.func.isRequired,
    goToCreate: PropTypes.func.isRequired,
    isCongratsModalShown: PropTypes.bool.isRequired,
    hideCongratsModal: PropTypes.func.isRequired
  }

  state = {
    showNextWelcomeModal: false,
    showKAModal: false,
    showKBModal: false,
    showWSModal: false,
    showCakeModal: false,
    showWSJoinedModal: false,
    workspaceName: ''
  }

  componentDidMount() {
    if (this.props.workspaceInviteToken) {
      this.props.validateWorkspaceInvite().then(workspaceName => {
        this.setState({
          showWSJoinedModal: true,
          workspaceName
        })
      })
    }
    this.track()
  }

  showNextWelcome = () => {
    this.props.hideCongratsModal()
    this.setState({ showNextWelcomeModal: true })
  }

  closeNextWelcome = () => {
    this.setState({ showNextWelcomeModal: false })
  }

  nextWelcomeStart = () => {
    this.setState({ showKAModal: true }, () => this.closeNextWelcome())
  }

  toggleCakeModal = () => {
    this.setState(prevState => ({
      showCakeModal: !prevState.showCakeModal
    }))
  }

  toggleKAModal = () => {
    this.setState(prevState => ({
      showKAModal: !prevState.showKAModal
    }))
  }

  toggleKBModal = () => {
    this.setState(prevState => ({
      showKBModal: !prevState.showKBModal
    }))
  }

  toggleWSModal = () => {
    this.setState(prevState => ({
      showWSModal: !prevState.showWSModal
    }))
  }

  toggleWSJoinedModal = () => {
    this.setState(prevState => ({
      showWSJoinedModal: !prevState.showWSJoinedModal
    }))
  }

  track = () => {
    if (this.props.isCongratsModalShown) {
      Mixpanel.alias(this.props.email)
    }
  }

  render() {
    const {
      percentageProgress,
      progress,
      startDocumentationStep,
      goToCreate,
      isCongratsModalShown,
      hideCongratsModal,
      validatedEmail,
      resendVerificationEmail
    } = this.props
    return (
      <div data-test="dashboard-index-page" className="dashboard-home">
        <h2>Welcome to KintoHub.</h2>
        <h5>
          The coding adventure awaits! Here are a few things you can start with:
        </h5>

        {!validatedEmail && (
          <div className="verification-warning">
            <div className="left">
              <p className="bold">
                Please verify your email address to unlock every feature on
                KintoHub
              </p>
              <p>
                If you can't find the verification email, click the "Resend
                Email"
              </p>
            </div>
            <div className="right">
              <button
                className="dark button"
                onClick={() => resendVerificationEmail()}
              >
                Resend Email
              </button>
              <span className="icon email" />
            </div>
          </div>
        )}

        <div className="onboarding-progress">
          <div className="left">
            <div
              className={`percentage-progress progress-${percentageProgress}`}
            />
          </div>

          <div className="right">
            <div className="top">
              <div
                className={`check ${
                  percentageProgress === 100 ? 'checked' : ''
                }`}
              />
              <h2>
                <span role="img" className="emoji" aria-label="cake emoji">
                  🎂
                </span>{' '}
                Complete all objectives for a cake!
              </h2>
              <Button
                className={`default button ${
                  percentageProgress === 100 ? '' : 'disabled'
                }`}
                disabled={percentageProgress !== 100}
                onClick={this.toggleCakeModal}
              >
                Claim
              </Button>
            </div>
            <div className="bottom">
              <ul className="unstyled-list">
                <li>
                  <div
                    className={`check ${progress.deployments ? 'checked' : ''}`}
                  />
                  <h3>
                    <span
                      role="img"
                      className="emoji"
                      aria-label="woman on laptop emoji"
                    >
                      👩🏽‍💻
                    </span>{' '}
                    Create your first <span className="bold">deployment</span> &
                    deploy it{' '}
                  </h3>
                  <a
                    href="https://docs.kintohub.com/docs/kintoapps"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="go to our creating an deployment documentation"
                  >
                    <span className="tooltip" />
                  </a>
                  <button
                    className="button secondary"
                    onClick={this.toggleKAModal}
                  >
                    Start
                  </button>
                </li>
                <li>
                  <div
                    className={`check ${progress.kintoBlocks ? 'checked' : ''}`}
                  />
                  <h3>
                    <span
                      role="img"
                      className="emoji"
                      aria-label="diamond emoji"
                    >
                      💎
                    </span>{' '}
                    Create your first <span className="bold">KintoBlock</span>
                  </h3>
                  <a
                    href="https://docs.kintohub.com/docs/kintoblocks"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="go to our creating a kintoblock documentation"
                  >
                    <span className="tooltip" />
                  </a>
                  <button
                    className="button secondary"
                    onClick={() => this.toggleKBModal()}
                  >
                    Start
                  </button>
                </li>
                <li>
                  <div
                    className={`check ${progress.workspaces ? 'checked' : ''}`}
                  />
                  <h3>
                    <span
                      role="img"
                      className="emoji"
                      aria-label="dancers emoji"
                    >
                      👯
                    </span>{' '}
                    Create a <span className="bold">workspace</span> to
                    collaborate
                  </h3>
                  <a
                    href="https://docs.kintohub.com/docs/workspaces"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="go to our creating a workspace documentation"
                  >
                    <span className="tooltip" />
                  </a>
                  <button
                    className="button secondary"
                    onClick={() => this.toggleWSModal()}
                  >
                    Start
                  </button>
                </li>
                <li>
                  <div
                    className={`check ${
                      progress.documentation ? 'checked' : ''
                    }`}
                  />
                  <h3>
                    <span
                      role="img"
                      className="emoji"
                      aria-label="stack of books emoji"
                    >
                      📚
                    </span>{' '}
                    Check out our <span className="bold">documentation</span>
                  </h3>
                  <button
                    aria-label="go to our documentation"
                    className="button secondary"
                    onClick={startDocumentationStep}
                  >
                    Start
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <a
          href="https://github.com/kintohub"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="icon github" />
          Visit Our GitHub
        </a>
        <a
          href="https://join.slack.com/t/kintohub/shared_invite/enQtMzIxNDU2OTE4NTYyLWJmNWM1ZTQ3YTFlMzJkYWUzMWE2ZTlmZjk3ZGQ1NWFlMDRkYzhhODNmNDZlMDZmNjhlMzBhNWRiYWIxMTVjMmU"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="icon slack" />
          Join Our Slack Community
        </a>
        <SimpleModal
          options={{
            isOpen: isCongratsModalShown,
            onClose: hideCongratsModal,
            className: 'onboarding',
            onConfirm: this.showNextWelcome,
            text: {
              title: 'Welcome to KintoHub',
              subtitle:
                'We can’t wait to reshape the microservices landscape with you.',
              message: 'It’s developers like you that make us who we are.',
              confirmText: 'Start',
              cancelText: 'Skip Tutorial',
              cancelClass: 'secondary',
              confirmClass: 'dark'
            },
            image: {
              src: '/images/popup-welcome.svg',
              description: 'welcome to kintohub infographic'
            }
          }}
        />
        <SimpleModal
          options={{
            isOpen: this.state.showNextWelcomeModal,
            onClose: this.closeNextWelcome,
            className: 'onboarding',
            onConfirm: this.nextWelcomeStart,
            text: {
              title: 'The Basics',
              subtitle: 'Let’s start with the basics…',
              message:
                'You build KintoBlocks (microservices), add them to deployments, deploy them then call the APIs.',
              confirmText: 'Next',
              cancelText: 'Skip Tutorial',
              cancelClass: 'secondary',
              confirmClass: 'dark'
            },
            image: {
              src: '/images/popup-basics.svg',
              description: 'kintohub basics infographic'
            }
          }}
        />
        <SimpleModal
          options={{
            isOpen: this.state.showKAModal,
            onClose: this.toggleKAModal,
            className: 'onboarding',
            onConfirm: () => goToCreate(pages.dashboardDeploymentsCreate),
            text: {
              title: '👩‍💻 Create Your First Deployment & Deploy It',
              subtitle:
                'An example KintoBlock (microservices) has been added to help you.',
              message: 'Now you try creating an deployment…',
              confirmText: 'Create New Deployment',
              cancelText: 'Skip Tutorial',
              cancelClass: 'secondary'
            },
            image: {
              src: '/images/popup-create-application.svg',
              description: 'create deployment infographic'
            }
          }}
        />
        <SimpleModal
          options={{
            isOpen: this.state.showKBModal,
            onClose: this.toggleKBModal,
            className: 'onboarding',
            onConfirm: () => goToCreate(pages.dashboardKintoBlocksCreate),
            text: {
              title: '💎  Create Your First KintoBlock',
              subtitle:
                'We’ve made it really easy to make your own microservices.',
              message:
                'Now you try creating a KintoBlock (microservice) yourself…',
              confirmText: 'Create New KintoBlock',
              cancelText: 'Skip Tutorial',
              cancelClass: 'secondary'
            },
            image: {
              src: '/images/popup-create-kintoblock.svg',
              description: 'create kintoblock infographic'
            }
          }}
        />
        <SimpleModal
          options={{
            isOpen: this.state.showWSModal,
            onClose: this.toggleWSModal,
            onConfirm: () => goToCreate(pages.workspaceCreate),
            className: 'onboarding',
            text: {
              title: 'Create a Workspace to Collaborate',
              subtitle:
                'You already have a Personal Workspace for your private projects.',
              message:
                'Now you try creating an new workspace for collaborations…',
              confirmText: 'Create New Workspace',
              cancelText: 'Skip Tutorial',
              cancelClass: 'secondary'
            },
            image: {
              src: '/images/popup-create-workspace.svg',
              description: 'create kintoblock infographic'
            }
          }}
        />
        <SimpleModal
          options={{
            isOpen: this.state.showCakeModal,
            onClose: this.toggleCakeModal,
            className: 'onboarding',
            text: {
              title: '🎂 All Objectives Completed',
              subtitle: 'The cake is a lie...',
              message:
                'But hey, now you know the basics of KintoHub! Yayyyy, right?',
              cancelText: 'Alright, I guess?',
              cancelClass: 'dark'
            },
            toolTip: {
              text: 'What does it mean?',
              link: 'http://knowyourmeme.com/memes/the-cake-is-a-lie'
            },
            image: {
              src: '/images/popup-cake.svg',
              description: 'the cake is a lie infographic'
            }
          }}
        />
        {/* TODO: update modal to correct modal */}
        <SimpleModal
          options={{
            isOpen: this.state.showWSJoinedModal,
            onClose: this.toggleWSJoinedModal,
            className: 'onboarding',
            text: {
              title: `Welcome to "${this.state.workspaceName}" Workspace`,
              message:
                'Now you can work on the same projects with other members of this workspace.',
              subtitle: `You've joined the workspace "${
                this.state.workspaceName
              }".`,
              cancelText: 'Got It',
              cancelClass: 'dark'
            },
            image: {
              src: '/images/popup-create-workspace-success.svg',
              description: 'successfully joined workspace infographic'
            }
          }}
        />
      </div>
    )
  }
}
export default Index
