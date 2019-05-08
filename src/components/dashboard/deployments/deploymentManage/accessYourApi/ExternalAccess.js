import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import CopyButton from 'components/forms/CopyButton'
import ColorText from '../../../../ui/ColorText'

class ExternalAccess extends PureComponent {
  static propTypes = {
    authUrl: PropTypes.object.isRequired,
    accessUrl: PropTypes.object.isRequired,
    tutorialUrl: PropTypes.object.isRequired,
    isExample: PropTypes.bool.isRequired,
    isShown: PropTypes.bool.isRequired,
    styledBodyText: PropTypes.array.isRequired
  }

  render() {
    const {
      authUrl,
      accessUrl,
      tutorialUrl,
      isExample,
      isShown,
      styledBodyText
    } = this.props
    return isShown ? (
      <div>
        <div className="section">
          <h4 className="step-header">
            <div className="step-number">1</div>
            <div className="step-body">Authenticate to Get a Token</div>
          </h4>
          <p>
            You need to get authorization first before starting to call the
            endpoints. <br />
            To get authorization you need to send the{' '}
            <span className="bold">Client ID</span> and{' '}
            <span className="bold">Secret Key</span> to{' '}
            <span className="bold">{authUrl.url}</span> like the following:{' '}
          </p>
          <div className="message-box dark">
            <div className="left">
              <span className="code">{authUrl.curl}</span>
            </div>
            <div className="right">
              <CopyButton text={authUrl.curl} type="secondary" />
            </div>
          </div>
          <p>
            You will get a <span className="bold">token</span> back, you need to
            send it in the <span className="bold">Kinto-Authorization</span>{' '}
            header when you try to call the apis
          </p>
        </div>

        <div className="section">
          <h4 className="step-header">
            <div className="step-number">2</div>
            <div className="step-body">Access Your API</div>
          </h4>
          <div>
            <p>The base url for each microservice is: </p>
            <p className="bold">
              <ColorText text={accessUrl.styledBaseUrl} />
            </p>
            <p>
              To call your microservice you just need to send the token as part
              of the <span className="bold">Kinto-Authorization</span> header
            </p>
          </div>
          <div className="message-box dark">
            <div className="left">
              <span className="code">
                <ColorText text={accessUrl.styledCurl} />
              </span>
            </div>
            <div className="right">
              <CopyButton text={accessUrl.curl} type="secondary" />
            </div>
          </div>
          <p className="section-end">
            You can{' '}
            <a
              href="https://docs.kintohub.com/docs/getting-started"
              target="_blank"
              rel="noopener noreferrer"
            >
              read more about it here
            </a>
          </p>
        </div>
        {isExample && (
          <div className="tutorial-container">
            <div className="title">
              <h4>Example - Auth Example KintoBlock</h4>
              <h5 className="white">
                Here’s how you can talk to this example KintoBlock you added to
                your application. Go ahead and try it!
              </h5>
            </div>
            <div className="body">
              <h5 className="white">The base url for each KintoBlock is: </h5>
              <div className="white code-font">
                <ColorText text={styledBodyText} />
              </div>
              <h5 className="white">
                To call your auth example KintoBlock you just need to send the
                token as part of the Kinto-Authorization header:
              </h5>
              <div className="tutorial-endpoint">
                <div className="header">
                  <h5>
                    <span className="code title-endpoint">login</span>
                    endpoint
                  </h5>
                </div>
                <div className="body">
                  <div className="left">
                    <span className="code">
                      <ColorText text={tutorialUrl.styledLoginCurl} />
                    </span>
                  </div>
                  <div className="right">
                    <CopyButton text={tutorialUrl.loginCurl} type="secondary" />
                  </div>
                </div>
              </div>

              <div className="tutorial-endpoint">
                <div className="header">
                  <h5>
                    <span className="code title-endpoint">article</span>
                    endpoint
                  </h5>
                </div>
                <div className="body">
                  <div className="left">
                    <span className="code">
                      <ColorText text={tutorialUrl.styledArticleCurl} />
                    </span>
                  </div>
                  <div className="right">
                    <CopyButton
                      text={tutorialUrl.articleCurl}
                      type="secondary"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    ) : null
  }
}

export default ExternalAccess
