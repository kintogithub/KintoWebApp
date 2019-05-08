import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import qs from 'query-string'
import { getPageUrl } from '../helpers/urlHelper'
import { pages } from '../constants/pages'
import { pageTypes, GITHUBQS, GITHUB } from '../constants/gitRepos'
import { connectGit } from '../actions/workspaces'
import GitConnectConfirm from '../components/GitConnectConfirm'
import {
  getWorkspaceIdFromLocalStorage,
  getExitLocation,
  getTutorial
} from 'helpers/workspaceHelper'

function mapDispatchToProps(dispatch, { location }) {
  return {
    connectGit: () => {
      const { code, state, installation_id } = qs.parse(location.search)

      if (!state) {
        dispatch(push('/'))
      }

      if (!code && !installation_id) {
        dispatch(push('/'))
      }

      let connectParams = { identifier: code }

      if (state === GITHUBQS) {
        connectParams = {
          identifier: installation_id,
          tutorialQuery: getTutorial() ? { tutorial: true } : {},
          workspaceId: getWorkspaceIdFromLocalStorage(),
          pageType: getExitLocation(),
          gitSource: GITHUB
        }
      } else {
        const [workspaceId, pageType, tutorial, gitSource] = state.split('-')
        connectParams = {
          identifier: code,
          tutorialQuery: tutorial ? { tutorial: true } : {},
          workspaceId: workspaceId,
          pageType: pageType,
          gitSource: gitSource
        }
      }

      if (connectParams.workspaceId) {
        dispatch(
          connectGit(
            connectParams.workspaceId,
            connectParams.gitSource,
            connectParams.identifier
          )
        ).then(() => {
          let page = null
          let extraParams = {}
          switch (connectParams.pageType) {
            case pageTypes.KB_CREATE:
              page = pages.dashboardKintoBlocksCreate
              extraParams = { showLinkModal: true }
              break
            case pageTypes.KB_TYPE_SELECT:
              page = pages.dashboardKintoBlocksTypeSelect
              extraParams = { showLinkModal: true }
              break
            default:
              page = pages.workspaceEdit
              break
          }
          dispatch(
            push(
              getPageUrl(
                page,
                { workspaceId: connectParams.workspaceId },
                { ...extraParams, ...connectParams.tutorialQuery }
              )
            )
          )
        })
      } else {
        throw new Error(`The workspaceId was not found`)
      }
    }
  }
}

export default connect(
  undefined,
  mapDispatchToProps
)(GitConnectConfirm)
