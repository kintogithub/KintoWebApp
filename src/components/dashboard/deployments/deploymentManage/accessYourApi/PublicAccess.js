import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import CopyButton from 'components/forms/CopyButton'
import ColorText from '../../../../ui/ColorText'

class PublicAccess extends PureComponent {
  static propTypes = {
    publicUrl: PropTypes.object.isRequired,
    isShown: PropTypes.bool.isRequired
  }

  render() {
    const { publicUrl, isShown } = this.props

    return isShown ? (
      <div className="section padding-bottom">
        <p>
          You can communicate directly to your services without needing to
          authenticate with KintoHub. This use case is usually used for webhooks
          or automated third party systems.
        </p>
        <p>
          Please note that features like Session Memory will not be available
          since there is no authentication token.
        </p>

        <div className="message-box dark">
          <div className="left">
            <span className="code">
              <ColorText text={publicUrl.styledCurl} />
            </span>
          </div>
          <div className="right">
            <CopyButton text={publicUrl.curl} type="secondary" />
          </div>
        </div>
      </div>
    ) : null
  }
}

export default PublicAccess
