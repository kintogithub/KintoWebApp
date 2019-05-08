import React, { Component } from 'react'
import iscroll from 'iscroll'
import ReactIScroll from 'react-iscroll'
import PropTypes from 'prop-types'

import ResponseCodeRow from './responseCodes/ResponseCodeRow'
import isEmpty from 'lodash/isEmpty'
import CollapsibleHeader from './CollapsibleHeader'
import DocumentationDisplay from 'components/dashboard/documentation/DocumentationDisplay'
import EndpointExamples from 'components/dashboard/documentation/EndpointExamples'
import InlineTooltip from '../../ui/InlineTooltip'

class KintoBlockEndpointDetails extends Component {
  static propTypes = {
    selectedEndpoint: PropTypes.object.isRequired,
    fetchKintoBlockDocumentationEndpoint: PropTypes.func.isRequired
  }

  state = {
    selectedTab: 'restful',
    fake200Expanded: true
  }

  componentDidMount() {
    this.props.fetchKintoBlockDocumentationEndpoint(this.props.endpointId)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.endpointId !== nextProps.endpointId) {
      this.props.fetchKintoBlockDocumentationEndpoint(nextProps.endpointId)
    }
  }

  refreshScroll = () => {
    this.scrollArea.refresh()
  }

  fakeToggleExpand = () => {
    this.setState(prevState => ({
      fake200Expanded: !prevState.fake200Expanded
    }))
  }

  render() {
    const { selectedEndpoint } = this.props
    if (!selectedEndpoint.id) return null

    const protocols = {
      restful: 'restful',
      grpc: 'GRPC',
      graphql: 'GRAPHQL'
    }

    const {
      headers = {},
      params = {},
      success = [],
      error = []
    } = selectedEndpoint

    return (
      <div className="endpoint-details-scroll">
        <ReactIScroll
          iScroll={iscroll}
          ref={iscroll => (this.scrollArea = iscroll)}
          options={{
            scrollbars: true,
            fadeScrollbars: false,
            shrinkScrollbars: 'scale',
            interactiveScrollbars: true,
            mouseWheel: true,
            disableMouse: true,
            disablePointer: true
          }}
        >
          <div className="endpoint-details">
            <div>
              <div className="top">
                <div className="endpoint-name">
                  <span className={`type ${selectedEndpoint.type}`}>
                    {selectedEndpoint.type}
                  </span>
                  <span className="code">{selectedEndpoint.url}</span>
                </div>
                <p>{selectedEndpoint.title}</p>
              </div>

              <div className="documentation-tabs">
                <button
                  type="button"
                  className={`tab GRPC ${
                    this.state.selectedTab === protocols.grpc ? 'active' : ''
                  }`}
                  // onClick={() => this.selectTab(protocols.grpc)} TODO: temporarily disabled
                >
                  <h5>gRPC</h5>
                </button>
                <button
                  type="button"
                  className={`tab GRAPHQL ${
                    this.state.selectedTab === protocols.graphql ? 'active' : ''
                  }`}
                  // onClick={() => this.selectTab(protocols.graphql)} TODO: temporarily disabled
                >
                  <h5>GraphQL</h5>
                </button>
                <button
                  type="button"
                  className={`tab restful ${
                    this.state.selectedTab === protocols.restful ? 'active' : ''
                  }`}
                  // onClick={() => this.selectTab(protocols.restful)}
                >
                  <h5>Restful</h5>
                </button>
              </div>

              {this.state.selectedTab === protocols.restful && (
                <div>
                  <div className={`more-details ${this.state.selectedTab}`}>
                    <div>
                      <EndpointExamples
                        title="Endpoint"
                        text={selectedEndpoint.url}
                        type={selectedEndpoint.type}
                        tooltipText="https://api.kintohub.com/{blockname}/endpoint"
                        isDefinition={true}
                      />
                      {/* <EndpointExamples
                        title="Request Example"
                        text={selectedEndpoint.title}
                        tooltipText="Example request that this API endpoint would accept"
                        isDefinition={false}
                        />
                        <EndpointExamples
                        title="Response Body"
                        text={selectedEndpoint.title}
                        tooltipText="Example response body that this API endpoint would accept"
                        isDefinition={false}
                      /> */}
                    </div>
                    {/* </div>
                    <div className="more-details"> */}
                    {!isEmpty(params.body) && (
                      <div className="parameter-section">
                        <h3>
                          Request Parameters
                          <InlineTooltip
                            trigger="click"
                            text="Required data for the API to process"
                            placement="top"
                          />
                        </h3>
                        <DocumentationDisplay
                          response={params.body}
                          showTitle={false}
                        />
                      </div>
                    )}
                    {!isEmpty(params.url) && (
                      <div className="parameter-section">
                        <h3>
                          URL Parameters
                          <InlineTooltip
                            trigger="click"
                            text="Parameters that go into the URL ie: /example/{id}"
                            placement="top"
                          />
                        </h3>
                        <DocumentationDisplay
                          response={params.url}
                          showTitle={false}
                        />
                      </div>
                    )}
                    {!isEmpty(params.queryString) && (
                      <div className="parameter-section">
                        <h3>
                          Query Parameters
                          <InlineTooltip
                            trigger="click"
                            text="Parameters that go after the URL ie: example?id=5"
                            placement="top"
                          />
                        </h3>
                        <DocumentationDisplay
                          response={params.queryString}
                          showTitle={false}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* GRPC AND GRAPHQL SECTION */}

              {/* {this.state.selectedTab === protocols.grpc ||
                this.state.selectedTab === protocols.graphql ? (
                  <div className={`more-details ${this.state.selectedTab}`}>
                <h3>
                {this.state.selectedTab === protocols.grpc
                ? 'Proto File'
                : 'Schema'}
                </h3>
                <div className="message-box">
                <div className="code">
                {selectedEndpoint.protocol
                ? selectedEndpoint.protocol.message
                : ''}
                </div>
                </div>
                  </div>
              ) : null} */}

              <div className="bottom">
                {!isEmpty(headers.session) && (
                  <CollapsibleHeader
                    refreshScroll={this.refreshScroll}
                    title="Required Session Data"
                    toolTip="Session data required for the API endpoint"
                  >
                    <DocumentationDisplay
                      response={headers.session}
                      showTitle={false}
                    />
                  </CollapsibleHeader>
                )}
                {!isEmpty(headers.exposedSession) && (
                  <CollapsibleHeader
                    refreshScroll={this.refreshScroll}
                    title="Exposed Session Data"
                    toolTip="Session data set upon returning a successful response from the endpoint"
                  >
                    <DocumentationDisplay
                      response={headers.exposedSession}
                      showTitle={false}
                    />
                  </CollapsibleHeader>
                )}
                {!isEmpty(headers.header) && (
                  <CollapsibleHeader
                    refreshScroll={this.refreshScroll}
                    title="Headers"
                    toolTip="Key value paired data required in the header for this endpoint"
                  >
                    <DocumentationDisplay
                      response={headers.header}
                      showTitle={false}
                    />
                  </CollapsibleHeader>
                )}

                {!isEmpty(headers.config) && (
                  <CollapsibleHeader
                    refreshScroll={this.refreshScroll}
                    title="Custom Parameters"
                    toolTip="Key value paired data required by this endpoint and needs to be filled in kintohub"
                  >
                    <DocumentationDisplay
                      response={headers.config}
                      showTitle={false}
                    />
                  </CollapsibleHeader>
                )}

                {!success.length &&
                  (!error.length && (
                    <div>
                      <div>
                        <h3 className="response-code-title">
                          Response Code
                          <InlineTooltip
                            trigger="click"
                            text="Response code number and details following HTTP Status Code standard"
                            placement="top"
                          />
                        </h3>
                      </div>

                      <div
                        className={`response-code fake ${
                          this.state.isExpanded ? 'expanded' : ''
                        } code-200`}
                      >
                        <div className="top" onClick={this.fakeToggleExpand}>
                          <h5>200</h5>
                          <h6>
                            {this.state.fake200Expanded ? 'Collapse' : 'Expand'}
                            <span className="icon expanded" />
                          </h6>
                        </div>
                        {this.state.fake200Expanded && (
                          <div className="bottom">
                            <h5>This response has not been doucmented yet.</h5>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                {success.map((x, i) => (
                  <div key={i}>
                    <h3 className="response-code-title">
                      Response Code
                      <InlineTooltip
                        trigger="click"
                        text="Response code number and details following HTTP Status Code standard"
                        placement="top"
                      />
                    </h3>
                    <ResponseCodeRow
                      refreshScroll={this.refreshScroll}
                      response={x}
                      index={i}
                    />
                  </div>
                ))}
                {error.map((x, i) => (
                  <div key={i}>
                    <h3 className="response-code-title">
                      Response Code
                      <InlineTooltip
                        trigger="click"
                        text="Response code number and details following HTTP Status Code standard"
                        placement="top"
                      />
                    </h3>
                    <ResponseCodeRow
                      refreshScroll={this.refreshScroll}
                      response={x}
                      index={i}
                    />
                  </div>
                ))}
                {/* TAB SECTION */}
              </div>

              {/* RESTFUL TAB SECTION */}
            </div>
          </div>
        </ReactIScroll>
      </div>
    )
  }
}

export default KintoBlockEndpointDetails
