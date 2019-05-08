import React, { Component } from 'react'
import Tooltip from 'rc-tooltip'
import PropTypes from 'prop-types'

class InlineTooltip extends Component {
  static propTypes = {
    trigger: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    placement: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
    this.anchor = React.createRef()
  }

  render() {
    const { trigger, text, placement, tooltipClass } = this.props
    return (
      <span ref={this.anchor} className="inline-tooltip">
        <Tooltip
          placement={placement}
          overlay={text}
          trigger={trigger}
          getTooltipContainer={() => this.anchor.current}
        >
          <span className={tooltipClass ? tooltipClass : 'tooltip'} />
        </Tooltip>
      </span>
    )
  }
}

export default InlineTooltip
