import React, { Component } from 'react'
import PropTypes from 'prop-types'
import posed, { PoseGroup } from 'react-pose'
import { SortableContainer } from 'react-sortable-hoc'

import { BRANCH } from 'constants/version'
import SideBarCard from './SideBarCard'
import { replaceCharactersForId } from 'helpers/stringHelper'

const Card = posed.li({
  enter: {
    opacity: 1,
    beforeChildren: true,
    duration: 100
  },
  exit: { opacity: 0 }
})

const HelpMessage = posed.div({
  open: { height: 'auto', opacity: 1, duration: 10, staggerChildren: 100 },
  closed: { height: 0, duration: 10, opacity: 0 }
})

class SideBarList extends Component {
  render() {
    const {
      list,
      topPageItem,
      selectedItemId,
      goToItem,
      onOpenForm,
      onMiniNavigationClick,
      onPromote,
      isSimple,
      isDeployment,
      isDraggable,
      selectedTab
    } = this.props

    return (
      <div
        className={`sidebar-list-inner ${
          isDeployment ? 'deployments' : 'kintoblocks'
        }`}
      >
        {isDeployment && (
          <div className="add-new-environment" onClick={onOpenForm}>
            <h4>Add New Environment</h4>
            <div className="icon plus" />
          </div>
        )}

        <HelpMessage
          initialPose={'closed'}
          pose={list && list.length === 0 ? 'open' : 'closed'}
        >
          {selectedTab === BRANCH ? (
            <div className="help-message">
              <div className="top">
                <div className="icons">
                  <div className="icon hint" />
                  <div className="icon branch" />
                </div>
                <div className="not-created">No branch added / created yet</div>
              </div>
              <div className="line" />
              <div className="bottom">
                <div className="branch-example" />
                <p>
                  To add a branch, click the
                  <span> Add or create a branch…</span> field above to select
                  the branch you want to add to KintoHub.
                </p>
                <p>
                  To create a new branch, click the
                  <span> Add or create a branch…</span>
                  field above, and enter a name for it. The branch will be
                  created on KintoHub and your repo source at the same time.
                </p>
              </div>
            </div>
          ) : (
            <div className="help-message">
              <div className="top">
                <div className="icons">
                  <div className="icon hint" />
                  <div className="icon tag" />
                </div>
                <div className="not-created">No Tag created yet</div>
              </div>
              <div className="line" />
              <div className="bottom">
                <p>
                  Tags make it easy to find an important version of your
                  KintoBlock anytime.
                </p>
                <div className="tag-example" />
                <p>
                  To create a tag, go to a <span>Branch</span> and click the{' '}
                  <span>Tag Build</span> button next to the build you may want
                  to refer to later.
                </p>
              </div>
            </div>
          )}
        </HelpMessage>

        <PoseGroup>
          {list.map((item, index) => {
            const itemId = isDeployment ? item.environmentId : item.name
            return (
              <Card key={index}>
                <SideBarCard
                  id={`ID-${replaceCharactersForId(itemId)}`}
                  itemId={itemId}
                  key={index}
                  index={index}
                  envIndex={index}
                  item={item}
                  topPageItem={topPageItem}
                  selectedItemId={selectedItemId}
                  goToItem={goToItem}
                  scrollToSection={onMiniNavigationClick}
                  onPromote={onPromote}
                  isSimple={isSimple}
                  isDeployment={isDeployment}
                  isDraggable={isDraggable}
                />
              </Card>
            )
          })}
        </PoseGroup>
      </div>
    )
  }
}

SideBarList.propTypes = {
  list: PropTypes.array.isRequired,
  topPageItem: PropTypes.string,
  selectedItemId: PropTypes.string,
  goToItem: PropTypes.func,
  onOpenForm: PropTypes.func,
  onPromote: PropTypes.func,
  isSimple: PropTypes.bool,
  onMiniNavigationClick: PropTypes.func,
  isDeployments: PropTypes.bool
}

export default SortableContainer(props => <SideBarList {...props} />)
