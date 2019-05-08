import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { getPageUrl } from 'helpers/urlHelper'
import { pages } from 'constants/pages'
import MemberListCircles from '../ui/MemberListCircles'

class SideBar extends Component {
  static propTypes = {
    isSideBarShownMobile: PropTypes.bool.isRequired,
    list: PropTypes.array.isRequired,
    workspaces: PropTypes.array.isRequired,
    push: PropTypes.func.isRequired,
    selectedWorkspaceId: PropTypes.string,
    selectedWorkspaceMembers: PropTypes.array.isRequired,
    isCurrentUserAdmin: PropTypes.bool.isRequired,
    activePage: PropTypes.string
  }

  navigateTo = (e, url) => {
    e.preventDefault()
    this.props.push(url)
  }

  goToWorkspace = e => {
    this.props.selectWorkspace(e.target.value)
  }

  goToEditWorkspace = () => {
    this.props.push(
      getPageUrl(pages.workspaceEdit, {
        workspaceId: this.props.selectedWorkspaceId
      })
    )
  }

  render() {
    const {
      isSideBarShownMobile,
      selectedWorkspaceId,
      selectedWorkspaceMembers,
      workspaces,
      list,
      isCurrentUserAdmin,
      percentageProgress,
      activePage
    } = this.props

    const isPortalSidebar =
      activePage === pages.dashboardDeploymentsManage ||
      activePage === pages.dashboardDeploymentsConsoleLogs ||
      activePage === pages.dashboardKintoBlocksManage

    return (
      <div
        className={`sidebar ${isSideBarShownMobile ? 'show' : ''} ${
          isPortalSidebar ? 'portal-sidebar' : ''
        }`}
        data-test="sidebar"
      >
        <div id="sidebar-portal" />
        {!isPortalSidebar && (
          <>
            <div className="workspaces-select" data-test={selectedWorkspaceId}>
              <h3 className="uppercase">Workspace</h3>
              <select
                onChange={this.goToWorkspace}
                value={selectedWorkspaceId || ''}
              >
                {workspaces.map((workspace, index) => (
                  <option key={index} value={workspace.id}>
                    {workspace.name}
                  </option>
                ))}
              </select>
              <MemberListCircles
                users={selectedWorkspaceMembers}
                editAction={this.goToEditWorkspace}
                canEdit={isCurrentUserAdmin}
                numberOfItemsShown={6}
                size="small"
              />
            </div>
            <ul className="unstyled-list sidebar-list">
              {list.map((groupItems, key) => (
                <li className="sidebar-section" key={key}>
                  <ul className="sidebar-inner unstyled-list">
                    {groupItems.map((item, key) => (
                      <li
                        className={`sidebar-item ${
                          item.active ? 'selected' : ''
                        }`}
                        key={key}
                      >
                        {item.disabled ? (
                          <div>
                            <h4 className={`${item.className} dimmed`}>
                              {item.title}
                            </h4>
                          </div>
                        ) : (
                          <Link to={item.url}>
                            <h4 className={item.className}>
                              {item.title}
                              {item.isOverview && percentageProgress !== 100 ? (
                                <div>
                                  <h4 className="progress-number">
                                    {percentageProgress}%
                                  </h4>
                                  <span
                                    className={`progress-${percentageProgress} progress`}
                                  />
                                </div>
                              ) : null}
                              {/* testing isOverview flag for sidebar image */}

                              {item.addUrl && (
                                <img
                                  className="item-sub-add"
                                  src={`${
                                    process.env.PUBLIC_URL
                                  }/images/icon-blue-new.svg`}
                                  alt=""
                                  onClick={e => this.navigateTo(e, item.addUrl)}
                                />
                              )}
                            </h4>
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdOiTvoNcQ7xHkcpjkIcQd8atnn58lfzZamgT3yhHYLEAn9CA/viewform?usp=sf_link"
              className="button-feedback zoom-effect"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="icon feedback" />
              <span className="text">Provide Feedback</span>
            </a>
          </>
        )}
      </div>
    )
  }
}

export default SideBar
