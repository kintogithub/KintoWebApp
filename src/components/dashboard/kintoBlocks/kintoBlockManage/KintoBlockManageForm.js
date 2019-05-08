import React, { Component } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Field, reduxForm, FieldArray, FormSection } from 'redux-form'
import Toggle from 'components/forms/Toggle'
import { timeDayMonthYearShort } from 'constants/dateFormat'
import {
  protocolOptions,
  apiDocOptions,
  apiDocMicroserviceOptions
} from 'constants/kintoBlockFormOptions'
import { languages } from 'constants/supportedLanguages'
import { WEBSITE, MICROSERVICE, SERVICE } from 'constants/kintoBlockTypes'
import { required } from 'helpers/forms/validators'
import {
  buildsAndRepositories,
  envVars,
  kintoBlockScrollMarkers
} from 'constants/scrollMarkers'
import { isProduction } from 'helpers/pageHelper'
import { FormError, FieldValidation, CopyButton } from '../../../forms'
import KintoBlockManageParamsField from './KintoBlockManageParamsField'
import AdvancedCollapse from '../../ui/AdvancedCollapse'
import PrettySelect from 'components/forms/select/PrettySelect'
import ManageDependenciesFieldContainer from 'containers/dashboard/ui/ManageDependenciesFieldContainer'
import WorkspaceToolbarContainer from 'containers/dashboard/ui/WorkspaceToolbarContainer'
import KintoBlockManageBuildsContainer from 'containers/dashboard/kintoBlocks/kintoBlockManage/KintoBlockManageBuildsContainer'

