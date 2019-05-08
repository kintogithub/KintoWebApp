import { connect } from 'react-redux'
import { gitConnectUrl } from 'helpers/urlHelper'
import { GITHUB, BITBUCKET } from 'constants/gitRepos'
import GitConnect from 'components/dashboard/ui/GitConnect'

function mapStateToProps(state, { ismodalui, pageType }) {
  const { selectedWorkspace, byId } = state.workspaces
  const { gitSources } = byId[selectedWorkspace]
  const isGithubConnected = !!gitSources[GITHUB]
  const isBitbucketConnected = !!gitSources[BITBUCKET]
  const { isTutorial } = state.tutorial

  return {
    isGithubConnected,
    isBitbucketConnected,
    isTutorial,
    workspaceId: selectedWorkspace,
    githubUrl: isGithubConnected
      ? null
      : gitConnectUrl(selectedWorkspace, GITHUB, {
          pageType,
          isTutorial
        }),
    bitbucketUrl: isBitbucketConnected
      ? null
      : gitConnectUrl(selectedWorkspace, BITBUCKET, {
          pageType,
          isTutorial
        })
  }
}

export default connect(mapStateToProps)(GitConnect)
