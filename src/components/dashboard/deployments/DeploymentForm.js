import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { FormError, FieldValidation } from '../../forms'
import { isLessThan200 } from 'helpers/forms/validators'
import { kintoName } from 'helpers/forms/validationFields'
import SaveBarPortal from 'components/ui/SaveBarPortal'
import {
  blocks,
  status,
  accessApi,
  deleteSection,
  deploymentScrollMarkers
} from 'constants/scrollMarkers'
import { ENVIRONMENT } from 'constants/deletionConstants'
import Toggle from 'components/forms/Toggle'
import ComplexModal from '../ui/ComplexModal'
import DeletionModal from './DeletionModal'
import ManageDependenciesFieldContainer from 'containers/dashboard/ui/ManageDependenciesFieldContainer'
import WorkspaceToolbarContainer from 'containers/dashboard/ui/WorkspaceToolbarContainer'
import StatusAndHistoryContainer from 'containers/dashboard/deployments/deploymentForm/StatusAndHistoryContainer'
import AccessYourApiContainer from 'containers/dashboard/deployments/deploymentForm/AccessYourApiContainer'

class DeploymentForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    version: PropTypes.string,
    appDependencies: PropTypes.array,
    deployment: PropTypes.object,
    environment: PropTypes.object,
    isCreate: PropTypes.bool.isRequired,
    canSave: PropTypes.bool.isRequired,
    error: PropTypes.string,
    preFillInformation: PropTypes.object,
    allowSave: PropTypes.func.isRequired,
    deleteEnvironment: PropTypes.func.isRequired
  }

  state = {
    isDeletionModalShown: false
  }

  componentDidMount() {
    const { preFillInformation, fetchKintoBlockDependenciesData } = this.props

    this.props.initialize(this.props.initialValues)

    window.addEventListener('scroll', this.handleScroll)

    this.props.initializeTopPageItem()

    if (
      this.props.preFillInformation &&
      this.props.preFillInformation.isPrefilled
    ) {
      this.props.allowSave()

      fetchKintoBlockDependenciesData(
        preFillInformation.kintoBlockId,
        preFillInformation.kintoBlockVersion,
        preFillInformation.kintoBlockVersionType
      )
    }
  }

  handleScroll = event => {
    const positionedMarkers = deploymentScrollMarkers
      .map(item => {
        const element = document.getElementById(item.id)
        let topOffset = 0
        if (element) {
          topOffset = element.getBoundingClientRect().top
        }
        return { ...item, offset: topOffset }
      })
      .filter(item => item.offset > 0)
      .sort((a, b) => {
        return a.offset - b.offset
      })

    const topItem = positionedMarkers.length
      ? positionedMarkers[0].id
      : deploymentScrollMarkers[deploymentScrollMarkers.length - 1].id

    if (this.props.topPageItem === topItem) {
      return
    } else {
      this.props.setTopPageItem(topItem)
    }
  }

  toggleDeletionModal = () => {
    this.setState(prevState => ({
      isDeletionModalShown: !prevState.isDeletionModalShown
    }))
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  render() {
    const {
      handleSubmit,
      version,
      environment,
      appDependencies,
      deployment,
      isCreate,
      canSave,
      pristineSubmit,
      error,
      preFillInformation,
      deleteEnvironment
    } = this.props
    return (
      <div>
        <form
          className="kintoapp-create form-container"
          onSubmit={handleSubmit}
          data-test="ka-form"
        >
          <div className="form-wrapper workspaces">
            <WorkspaceToolbarContainer
              isDeployment={true}
              kintoItem={deployment}
              isCreate={isCreate}
            />
          </div>

          {isCreate && (
            <div className="form-wrapper basic-info">
              <h3 className="title">Basic Info</h3>
              <h5>
                Choose the name for this deployment and give a a short
                description.
              </h5>
              <div className="form-body">
                <Field
                  name="name"
                  label="deployment name"
                  placeholder="Enter the deployment name"
                  component={FieldValidation}
                  validate={kintoName}
                  type="text"
                  tutorialPosition="left"
                />
                <Field
                  characterCount={200}
                  name="shortDescription"
                  label="Description"
                  placeholder="Enter a short description"
                  component={FieldValidation}
                  validate={isLessThan200}
                  type="textarea"
                  tutorialPosition="left"
                  isOptional={true}
                />
                <Field
                  name="environmentName"
                  label="Environment name"
                  component={FieldValidation}
                  validate={kintoName}
                  type="text"
                  tutorialPosition="left"
                />
              </div>
            </div>
          )}

          {!isCreate && (
            <div className="form-wrapper" id={status}>
              <h3 className="title">Status & History</h3>
              <h5>
                Expand the deployment history to view and interact with the
                timeline.
              </h5>

              <StatusAndHistoryContainer
                deployment={deployment}
                environment={environment}
              />
            </div>
          )}

          <div className="form-wrapper blocks-and-services" id={blocks}>
            <h3 className="title">KintoBlocks</h3>
            <h5>
              This is where the magic happens: add KintoBlocks to deliver the
              features you need in your client - we make them all work together.
              Because we know your application is special, you can specify
              unique configuration parameters for each of the features you are
              adding. You can also decide to combine or split instances of the
              same KintoBlock to save on costs.
            </h5>
            <div className="form-body autodeploy">
              <Field
                name="autoUpdate"
                label="Automatically deploy when new KintoBlock commits are available"
                component={Toggle}
                type="toggle"
                // className="autodeploy"
                className="high-availability" // TODO: temp while lower one is hidden
                help="Check this to deploy the branch when a new commit is available"
              />
              {/* <Field
                name="isHighAvailability"
                label="High Availability"
                component={Toggle}
                type="toggle"
                className="high-availability"
                help="Check this to guarantee all KintoBlocks are running all the time"
              /> */}
              {/* TODO: this is hidden till BE is ready */}
            </div>
            <ManageDependenciesFieldContainer
              name="appDependencies"
              dependencies={appDependencies}
              appVersion={version}
              preFillInformation={preFillInformation}
            />
          </div>

          <FormError error={error} />

          {!isCreate && (
            <div className="form-wrapper" id={accessApi}>
              <AccessYourApiContainer deployment={deployment} />
            </div>
          )}

          {!isCreate &&
            environment && (
              <div className="form-wrapper" id={deleteSection}>
                <h3 className="title">Permanent Deletion</h3>
                <h5>
                  Erase this environment from the surface of the universe.
                  Proceed with caution.
                </h5>

                <div className="form-body">
                  <div className="delete">
                    <div className="icon delete" />
                    <h5>
                      Permanently delete this environment (
                      <span>{environment.name}</span>) - any active deployments
                      in this environment will be shutdown.
                    </h5>
                    <div
                      className="button destructive"
                      onClick={this.toggleDeletionModal}
                    >
                      Delete Environment
                    </div>
                  </div>
                </div>
              </div>
            )}

          <button className="hide">Submit</button>
        </form>

        <ComplexModal
          component={DeletionModal}
          isOpen={this.state.isDeletionModalShown}
          className="deletion-modal"
          onClose={this.toggleDeletionModal}
          actions={{ deleteItem: deleteEnvironment }}
          data={{
            item: environment,
            deployment,
            type: ENVIRONMENT
          }}
        />

        <SaveBarPortal>
          {!canSave && !isCreate ? (
            <button onClick={pristineSubmit} className="button button-success">
              Deploy
            </button>
          ) : null}
        </SaveBarPortal>
      </div>
    )
  }
}

export default reduxForm({
  form: 'deploymentForm',
  enableReinitialize: true
})(DeploymentForm)
