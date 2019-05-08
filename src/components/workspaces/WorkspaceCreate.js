import React, { Component } from 'react'
import PropTypes from 'prop-types'
import WorkspaceFormContainer from 'containers/workspaces/WorkspaceFormContainer'

class WorkspaceCreate extends Component {
  static propTypes = {
    throwOut: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { addWorkspaceValidation } = this.props
    if (addWorkspaceValidation && !addWorkspaceValidation.isValid) {
      this.props.throwOut(addWorkspaceValidation.message)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.hasFired && !nextProps.addWorkspaceValidation.isValid) {
      this.props.throwOut(nextProps.addWorkspaceValidation.message)
    }
    this.hasFired = true
  }

  render() {
    return (
      <div className="create-workspace">
        <h2>Create New Workspace</h2>
        <div className="what-is-a-workspace">
          <div className="text">
            <h5>What is a Workspace?</h5>
            <h5 className="body-copy">
              A workspace is like a folder where you put all your projects in.
              They can be shared with other people to collaborate on every
              project inside, or just selected projects. You can{' '}
              <a
                href="https://docs.kintohub.com/docs/workspaces"
                target="_blank"
                rel="noopener noreferrer"
              >
                learn more here.
              </a>
            </h5>
          </div>
          <div className="icon" />
        </div>

        <WorkspaceFormContainer isCreate={true} form="WorkspaceFormCreate" />
      </div>
    )
  }
}

export default WorkspaceCreate
