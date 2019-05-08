import { connect } from 'react-redux'
import LinkComponent from 'components/breadcrumbs/Link'

function mapStateToProps(state) {
  const { selectedKintoBlockId } = state.pageOptions
  const selectedKintoBlock =
    state.kintoBlocksDependenciesCache[selectedKintoBlockId]

  return {
    text: selectedKintoBlock ? selectedKintoBlock.displayName : 'loading...'
  }
}

export default connect(mapStateToProps)(LinkComponent)
