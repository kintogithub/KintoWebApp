import { connect } from 'react-redux'
import breadcrumb from 'constants/breadcrumbs'
import Breadcrumb from 'components/app/Breadcrumb'

function mapStateToProps(state) {
  const info = breadcrumb[state.pageOptions.activePage]
  return {
    isShown: !!info,
    info
  }
}

export default connect(mapStateToProps)(Breadcrumb)