class KintoBlockManageForm extends Component {
  state = {
    isBasicInfoOpen: false
  }

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    dependencies: PropTypes.array,
    kintoBlock: PropTypes.object.isRequired,
    isVersionTag: PropTypes.bool,
    error: PropTypes.string,
    isStaticSite: PropTypes.bool.isRequired,
    isGRPCEnabled: PropTypes.bool.isRequired,
    onCreateTagOpen: PropTypes.func.isRequired,
    environmentVariables: PropTypes.string.isRequired,
    rawEnvironmentVariables: PropTypes.array,
    updateForm: PropTypes.func.isRequired
  }

  toggleBasicInfo = () => {
    this.setState(prevState => ({
      isBasicInfoOpen: !prevState.isBasicInfoOpen
    }))
  }

  formatCommit(commit) {
    return commit.substring(0, 6).toUpperCase()
  }

  formatDate(date) {
    return moment(date).format(timeDayMonthYearShort)
  }

  getLanguage(lang) {
    return languages.find(l => l.value === lang) || {}
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
    this.props.initializeTopPageItem(buildsAndRepositories)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = event => {
    const positionedMarkers = kintoBlockScrollMarkers
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
      : kintoBlockScrollMarkers[kintoBlockScrollMarkers.length - 1].id

    if (this.props.topPageItem === topItem) {
      return
    } else {
      this.props.setTopPageItem(topItem)
    }
  }

  render() {
    const {
      kintoBlock,
      dependencies,
      handleSubmit,
      isVersionTag,
      error,
      repoUrl,
      isStaticSite,
      isGRPCEnabled,
      onCreateTagOpen,
      environmentVariables,
      rawEnvironmentVariables,
      updateForm
    } = this.props

    const isProd = isProduction()
    const language = this.getLanguage(kintoBlock.language)
    const isNotWebsite = kintoBlock.type !== WEBSITE
    const isNotService = kintoBlock.type !== SERVICE
    return (
      <form
        className="kintoblock-manage form-container"
        onSubmit={handleSubmit}
        data-test="kb-manage-form"
      >
        <div className="form-wrapper workspaces full-row">
          <WorkspaceToolbarContainer
            isDeployment={false}
            isCreate={false}
            kintoItem={kintoBlock}
            disabled={kintoBlock.isExample}
          />
        </div>

        <div
          className="form-wrapper full-row commits"
          id={buildsAndRepositories}
        >
          <FormError error={error} />

          <h3>Builds & Repository</h3>
          <h5>
            The latest successful build and other recent builds from your repo
            source.
          </h5>

          <div
            className={`build-and-repo-wrapper ${
              isStaticSite ? 'static-site' : ''
            }`}
          >
            <KintoBlockManageBuildsContainer
              kintoBlock={kintoBlock}
              onCreateTagOpen={onCreateTagOpen}
            />

            <div className="repo-info">
              <div className="field-wrapper">
                <label>Repository</label>
                <div className="repo-link">
                  <div className="field-input-wrapper">
                    <span className={`repo-type ${kintoBlock.gitSourceType}`} />
                    <input
                      type="text"
                      disabled
                      value={kintoBlock.repositoryName || ''}
                    />
                  </div>
                  <a
                    className="button secondary small"
                    target="_blank"
                    href={repoUrl}
                    rel="noopener noreferrer"
                  >
                    Open Repo
                  </a>
                </div>
              </div>
              {language.label &&
                kintoBlock.type === MICROSERVICE && (
                  <a
                    href={language.exampleRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-example"
                  >
                    View Example Project In {language.label}
                  </a>
                )}
            </div>
            {!isStaticSite &&
              isNotService && (
                <AdvancedCollapse>
                  <div
                    className={`form-advanced ${
                      !isVersionTag && !kintoBlock.isExample ? '' : 'curved'
                    }`}
                  >
                    <div className={`${isNotWebsite ? 'two-fields' : ''} `}>
                      {isNotWebsite && (
                        <Field
                          name="protocol"
                          label="protocol"
                          component={PrettySelect}
                          help="The protocol you would like this microservice to communicate with"
                          options={protocolOptions}
                          defaultValue={protocolOptions[0]}
                          placeholder="Choose the protocol"
                          disabled={kintoBlock.isExample || isVersionTag}
                        />
                      )}

                      <FormSection name="versionBuildConfigData">
                        <Field
                          name="port"
                          label="port"
                          component={FieldValidation}
                          disabled={
                            isGRPCEnabled ||
                            kintoBlock.isExample ||
                            isVersionTag
                          }
                        />
                      </FormSection>
                    </div>

                    <FormSection name="versionBuildConfigData">
                      <div className="two-fields">
                        <Field
                          name="buildCommand"
                          label="build command"
                          component={FieldValidation}
                          disabled={
                            isGRPCEnabled ||
                            kintoBlock.isExample ||
                            isVersionTag
                          }
                        />
                        <Field
                          name="runCommand"
                          label="run"
                          component={FieldValidation}
                          disabled={
                            isGRPCEnabled ||
                            kintoBlock.isExample ||
                            isVersionTag
                          }
                        />
                      </div>

                      {isNotWebsite && (
                        <Field
                          name="docFormat"
                          label="doc format"
                          component={PrettySelect}
                          validate={required}
                          help="The protocol you would like this microservice to communicate with"
                          options={
                            isNotWebsite
                              ? apiDocMicroserviceOptions
                              : apiDocOptions
                          }
                          defaultValue={
                            isNotWebsite
                              ? apiDocMicroserviceOptions[0]
                              : apiDocOptions[0]
                          }
                          disabled={
                            isGRPCEnabled ||
                            kintoBlock.isExample ||
                            isVersionTag
                          }
                        />
                      )}
                    </FormSection>
                  </div>
                </AdvancedCollapse>
              )}
            {!isVersionTag && !kintoBlock.isExample ? (
              <div className="autodeploy-builds">
                <Field
                  name="isAutoBuild"
                  label="Automatically build new commits in this branch"
                  component={Toggle}
                  type="toggle"
                />
              </div>
            ) : null}
          </div>
        </div>

        {!isProd && (
          <div className="form-wrapper blocks-and-services full-row">
            <ManageDependenciesFieldContainer
              name="dependencies"
              dependencies={dependencies}
              disabled={isVersionTag}
              isKintoBlock={true}
              kintoBlock={kintoBlock}
            />
          </div>
        )}

        {isNotService && (
          <div className="form-wrapper custom-parameters full-row">
            <div className="title-and-button">
              <div>
                <h3 id={envVars}>Environment Variables</h3>
                <h5>
                  Decide the variables to expose for your KintoBlock and set the
                  default values. Users can override the defaults before they
                  deploy.
                </h5>
              </div>

              <CopyButton
                text={environmentVariables}
                buttonText="Copy Variables to Clipboard"
                type="dark any-width"
              />
            </div>

            <FieldArray
              name="configParameters"
              component={KintoBlockManageParamsField}
              disabled={isVersionTag}
              rawEnvironmentVariables={rawEnvironmentVariables}
              updateForm={updateForm}
            />
          </div>
        )}
      </form>
    )
  }
}
export default reduxForm({
  form: 'kintoBlockManageForm',
  enableReinitialize: true
})(KintoBlockManageForm)
