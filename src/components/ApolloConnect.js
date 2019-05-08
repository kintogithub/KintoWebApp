import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { split, ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { InMemoryCache } from 'apollo-cache-inmemory'

class ApolloConnect extends Component {
  static propTypes = {
    authToken: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
    const httpLink = new HttpLink({
      uri: `${process.env.REACT_APP_SERVER_URL}/graphql`
    })

    // Create a WebSocket link:
    const wsLink = new WebSocketLink({
      uri:
        process.env.REACT_APP_GATEWAY_WEBSOCKET_URL +
        `?kintok=${this.props.authToken}`,
      options: {
        reconnect: true
      }
    })

    // using the ability to split links, you can send data to each link
    // depending on what kind of operation is being sent
    const link = split(
      // split based on operation type
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query)
        return kind === 'OperationDefinition' && operation === 'subscription'
      },
      wsLink,
      httpLink
    )

    const middlewareLink = new ApolloLink((operation, forward) => {
      const token = this.props.authToken
      const authorizationHeader = token ? `Bearer ${token}` : null
      operation.setContext({ headers: { Authorization: authorizationHeader } })
      return forward(operation)
    })

    const httpLinkWithAuthToken = middlewareLink.concat(link)

    // don't cache
    const apolloOptions = {
      watchQuery: {
        fetchPolicy: 'network-only',
        errorPolicy: 'ignore'
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all'
      }
    }
    this.apolloClient = new ApolloClient({
      link: httpLinkWithAuthToken,
      cache: new InMemoryCache(),
      defaultOptions: apolloOptions
    })
  }
  render() {
    return (
      <ApolloProvider client={this.apolloClient}>
        {this.props.children}
      </ApolloProvider>
    )
  }
}

export default ApolloConnect
