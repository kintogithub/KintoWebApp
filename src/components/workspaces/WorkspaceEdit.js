import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  setWorkpaceIdInLocalStorage,
  setExitLocation,
  setTutorial
} from 'helpers/workspaceHelper'
import { pageTypes } from 'constants/gitRepos'
import SimpleModal from '../dashboard/ui/SimpleModal'
import WorkspaceFormContainer from 'containers/workspaces/WorkspaceFormContainer'
import GitConnectContainer from 'containers/dashboard/ui/GitConnectContainer'

class WorkspaceEdit extends Component {
  static propTypes = {
    workspace: PropTypes.object.isRequired,
    isCongratsModalShown: PropTypes.bool.isRequired,
    hideCongratsModal: PropTypes.func.isRequired,
    hasGitSources: PropTypes.bool.isRequired,
    githubSource: PropTypes.object.isRequired,
    bitbucketSource: PropTypes.object.isRequired,
    isTutorial: PropTypes.bool.isRequired
  }

  componentDidMount() {
    setWorkpaceIdInLocalStorage(this.props.selectedWorkspace)
    setExitLocation(pageTypes.KB_TYPE_WORKSPACE)
    setTutorial(this.props.isTutorial)
  }

  render() {
    const {
      workspace,
      isCongratsModalShown,
      hideCongratsModal,
      hasGitSources,
      githubSource,
      bitbucketSource,
      resendInvite
    } = this.props

    const githubOrganizations = githubSource.organizations || []
    const bitbucketOrganizations = bitbucketSource.organizations || []

    return (
      <div className="edit-workspace">
        <WorkspaceFormContainer
          workspace={workspace}
          isCreate={false}
          form="WorkspaceFormEdit"
          resendInvite={resendInvite}
        />
        <div className="form-wrapper github-form">
          <h3>Repo Sources</h3>
          <h5>
            Linking a repo source allows you to use any existing repositories
            within and create new ones. Please make sure every workspace member
            has the correct access to the organization. Once it’s been linked
            you cannot unlink it.
          </h5>
          <div className="action-bottom-section">
            <div className="top">
              {!hasGitSources && (
                <div className="text-norepo">
                  No repo source has been linked
                </div>
              )}
              <ul className="organization-list">
                {githubOrganizations.map((organization, i) => (
                  <li key={i}>
                    <div>
                      <img
                        src="/images/avatar-organization.jpg"
                        alt="organization logo"
                      />
                      <div className="text">{organization.name}</div>
                    </div>
                    <div className="text">
                      {githubSource.userName} <span className="icon github" />
                    </div>
                  </li>
                ))}
                {bitbucketOrganizations.map((organization, i) => (
                  <li key={i}>
                    <div>
                      <img
                        src="/images/avatar-organization.jpg"
                        alt="organization logo"
                      />
                      <div className="text">{organization.name}</div>
                    </div>
                    <div className="text">
                      {bitbucketSource.userName}{' '}
                      <span className="icon bitbucket" />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bottom">
              <GitConnectContainer />
            </div>
          </div>
        </div>
        <SimpleModal
          options={{
            isOpen: isCongratsModalShown,
            className: 'onboarding',
            text: {
              title: '✅  Create a Workspace to Collaborate',
              subtitle: 'You just created your first workspace. Congrats!',
              message:
                'You’ve been taken to the new workspace. Now you can switch between them easily.',
              cancelText: 'OMG Yes!',
              cancelClass: 'dark'
            },
            onClose: hideCongratsModal,
            image: {
              src: '/images/popup-create-workspace-success.svg',
              description: 'successfully created new workspace infographic'
            }
          }}
        />
      </div>
    )
  }
}

export default WorkspaceEdit
