import { connect } from 'react-redux'
import tutorial from 'constants/tutorial'
import { TUTORIAL } from 'constants/notificationTypes'
import Notifications from 'components/ui/Notifications'
import { cancelTutorialMode } from 'actions/tutorial'
import { closeNotification } from 'actions/pageOptions'

function mapStateToProps(state) {
  const { notification, activePage } = state.pageOptions
  const { isTutorial, activeField } = state.tutorial

  let { isShown, type, message } = notification ? notification : {}

  if (isTutorial) {
    message = activeField ? tutorial[activePage][activeField].description : ''
    isShown = !!activeField
    type = TUTORIAL
  }

  return {
    isShown,
    type,
    message
  }
}

export default connect(
  mapStateToProps,
  {
    closeNotification,
    cancelTutorialMode
  }
)(Notifications)
