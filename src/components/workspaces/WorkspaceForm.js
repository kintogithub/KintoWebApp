import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm, FieldArray } from 'redux-form'
import { WORKSPACE_MEMBERS, errorMessages } from 'constants/limitations'
import { format } from 'helpers/stringHelper'
import { required, maxLength256 } from 'helpers/forms/validators'
import { isProduction } from 'helpers/pageHelper'
import { basicInput } from 'helpers/forms/validationFields'
import { FieldValidation, Toggle, FormError } from '../forms'
import WorkspaceMembers from './workspaceForm/WorkspaceMembers'

const membersLimitations = (value, allValues, { membersLimit }) => {
  if (!membersLimit || !value) {
    return undefined
  }
  return value.length > membersLimit
    ? format(errorMessages[WORKSPACE_MEMBERS], membersLimit)
    : undefined
}

const WorkspaceForm = ({
  workspace,
  isCreate,
  isTutorial,
  currentUserId,
  workspaceMembers,
  updateMemberTutorialFieldStatus,
  refreshActiveItemInTutorial,
  error,
  resendInvite
}) => {
  return (
    <form className="workspace-form form-container">
      <div>
        <h2>{workspace.name}</h2>
      </div>
      <div className="form-wrapper">
        <h3>Basic Info</h3>
        <h5>Enter a name for your workspace.</h5>
        <div className="form-body">
          <Field
            name="name"
            label="Workspace name"
            placeholder="Enter an name for your workspace"
            component={FieldValidation}
            validate={[...basicInput, required, maxLength256]}
            type="text"
            tutorialPosition="left"
          />
          {!isProduction && (
            <div className="auto-share-switch">
              <Field
                name="autoShareProjects"
                className="auto-share-projects"
                label="Anyone in this workspace will view and join all projects automatically. Permissions can still be manually changed at project level."
                help="Turn this on to make all projects visible to every workspace member by default."
                component={Toggle}
              />
            </div>
          )}
          <FormError error={error} />
        </div>
      </div>

      <div className="form-wrapper">
        <h3>Members</h3>
        {isCreate ? (
          <h5>
            An admin can create and edit any project, and manage permissions for
            every member. A member can create new projects and edit the ones
            they have access to.
          </h5>
        ) : (
          <h5>
            Invite new members to your workspace (they will receive an email
            invite and a notification)
          </h5>
        )}

        <FieldArray
          name="members"
          component={WorkspaceMembers}
          workspaceMembers={workspaceMembers}
          validate={membersLimitations}
          updateMemberTutorialFieldStatus={updateMemberTutorialFieldStatus}
          refreshActiveItemInTutorial={refreshActiveItemInTutorial}
          isTutorial={isTutorial}
          workspaceName={workspace.name}
          resendInvite={resendInvite}
        />
      </div>
    </form>
  )
}
WorkspaceForm.propTypes = {
  updateMemberTutorialFieldStatus: PropTypes.func.isRequired,
  refreshActiveItemInTutorial: PropTypes.func.isRequired,
  isCreate: PropTypes.bool.isRequired,
  isTutorial: PropTypes.bool.isRequired,
  workspace: PropTypes.object.isRequired,
  currentUserId: PropTypes.string.isRequired,
  workspaceMembers: PropTypes.array.isRequired,
  error: PropTypes.object,
  resendInvite: PropTypes.func.isRequired
}

export default reduxForm({ enableReinitialize: true })(WorkspaceForm)
