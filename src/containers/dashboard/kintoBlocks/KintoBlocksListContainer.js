import { connect } from 'react-redux'
import { getAllKintoBlocks } from '../../../selectors/kintoBlocks'
import { fetchKintoBlocks } from '../../../actions/kintoBlocks'
import KintoBlocksList from '../../../components/dashboard/kintoBlocks/KintoBlocksList'

function mapStateToProps(state) {
  return {
    kintoBlocks: getAllKintoBlocks(state)
  }
}

export default connect(mapStateToProps, { fetchKintoBlocks })(KintoBlocksList)
