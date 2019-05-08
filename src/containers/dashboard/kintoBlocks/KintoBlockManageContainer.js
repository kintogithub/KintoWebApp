import { connect } from 'react-redux'
import { reset } from 'redux-form'
import { graphql } from 'react-apollo'
import { KINTOBLOCK_STEPS_QUERY } from 'constants/graphql'
import { TAG } from 'constants/version'
import { INFO } from 'constants/notificationTypes'
import { KINTOBLOCK_CREATE_SUCCESS } from 'constants/congratsModals'
import { APIDOC } from 'constants/kintoBlockDocTypes'
import { isBranchVersionEqual } from 'helpers/versionHelper'
import { fetchKintoBlock } from 'actions/kintoBlocks'
import { kintoBlockStepsReceive } from 'actions/kintoBlockSteps'
import { showNotification, hideCongratsModal } from 'actions/pageOptions'
import KintoBlockManage from 'components/dashboard/kintoBlocks/KintoBlockManage'

function mapStateToProps(state, { match }) {
  const { id, ver, type } = match.params
  const kintoBlock = state.kintoBlocks.byId[id] || {}
  const selectedWorkspace = state.workspaces.selectedWorkspace
  const { canSave, congratsModal } = state.pageOptions
  const hasApiDoc =
    kintoBlock.version.versionBuildConfigData.docFormat === APIDOC

  return {
    id,
    ver,
    type,
    kintoBlock,
    selectedWorkspace,
    hasApiDoc,
    isVersionMatch: isBranchVersionEqual(kintoBlock.version, {
      name: ver,
      type
    }),
    hasActiveBuild: !!kintoBlock.activeBuild,
    canSave,
    isCongratsModalShown: congratsModal === KINTOBLOCK_CREATE_SUCCESS
  }
}

function mapDispatchToProps(dispatch) {
  return {
    hideCongratsModal: () => dispatch(hideCongratsModal()),
    fetchKintoBlock: (id, ver, type) =>
      dispatch(fetchKintoBlock(id, ver, type)),
    resetForm: () => dispatch(reset('kintoBlockManageForm')),
    showNotification: message => dispatch(showNotification(INFO, message)),
    kintoBlockStepsReceive: (id, version, data) =>
      dispatch(kintoBlockStepsReceive(id, version, data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  graphql(KINTOBLOCK_STEPS_QUERY, {
    options: ({ kintoBlock }) => {
      // if is a branch find by branch name
      // if its a tag find by build id
      const queryVariables =
        kintoBlock.version.type === TAG
          ? {
              kintoBlockId: kintoBlock.id,
              buildId: kintoBlock.version.activeBuildId
            }
          : {
              kintoBlockId: kintoBlock.id,
              kintoBlockVersionName: kintoBlock.version.name
            }
      return {
        variables: queryVariables
      }
    }
  })(KintoBlockManage)
)
