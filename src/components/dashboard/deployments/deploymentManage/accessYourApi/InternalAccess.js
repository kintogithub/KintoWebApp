import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import CopyButton from 'components/forms/CopyButton'
import ColorText from '../../../../ui/ColorText'

class InternalAccess extends PureComponent {
  static propTypes = {
    internalUrl: PropTypes.object.isRequired,
    isShown: PropTypes.bool.isRequired
  }

  render() {
    const { internalUrl, isShown } = this.props
    return isShown ? (
      <div className="section">
        <p>
          Communication between services can be done through the gateway or
          directly to the service, depending on the preference or features you
          choose.
        </p>
        <p>
          You cannot use your local machine or Postman to call the block like
          this, these communication methods are only available for communication
          between pods deployed within a cluster
        </p>
        <p>
          Using the gateway allows you to use features like Session Memory,
          while communicating directly to your service usually allows
          flexibility in not being dependent on the Kintohub Gateway.
        </p>
        <p>
          To access the gateway internally, instead of using `api.kintohub.com`,
          use the hostname `omniscient-gateway.kintohub.svc.cluster.local`.
          Every API call coming from the gateway comes with the Authentication
          Token in the Authentication Header. You must include and forward this
          header when calling APIs through the API gateway similar.
        </p>

        <div className="message-box dark">
          <div className="left">
            <span className="code">
              <ColorText text={internalUrl.styledGatewayCurl} />
            </span>
          </div>
          <div className="right">
            <CopyButton text={internalUrl.gatewayCurl} type="secondary" />
          </div>
        </div>
        <p>Or</p>
        <div className="message-box dark">
          <div className="left">
            <span className="code">
              <ColorText text={internalUrl.styledUrl} />
            </span>
          </div>
          <div className="right">
            <CopyButton text={internalUrl.url} type="secondary" />
          </div>
        </div>
        <p className="section-end" />
      </div>
    ) : null
  }
}

export default InternalAccess
