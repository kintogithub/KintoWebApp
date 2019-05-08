import React, { Component } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { SortableElement, SortableHandle } from 'react-sortable-hoc'
import { timeDayMonthYearShort } from 'constants/dateFormat'
import {
  deploymentScrollMarkers,
  kintoBlockScrollMarkers
} from 'constants/scrollMarkers'
import { deploymentState, deploymentType } from 'constants/deploymentStates'
import { truncate, replaceCharactersForDisplay } from 'helpers/stringHelper'
import { Button } from 'components/forms'

const DragHandle = SortableHandle(() => <span className="icon drag-handle" />)

class SideBarCard extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    selectedItemId: PropTypes.string,
    id: PropTypes.string.isRequired,
    topPageItem: PropTypes.string,
    envIndex: PropTypes.number.isRequired,
    scrollToSection: PropTypes.func,
    onPromote: PropTypes.func,
    goToItem: PropTypes.func,
    isSimple: PropTypes.bool,
    isDeployments: PropTypes.bool
  }

  expandAndSetSelectedItem = () => {
    if (this.props.isDeployment) {
      this.props.goToItem(this.props.item.environmentId)
    } else {
      const { item, itemId } = this.props
      this.props.goToItem(item.url, itemId)
    }
  }

  scrollToSection = (e, idToScroll) => {
    e.stopPropagation()
    this.props.scrollToSection(idToScroll)
  }

  render() {
    const {
      item,
      selectedItemId,
      id,
      topPageItem,
      envIndex,
      onPromote,
      isSimple,
      isDeployment,
      isDraggable
    } = this.props

    let statusClass = item.lastStatus ? item.lastStatus.toLowerCase() : ''

    if (
      item.lastStatus === deploymentState.success &&
      item.deploymentType === deploymentType.shutdown
    ) {
      statusClass = ''
    }

    const isActive = isDeployment
      ? item.environmentId === selectedItemId
      : item.name === selectedItemId
    const isSectionActiveClass = id => (id === topPageItem ? 'active' : '')
    const scrollMarkers = isDeployment
      ? deploymentScrollMarkers
      : kintoBlockScrollMarkers
    return (
      <div className="sidebar-card-container">
        {envIndex !== 0 &&
          isDeployment && (
            <Button
              overwriteClass="button-promote"
              type="button"
              disabled={!item.isLive}
              onClick={() => onPromote(envIndex - 1, item.deploymentVersion)}
            />
          )}
        <div
          className={`sidebar-card ${isActive ? 'active' : ''} ${statusClass} ${
            isDeployment ? 'deployment' : 'kintoblock'
          }`}
          onClick={this.expandAndSetSelectedItem}
          id={id}
        >
          <div className="heading">
            <div>
              <h5 className="caps bold">
                {item.name ? replaceCharactersForDisplay(item.name) : ''}
              </h5>
              {isDeployment ? (
                <h5>{item.isLive ? item.deploymentVersion : ''}</h5>
              ) : (
                <div>
                  {item.activeBuildId ? (
                    <div className="build-information">
                      <div className="icon build" />
                      <h5>#{truncate(item.activeBuildId, 5)}</h5>
                    </div>
                  ) : (
                    <div className="build-information">
                      <div className="icon lapis-alert" />
                      <h4 className="code normal">NO SUCCESSFUL BUILD</h4>
                    </div>
                  )}
                  <h5>{item.note}</h5>
                </div>
              )}
            </div>
            {isDraggable && <DragHandle />}
          </div>
          {isDeployment || item.activeBuildId ? <div className="line" /> : null}

          {isDeployment ? (
            <div className="date-and-time">
              <p>
                {item.isLive
                  ? moment(item.completionTime).format(timeDayMonthYearShort)
                  : 'No Deployment'}
              </p>
              <span className={`check-icon ${statusClass}`} />
            </div>
          ) : (
            <>
              {item.lastUpdated && (
                <div className="date-and-time">
                  <p>{item.lastUpdated}</p>
                </div>
              )}
            </>
          )}

          {isActive && !isSimple ? (
            <div className="page-markers">
              {scrollMarkers.map((marker, i) => (
                <div
                  className={`page-section-link ${isSectionActiveClass(
                    marker.id
                  )}`}
                  onClick={e => this.scrollToSection(e, marker.id)}
                  key={i}
                >
                  {marker.title}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    )
  }
}

export default SortableElement(props => <SideBarCard {...props} />)
