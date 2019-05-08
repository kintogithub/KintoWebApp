import { connect } from 'react-redux'
import qs from 'query-string'
import KintoBlockBuilds from 'components/dashboard/kintoBlocks/KintoBlockBuilds'
import { getKintoBlockBuilds } from 'actions/kintoBlocks'

function mapStateToProps(state, { match, location }) {
  const { status, protocol } = qs.parse(location.search)
  const { id, name, buildId } = match.params
  return {
    id,
    name,
    buildId,
    status,
    protocol
  }
}

export default connect(
  mapStateToProps,
  { getKintoBlockBuilds }
)(KintoBlockBuilds)
