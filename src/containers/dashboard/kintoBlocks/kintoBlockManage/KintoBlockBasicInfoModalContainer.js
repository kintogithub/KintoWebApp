import { connect } from 'react-redux'
import { getKintoBlockInitialFormData } from 'helpers/kintoBlocksHelper'
import { updateKintoBlock } from 'actions/kintoBlocks'
import KintoBlockBasicInfoModal from 'components/dashboard/kintoBlocks/kintoBlockManage/KintoBlockBasicInfoModal'

function mapStateToProps(state) {
  const { selectedKintoBlockId } = state.pageOptions
  const kintoBlock = state.kintoBlocks.byId[selectedKintoBlockId]

  return {
    kintoBlock,
    initialValues: {
      shortDescription: kintoBlock.shortDescription
    }
  }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { id, version } = stateProps.kintoBlock
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    onSubmit: ({ shortDescription }) =>
      dispatchProps.updateKintoBlock(id, version.name, version.type, {
        ...getKintoBlockInitialFormData(stateProps.kintoBlock),
        shortDescription
      })
  }
}

export default connect(
  mapStateToProps,
  { updateKintoBlock },
  mergeProps
)(KintoBlockBasicInfoModal)
