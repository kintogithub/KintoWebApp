import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { KINTOBLOCK_BUILDS_QUERY } from 'constants/graphql'
import { fetchKintoBlocks } from 'actions/kintoBlocks'
import { kintoBlockBuildsReceive } from 'actions/kintoBlockBuilds'
import KintoBlocks from 'components/dashboard/KintoBlocks'

function mapStateToProps(state) {
  return {
    kintoBlockIds: state.kintoBlocks.allIds
  }
}

export default connect(
  mapStateToProps,
  { fetchKintoBlocks, kintoBlockBuildsReceive }
)(
  graphql(KINTOBLOCK_BUILDS_QUERY, {
    options: ({ kintoBlockIds }) => ({
      variables: {
        kintoBlockIds
      }
    }),
    skip: ({ kintoBlockIds }) => !kintoBlockIds.length
  })(KintoBlocks)
)
