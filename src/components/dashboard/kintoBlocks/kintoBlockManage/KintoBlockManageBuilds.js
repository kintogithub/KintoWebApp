import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Tooltip from 'rc-tooltip'
import moment from 'moment'
import { timeDayMonthYearShort } from 'constants/dateFormat'
import { SUCCESS } from 'constants/buildStates'
import { truncate } from 'helpers/stringHelper'
import { Button } from 'components/forms'
import BuildRow from './kintoBlockManageForm/BuildRow'

class KintoBlockManageBuilds extends Component {
  static propTypes = {
    kintoBlock: PropTypes.object.isRequired,
    isVersionTag: PropTypes.bool,
    refreshCommits: PropTypes.func.isRequired,
    retryBuild: PropTypes.func.isRequired,
    kintoBlockBuilds: PropTypes.array.isRequired,
    onCreateTagOpen: PropTypes.func.isRequired
  }

  getActiveBuild() {
    return this.props.kintoBlockBuilds.find(b => b.status === SUCCESS)
  }

  render() {
    const {
      isVersionTag,
      kintoBlock,
      selectedWorkspace,
      refreshCommits,
      retryBuild,
      kintoBlockBuilds,
      onCreateTagOpen
    } = this.props
    const activeBuild = this.getActiveBuild()

    return (
      <div className={`form-body simple top ${isVersionTag ? 'tagged' : ''}`}>
        <div className="field-input-wrapper">
          <div className="label">
            {isVersionTag ? 'tagged build' : 'latest build'}
            <Tooltip
              placement="top"
              overlay="Only a successful build can be tagged."
              trigger="click"
            >
              <span className="tooltip" />
            </Tooltip>
          </div>
          <div
            className={`commit-details main ${
              kintoBlock.isExample ? 'example' : ''
            }`}
          >
            <div className="state-and-time">
              <div className="main-with-icon">
                <Tooltip placement="top" overlay="Build" trigger="click">
                  <div className="icon build med-icon" />
                </Tooltip>
                {activeBuild ? (
                  <div>
                    <span className="uppercase">
                      {truncate(activeBuild.id, 5)} -{' '}
                    </span>
                    {moment(activeBuild.createdAt).format(
                      timeDayMonthYearShort
                    )}
                  </div>
                ) : (
                  <div className="commit-details no-commit">
                    No build was built successfully yet.
                  </div>
                )}
              </div>
            </div>
            {!isVersionTag && (
              <Button
                className="button-refresh-commits"
                type="button"
                buttonType="secondary"
                onClick={refreshCommits}
              >
                Build Latest Commit
              </Button>
            )}
          </div>
        </div>

        <div className="field-input-wrapper commit-list">
          <div className="label">recent builds</div>

          <ul className="unstyled-list">
            {kintoBlockBuilds.length ? (
              <div>
                <ul className="builds-heading unstyled-list">
                  <li>
                    <h5>
                      <span className="icon build-dark med-icon" /> Build
                    </h5>
                  </li>
                  <li>
                    <h5>
                      <span className="icon tag-icon-dark med-icon" /> Tag Build
                    </h5>
                  </li>
                  <li>
                    <h5>
                      <span className="icon commit-icon-dark med-icon" /> Commit
                    </h5>
                  </li>
                  <li>
                    <h5 className="time-and-date">Time & date</h5>
                  </li>
                  <li>
                    <h5>Build log</h5>
                  </li>
                  <li>
                    <h5>Status</h5>
                  </li>
                </ul>

                {kintoBlockBuilds.map((b, i) => (
                  <BuildRow
                    index={i}
                    key={b.id}
                    build={b}
                    activeBuild={activeBuild}
                    retryBuild={retryBuild}
                    onCreateTagOpen={onCreateTagOpen}
                    kintoBlock={kintoBlock}
                    selectedWorkspace={selectedWorkspace}
                    isVersionTag={isVersionTag}
                  />
                ))}
              </div>
            ) : (
              <div className="commit-details no-commit">
                No commit has been made on your repo source
              </div>
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default KintoBlockManageBuilds
