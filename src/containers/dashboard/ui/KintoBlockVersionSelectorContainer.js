import { connect } from 'react-redux'
import { change } from 'redux-form'
import get from 'lodash/get'
import { BRANCH, TAG } from 'constants/version'
import { getVersionInfo } from 'helpers/versionHelper'
import KintoBlockTagAndBranchDropDown from 'components/dashboard/ui/KintoBlockTagAndBranchDropDown'

function mapStateToProps(state, { kintoBlock, isForm }) {
  const id = get(kintoBlock, 'blockId', '')
  const versionType =
    get(kintoBlock, 'version.type', '').toLowerCase() || 'branch'

  const getArray = query => {
    return get(kintoBlock, 'versions', [])
      .filter(item => item.type === query)
      .map(v => {
        const versionInfo = getVersionInfo(id, v, state.kintoBlockBuilds)
        return {
          name: v.name,
          type: query === BRANCH ? BRANCH : TAG,
          activeBuildId: versionInfo.buildId,
          note: versionInfo.note,
          lastUpdated: versionInfo.lastUpdated
        }
      })
  }

  return {
    id: `ID${id}`,
    kintoBlockType: kintoBlock.type,
    kintoBlock,
    isForm,
    versionType,
    branchArray: getArray('BRANCH'),
    tagArray: getArray('TAG'),
    dropdownText: get(kintoBlock, 'version.name', '')
  }
}

function mapDispatchToProps(dispatch, { isKintoBlock, field }) {
  return {
    onClickHandler: item => {
      const formName = isKintoBlock ? 'kintoBlockManageForm' : 'deploymentForm'

      dispatch(
        change(formName, `${field}.version`, {
          name: item.name,
          type: item.type
        })
      )
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KintoBlockTagAndBranchDropDown)
