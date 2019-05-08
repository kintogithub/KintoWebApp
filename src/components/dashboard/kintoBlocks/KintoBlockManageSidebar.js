import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import iScroll from 'iscroll'
import ReactIScroll from 'react-iscroll'
import { getPageUrl } from 'helpers/urlHelper'
import { pages } from 'constants/pages'
import { replaceCharactersForId } from 'helpers/stringHelper'
import { BRANCH, TAG } from 'constants/version'
import SideBarList from '../../ui/ContextualSidebar/SideBarList'

class KintoBlockManageSidebar extends Component {
  state = {
    filterText: null,
    selectedTab: this.props.versionType.toUpperCase()
  }

  goToBranchOrTag = (url, id) => {
    this.props.push(url)
    const editedId = replaceCharactersForId(id)
    this.scrollItemToTop(editedId)
  }

  scrollItemToTop = id => {
    const iscroll = this.scrollArea.getIScroll()
    iscroll.scrollToElement(`#ID-${id}`, 200, 0, -50)
  }

  setTab = type => {
    this.setState({ selectedTab: type })
  }

  render() {
    const {
      selectedWorkspace,
      listOfBranches,
      listOfTags,
      topPageItem,
      scrollToSection,
      selectedKintoBlockItemName
    } = this.props

    const backUrl = getPageUrl(pages.dashboardKintoBlocksList, {
      workspaceId: selectedWorkspace
    })

    return (
      <div className="kintoblock-manage-sidebar">
        <div className="top-fixed">
          <Link to={backUrl} className="return-link">
            <img src="/images/icon-nav-back.svg" alt="" />
            Back to Main Menu
          </Link>
          <div className="line" />
          <div className="title">
            <div
              className={`branch-tab ${
                this.state.selectedTab === BRANCH ? 'active' : ''
              }`}
              onClick={() => this.setTab(BRANCH)}
            >
              <div className="icon branch-icon" />
              <h5>BRANCHES</h5>
            </div>
            <div
              className={`tag-tab ${
                this.state.selectedTab === TAG ? 'active' : ''
              }`}
              onClick={() => this.setTab(TAG)}
            >
              <h5>TAGS</h5>
              <div className="icon tag-icon" />
            </div>
          </div>
        </div>

        <div className="contextual-sidebar-list">
          <ReactIScroll
            iScroll={iScroll}
            ref={scrollArea => (this.scrollArea = scrollArea)}
            options={{
              scrollbars: true,
              mouseWheel: true,
              fadeScrollbars: true,
              shrinkScrollbars: 'scale',
              interactiveScrollbars: true,
              disableTouch: true,
              disablePointer: true,
              disableMouse: true
            }}
          >
            <SideBarList
              list={
                this.state.selectedTab === BRANCH ? listOfBranches : listOfTags
              }
              topPageItem={topPageItem}
              selectedItemId={selectedKintoBlockItemName}
              goToItem={this.goToBranchOrTag}
              onOpenForm={this.toggleDeploymentModal}
              onMiniNavigationClick={scrollToSection}
              onSortEnd={this.onEnvironmentSort}
              useDragHandle={true}
              isDraggable={false}
              isSimple={false}
              isDeployment={false}
              selectedTab={this.state.selectedTab}
            />
          </ReactIScroll>
        </div>
      </div>
    )
  }
}

export default KintoBlockManageSidebar
