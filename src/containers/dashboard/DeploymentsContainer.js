import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import {
  DEPLOYMENT_ENVIRONMENTS_SUCCESS_QUERY,
  DEPLOYMENT_ENVIRONMENTS_STATUS_QUERY
} from 'constants/graphql'
import { fetchDeployments } from 'actions/deployments'
import { deploymentEnvironmentsReceiveInfo } from 'actions/deploymentEnvironments'
import Deployments from 'components/dashboard/Deployments'

function mapStateToProps(state) {
  const { topPageItem } = state.pageOptions

  return {
    deploymentIds: state.deployments.allIds,
    topPageItem
  }
}

export default connect(
  mapStateToProps,
  {
    fetchDeployments,
    deploymentEnvironmentsReceiveInfo
  }
)(
  compose(
    graphql(DEPLOYMENT_ENVIRONMENTS_SUCCESS_QUERY, {
      name: 'deploymentEnvironmentsQuery',
      options: ({ deploymentIds }) => ({
        variables: {
          deploymentIds
        }
      }),
      skip: ({ deploymentIds }) => !deploymentIds.length
    }),
    graphql(DEPLOYMENT_ENVIRONMENTS_STATUS_QUERY, {
      name: 'deploymentEnvironmentsStatusQuery',
      options: ({ deploymentIds }) => ({
        variables: {
          deploymentIds
        }
      }),
      skip: ({ deploymentIds }) => !deploymentIds.length
    })
  )(Deployments)
)
