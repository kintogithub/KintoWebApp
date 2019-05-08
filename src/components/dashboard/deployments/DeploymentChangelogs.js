import React, { Component } from 'react'
import ChangelogRow from './deploymentChangelogs/ChangelogRow'
import PropTypes from 'prop-types'

class DeploymentChangelogs extends Component {
  static propTypes = {
    formattedBlocks: PropTypes.array.isRequired,
    newBlocks: PropTypes.array,
    deletedBlocks: PropTypes.array,
    versionList: PropTypes.array.isRequired,
    deployment: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired
  }

  state = {
    oldVersionSelect: '',
    newVersionSelect: ''
  }

  componentDidMount() {
    const { versionList } = this.props
    this.props.deploymentSelect(this.props.id)
    if (!versionList[1]) return
    this.getChangelogs(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.id !== nextProps.id) {
      this.props.deploymentSelect(nextProps.id)
      this.getChangelogs(nextProps)
    }
  } // necessary for reload after version selection

  getChangelogs = ({ id, versionList }) => {
    this.props.getKintoAppChangelogs(
      this.props.id,
      versionList[0],
      versionList[1]
    )
    this.setState({
      oldVersionSelect: versionList[0],
      newVersionSelect: versionList[1]
    })
  }

  updateOldVersion = e => {
    this.setState({
      oldVersionSelect: e.target.value
    })
    this.props.getKintoAppChangelogs(
      this.props.id,
      e.target.value,
      this.state.newVersionSelect
    )
  }

  updateNewVersion = e => {
    this.setState({
      newVersionSelect: e.target.value
    })
    this.props.getKintoAppChangelogs(
      this.props.id,
      this.state.oldVersionSelect,
      e.target.value
    )
  }

  render() {
    const {
      formattedBlocks,
      newBlocks,
      deletedBlocks,
      versionList,
      deployment
    } = this.props
    const numberOfBlocks = formattedBlocks ? formattedBlocks.length : ''
    return (
      <div className="changelogs">
        <div className="page-title">
          <h2>{deployment.name}</h2>
        </div>

        <div className="changelog-wrapper">
          <div className="changelogs-title">
            <h3>Compare Versions</h3>
          </div>

          {versionList[1] ? (
            <div className="changelogs-body">
              <div className="selectors">
                <div className="old-version">
                  <label htmlFor="oldVersion">
                    original application version
                  </label>
                  <select
                    name="oldVersion"
                    id="oldVersion"
                    value={this.state.oldVersionSelect}
                    onChange={this.updateOldVersion}
                  >
                    {versionList.map((v, i) => (
                      <option key={i} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="new-version">
                  <label htmlFor="newVersion">new application version</label>
                  <select
                    name="newVersion"
                    id="newVersion"
                    value={this.state.newVersionSelect}
                    onChange={this.updateNewVersion}
                  >
                    {versionList.map((v, i) => (
                      <option key={i} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {formattedBlocks && (
                <div>
                  <div className="modified-blocks">
                    <h3>Modified KintoBlocks ({numberOfBlocks})</h3>
                    <div className="key">
                      <h6 className="removed">
                        removed <span className="key-icon removed" />
                      </h6>
                      <h6 className="added">
                        added <span className="key-icon added" />
                      </h6>
                      <h6 className="modified">
                        modified <span className="key-icon modified" />
                      </h6>
                    </div>
                  </div>

                  {formattedBlocks &&
                    formattedBlocks.map((block, index) => (
                      <div
                        key={index}
                        className="section modified-block-details"
                      >
                        <div className="header">
                          <div className="kintoblock-icon" />
                          <h3>{block.displayName}</h3>
                        </div>
                        <div className="details">
                          {block.versionChanges.map((c, i) => (
                            <div key={i} className="version changes">
                              <div className="section-heading">
                                <h4>
                                  <div
                                    className={`tag-icons ${
                                      c.branchOrTag === 'BOTH'
                                        ? 'tag, branch & commit'
                                        : c.branchOrTag
                                    }`}
                                  >
                                    <div className="icon tag" />
                                    <div className="icon branch" />
                                    <div className="icon commit" />
                                  </div>
                                  {c.branchOrTag === 'BOTH'
                                    ? 'tag, branch & commit'
                                    : c.branchOrTag}
                                </h4>
                                <div className="line" />
                              </div>
                              <ChangelogRow
                                action={c.action}
                                oldValues={c.old}
                                newValues={c.new}
                                type={c.type}
                                branchOrTag={c.branchOrTag}
                              />
                            </div>
                          ))}
                          {block.customParams.length && (
                            <div className="section-heading">
                              <h4>custom parameters</h4>
                              <div className="line" />
                            </div>
                          )}

                          {block.customParams.map((c, i) => (
                            <div key={i} className="param changes">
                              <ChangelogRow
                                action={c.action}
                                oldValues={c.old}
                                newValues={c.new}
                                type={c.type}
                              />
                            </div>
                          ))}

                          {block.hardwareRequirements.length ? (
                            <div className="section-heading">
                              <h4>hardware requirements</h4>
                              <div className="line" />
                            </div>
                          ) : null}

                          {block.hardwareRequirements.map((c, i) => (
                            <div key={i} className="hardware changes">
                              <ChangelogRow
                                action={c.action}
                                oldValues={c.old}
                                newValues={c.new}
                                type={c.type}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {newBlocks && (
                <div>
                  <h3>New KintoBlocks ({newBlocks.length})</h3>

                  {newBlocks.map((block, index) => (
                    <div key={index} className="section new-block">
                      <div className="header">
                        <div className="kintoblock-icon" />
                        <div>
                          <h3>{block.blockName}</h3>
                          <h6>{block.blockVersion.name}</h6>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {deletedBlocks && (
                <div className="section removed">
                  <h3>Removed KintoBlocks ({deletedBlocks.length})</h3>

                  {deletedBlocks.map((block, index) => (
                    <div key={index} className="section deleted-block">
                      <div className="header">
                        <div className="kintoblock-icon deleted" />
                        <div>
                          <h3>{block.blockName}</h3>
                          <h6>{block.blockVersion.name}</h6>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="no-changelog-message">
              <div className="inner">
                <h4>At least two versions of this application are needed</h4>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default DeploymentChangelogs
