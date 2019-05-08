import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { SIGNUP_WELCOME } from 'constants/congratsModals'
import { DOCUMENTATION_STEP } from 'constants/onboarding'
import { calculatePercentageProgress } from 'helpers/onboardingHelper'
import { getPageUrl } from 'helpers/urlHelper'
import { completeAction } from 'actions/currentUser'
import { resendVerificationEmail } from 'actions/auth'
import { validateWorkspaceInvite } from 'actions/workspaces'
import { hideCongratsModal } from 'actions/pageOptions'
import DashboardHome from 'components/dashboard/DashboardHome'

function mapStateToProps(state, { match }) {
  const { onboarding, id, validatedEmail } = state.currentUser
  const { selectedWorkspace } = state.workspaces
  const { workspaceInviteToken } = state.pageOptions
  // const { members } = state.workspaces.byId[selectedWorkspace]
  // const user = members.find(member => member.id === id)
  // const { inviteState } = user

  return {
    // inviteState,
    id,
    selectedWorkspace,
    workspaceInviteToken,
    validatedEmail,
    percentageProgress: onboarding
      ? calculatePercentageProgress(onboarding)
      : 0,
    progress: onboarding || {},
    isCongratsModalShown: state.pageOptions.congratsModal === SIGNUP_WELCOME
  }
}

function mergeProps(stateProps, dispatchProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    validateWorkspaceInvite: () =>
      dispatchProps.validateWorkspaceInvite(
        stateProps.workspaceInviteToken,
        stateProps.selectedWorkspace
      ),
    goToCreate: url =>
      dispatchProps.push(
        getPageUrl(
          url,
          {
            workspaceId: stateProps.selectedWorkspace
          },
          { tutorial: true }
        )
      ),
    startDocumentationStep: () => {
      dispatchProps.completeAction(DOCUMENTATION_STEP, stateProps.id)
      let docsWindow = window.open()
      docsWindow.opener = null
      docsWindow.location = 'https://docs.kintohub.com/docs/getting-started'
    }
  }
}

export default connect(
  mapStateToProps,
  {
    completeAction,
    push,
    hideCongratsModal,
    validateWorkspaceInvite,
    resendVerificationEmail
  },
  mergeProps
)(DashboardHome)
