import { connect } from 'react-redux'
import moment from 'moment'
import DeploymentChangelogs from '../../../components/dashboard/deployments/DeploymentChangelogs'
import { getKintoAppChangelogs } from '../../../actions/deployments'
import { asTextList } from 'helpers/versionHelper'
import {
  customParams,
  hardwareRequirements,
  version
} from 'constants/changelogs'
import { timeDayMonthYearShort } from 'constants/dateFormat'
import { deploymentSelect } from '../../../actions/pageOptions'

function mapStateToProps(state, { match }) {
  let { id } = match.params
  const deployment = state.deployments.byId[id] || {}
  const changelog = deployment.changelog ? deployment.changelog.data : {}
  const modifiedBlocks = changelog ? changelog.modifiedBlocks : []
  const newBlocks = changelog ? changelog.newBlocks : []
  const deletedBlocks = changelog ? changelog.deletedBlocks : []
  const versionList = deployment ? deployment.versions : []

  const formattedBlocks = modifiedBlocks
    ? modifiedBlocks.map(b => {
        let customParamsArray = []
        let hardwareRequirementsArray = []
        let versionArray = []

        b.changes.forEach(c => {
          if (c.type === customParams) {
            if (c.oldValue && c.newValue) {
              customParamsArray.push({
                type: c.type,
                action: 'modified',
                old: {
                  key: c.oldValue.key,
                  value: c.oldValue.value
                },
                new: {
                  key: c.newValue.key,
                  value: c.newValue.value
                }
              })
            } else {
              customParamsArray.push({
                type: c.type,
                action: c.oldValue ? 'delete' : 'add',
                old: {
                  key: c.oldValue ? c.oldValue.key : '-',
                  value: c.oldValue ? c.oldValue.value : '-'
                },
                new: {
                  key: c.newValue ? c.newValue.key : '-',
                  value: c.newValue ? c.newValue.value : '-'
                }
              })
            }
          }
          if (c.type === hardwareRequirements) {
            if (c.oldValue && c.newValue) {
              hardwareRequirementsArray.push({
                type: c.type,
                action: 'modified',
                old: {
                  key: c.oldValue.key,
                  value: c.oldValue.value
                },
                new: {
                  key: c.newValue.key,
                  value: c.newValue.value
                }
              })
            } else {
              hardwareRequirementsArray.push({
                type: c.type,
                action: c.oldValue ? 'delete' : 'add',
                old: {
                  key: c.oldValue ? c.oldValue.key : c.newValue.key,
                  value: c.oldValue ? c.oldValue.value : '-'
                },
                new: {
                  key: c.newValue ? c.newValue.key : c.oldValue.key,
                  value: c.newValue ? c.newValue.value : '-'
                }
              })
            }
          }
          if (c.type === version) {
            if (c.oldValue && c.newValue) {
              versionArray.push({
                type: c.type,
                branchOrTag:
                  c.oldValue.type === c.newValue.type
                    ? c.newValue.type
                    : 'BOTH',
                action: 'modified',
                old: {
                  name: c.oldValue.name,
                  note: c.oldValue.note,
                  tagTime: moment(c.oldValue.lastUpdated).format(
                    timeDayMonthYearShort
                  )
                },
                new: {
                  name: c.newValue.name,
                  note: c.newValue.note,
                  tagTime: moment(c.newValue.lastUpdated).format(
                    timeDayMonthYearShort
                  )
                }
              })
            } else {
              versionArray.push({
                type: c.type,
                branchOrTag: c.oldValue ? c.oldValue.type : c.newValue.type,
                action: c.oldValue ? 'delete' : 'add',
                old: {
                  name: c.oldValue ? c.oldValue.name : '-',
                  note: c.oldValue ? c.oldValue.note : '-',
                  tagTime: c.oldValue
                    ? moment(c.oldValue.lastUpdated).format(
                        timeDayMonthYearShort
                      )
                    : '-'
                },
                new: {
                  name: c.newValue ? c.newValue.name : '-',
                  note: c.newValue ? c.newValue.note : '-',
                  tagTime: c.newValue
                    ? moment(c.newValue.lastUpdated).format(
                        timeDayMonthYearShort
                      )
                    : '-'
                }
              })
            }
          }
        })

        return {
          name: b.blockName,
          versionChanges: versionArray,
          customParams: customParamsArray,
          hardwareRequirements: hardwareRequirementsArray
        }
      })
    : []

  return {
    id,
    changelog,
    formattedBlocks,
    newBlocks,
    deletedBlocks,
    deployment,
    versionList: asTextList(versionList)
  }
}

export default connect(
  mapStateToProps,
  {
    getKintoAppChangelogs,
    deploymentSelect
  }
)(DeploymentChangelogs)
