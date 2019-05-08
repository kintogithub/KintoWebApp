import { connect } from 'react-redux'
import moment from 'moment'
import {
  timeDayMonthYearShort,
  hoursMinutesSecondsMilliseconds
} from 'constants/dateFormat'
import LogsRow from 'components/dashboard/deployments/deploymentRequestLogs/LogsRow'
import { fetchDeploymentRequestConsoleLogs } from 'actions/deploymentLogs'

function mapStateToProps(state, { requestLog }) {
  let { id, envId, appVersion } = state.deploymentLogs
  const { requestId } = requestLog
  const consoleLogs = state.deploymentLogs.requestConsoleLogs[requestId] || []

  requestLog = {
    ...requestLog,
    date: moment(requestLog.date).format(timeDayMonthYearShort)
  }

  return {
    consoleLogs,
    id,
    envId,
    appVersion,
    requestLog,
    requestId,
    hoursMinutesSecondsMilliseconds
  }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { id, envId, appVersion, requestId } = stateProps
  return {
    ...ownProps,
    ...stateProps,
    fetchDeploymentRequestConsoleLogs: () => {
      dispatchProps.fetchDeploymentRequestConsoleLogs(
        id,
        envId,
        requestId,
        appVersion
      )
    }
  }
}

export default connect(
  mapStateToProps,
  { fetchDeploymentRequestConsoleLogs },
  mergeProps
)(LogsRow)
