import { connect } from 'react-redux'
import { formValueSelector, change } from 'redux-form'
import { TAG } from 'constants/version'
import { GITHUB } from 'constants/gitRepos'
import { WEBSITE } from 'constants/kintoBlockTypes'
import { GRPC } from 'constants/protocolTypes'
import { WEBAPP } from 'constants/websiteTypes'
import {
  getKintoBlockInitialFormData,
  getVariablesForCopyButton
} from 'helpers/kintoBlocksHelper'
import { updateKintoBlock } from 'actions/kintoBlocks'
import { setTopPageItem, initializeTopPageItem } from 'actions/pageOptions'
import KintoBlockManageForm from 'components/dashboard/kintoBlocks/kintoBlockManage/KintoBlockManageForm'

function mapStateToProps(state, { kintoBlock, isCreateTagErrorMessageShown }) {
  const selector = formValueSelector('kintoBlockManageForm')
  const dependencies = selector(state, 'dependencies')
  const isGRPCEnabled = selector(state, 'protocol') === GRPC
  const repoDomain =
    kintoBlock.gitSourceType === GITHUB ? 'github.com' : 'bitbucket.org'

  const orgName =
    kintoBlock.gitSourceType === GITHUB
      ? kintoBlock.organizationName
      : kintoBlock.organizationUuid

  const isStaticSite =
    kintoBlock.type === WEBSITE && kintoBlock.blockSubType !== WEBAPP
  const initialValues = getKintoBlockInitialFormData(kintoBlock)
  const environmentVariables = getVariablesForCopyButton(
    initialValues.configParameters
  )
  return {
    initialValues,
    environmentVariables,
    rawEnvironmentVariables: initialValues.configParameters,
    isStaticSite,
    isGRPCEnabled,
    repoUrl: `https://${repoDomain}/${orgName}/${kintoBlock.repositoryName}`,
    kintoBlock,
    dependencies,
    isVersionTag: kintoBlock.version && kintoBlock.version.type === TAG,
    isCreateTagErrorMessageShown
  }
}

function mapDispatchToProps(dispatch, { kintoBlock }) {
  return {
    onSubmit: data =>
      dispatch(
        updateKintoBlock(
          kintoBlock.id,
          kintoBlock.version.name,
          kintoBlock.version.type,
          data
        )
      ),
    updateForm: data =>
      dispatch(change('kintoBlockManageForm', 'configParameters', data)),
    setTopPageItem: topItem => dispatch(setTopPageItem(topItem)),
    initializeTopPageItem: topItem => dispatch(initializeTopPageItem(topItem))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KintoBlockManageForm)
