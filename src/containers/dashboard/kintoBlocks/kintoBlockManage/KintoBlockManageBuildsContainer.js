import { connect } from 'react-redux'
import { TAG } from 'constants/version'
import { advancedDefaults } from 'constants/microserviceAdvancedDefaults'
import { APIDOC } from 'constants/kintoBlockDocTypes'
import { getKintoBlockBuilds } from 'selectors/kintoBlockSteps'

import { refreshCommits, retryBuild } from 'actions/kintoBlocks'

import KintoBlockManageBuilds from 'components/dashboard/kintoBlocks/kintoBlockManage/KintoBlockManageBuilds'

function mapStateToProps(state, { kintoBlock }) {
  const kintoBlockBuilds = getKintoBlockBuilds(state)
  return {
    selectedWorkspace: state.workspaces.selectedWorkspace,
    isVersionTag: kintoBlock.version && kintoBlock.version.type === TAG,
    kintoBlockBuilds
  }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    refreshCommits: () => {
      const kb = ownProps.kintoBlock
      return dispatchProps.refreshCommits(
        kb.id,
        kb.version.name,
        kb.version.type
      )
    },
    retryBuild: buildId => {
      const kb = ownProps.kintoBlock
      let buildData = {
        versionBuildConfigData: {
          ...advancedDefaults[kb.language],
          docFormat: APIDOC
        }
      }
      const build = kb.builds.find(build => build.id === buildId)
      if (build && build.versionBuildConfigData) {
        buildData = kb.versionBuildConfigData
      }
      return dispatchProps.retryBuild(
        kb.id,
        kb.version.name,
        buildId,
        buildData
      )
    }
  }
}

export default connect(
  mapStateToProps,
  { refreshCommits, retryBuild },
  mergeProps
)(KintoBlockManageBuilds)
