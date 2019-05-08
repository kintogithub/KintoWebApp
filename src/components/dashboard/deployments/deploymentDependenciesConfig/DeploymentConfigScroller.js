import React, { Component } from 'react'
import PropTypes from 'prop-types'
import VisibilitySensor from 'react-visibility-sensor'
import iscroll from 'iscroll'
import IScroll from 'react-iscroll'

class DeploymentConfigScroller extends Component {
  static propTypes = {
    children: PropTypes.array.isRequired,
    itemToScrollTo: PropTypes.string,
    type: PropTypes.string.isRequired, // used to only scroll to items in that type
    onChangeActive: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    const { itemToScrollTo } = nextProps
    if (
      this.props.itemToScrollTo !== itemToScrollTo &&
      itemToScrollTo.startsWith(this.props.type)
    ) {
      this.iScroll.withIScroll(iScrollInstance => {
        iScrollInstance.scrollToElement(`[data-scroll=${itemToScrollTo}]`)
      })
    }
  }

  render() {
    const { children, onChangeActive } = this.props
    return (
      <IScroll
        iScroll={iscroll}
        ref={i => {
          //TODO: find a better approuch
          if (i && i._iScrollInstance) {
            this.iScroll = i
            this.scrollContainer = i._iScrollInstance.wrapper.querySelector(
              'div'
            )
          }
        }}
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
        <div>
          {children.map((c, index) => {
            return (
              <VisibilitySensor
                key={index}
                partialVisibility={false}
                onChange={isShown => onChangeActive(index, isShown)}
              >
                {c}
              </VisibilitySensor>
            )
          })}
        </div>
      </IScroll>
    )
  }
}

export default DeploymentConfigScroller
