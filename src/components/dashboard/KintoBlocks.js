import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import KintoBlocksListContainer from 'containers/dashboard/kintoBlocks/KintoBlocksListContainer'
import KintoBlockManageContainer from 'containers/dashboard/kintoBlocks/KintoBlockManageContainer'
import KintoBlockCreateContainer from 'containers/dashboard/kintoBlocks/KintoBlockCreateContainer'
import KintoBlockTypeSelectionContainer from 'containers/dashboard/kintoBlocks/KintoBlockTypeSelectionContainer'
import KintoBlockEndpointsContainer from 'containers/dashboard/documentation/KintoBlockEndpointsContainer'

class Kintoblocks extends Component {
  static propTypes = {
    fetchKintoBlocks: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    data: PropTypes.object,
    kintoBlockBuildsReceive: PropTypes.func.isRequired
  }

  state = {
    isLoaded: false,
    lastFetched: null
  }

  componentDidMount() {
    this.props.fetchKintoBlocks().then(() => {
      this.setState({ isLoaded: true, lastFetched: new Date() })
    })
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.data &&
      nextProps.data &&
      this.props.data.loading &&
      !nextProps.data.loading
    ) {
      this.props.kintoBlockBuildsReceive(nextProps.data.kintoBlockBranches)
    }
  }

  render() {
    const { match } = this.props
    const { isLoaded, lastFetched } = this.state
    return isLoaded ? (
      <div className="kintoblocks-master-container">
        <Route
          path={`${match.url}/list`}
          render={props => (
            <KintoBlocksListContainer lastFetched={lastFetched} {...props} />
          )}
        />
        <Route
          path={`${match.url}/create`}
          component={KintoBlockCreateContainer}
        />
        <Route
          path={`${match.url}/typeselect`}
          component={KintoBlockTypeSelectionContainer}
        />
        <Route
          path={`${match.url}/:id/versions/:ver/:type`}
          component={KintoBlockManageContainer}
        />
        <Route
          path={`${
            match.url
          }/:id/version/:version/:type/endpoints/documentation`}
          component={KintoBlockEndpointsContainer}
        />
      </div>
    ) : null
  }
}

export default Kintoblocks
