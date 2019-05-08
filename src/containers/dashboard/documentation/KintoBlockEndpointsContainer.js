import { connect } from 'react-redux'
import KintoBlockEndpoints from 'components/dashboard/documentation/KintoBlockEndpoints'
import {
  fetchKintoBlockDocumentation,
  fetchKintoBlockDocumentationEndpoint,
  fetchKintoBlockForDocumentation
} from 'actions/documentation'
import { fetchDeployment } from 'actions/deployments'
import { deploymentSelect } from 'actions/pageOptions'

function mapStateToProps(state, { match }) {
  const { id, version, type, depId, envId } = match.params
  const {
    selectedBuildId,
    allIds,
    byId,
    selectedKintoBlock
  } = state.documentation

  const endpointList = allIds.map(id => ({
    id: byId[id].id,
    type: byId[id].type,
    url: byId[id].url
  }))

  const firstEndpointId = endpointList.length ? endpointList[0].id : ''

  return {
    id,
    version,
    type,
    selectedBuildId,
    endpointList,
    firstEndpointId,
    depId,
    envId,
    kintoBlockName: selectedKintoBlock.displayName
  }
}

export default connect(
  mapStateToProps,
  {
    fetchKintoBlockForDocumentation,
    fetchKintoBlockDocumentation,
    fetchKintoBlockDocumentationEndpoint,
    deploymentSelect,
    fetchDeployment
  }
)(KintoBlockEndpoints)
