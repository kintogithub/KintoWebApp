import React, { PureComponent } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

class CopyButton extends PureComponent {
  state = {
    copied: false
  }

  onCopyText = () => {
    this.setState({ copied: true })
    setTimeout(() => this.setState({ copied: false }), 2000)
  }

  render() {
    const { text, type, buttonText } = this.props
    const displayText = buttonText ? buttonText : 'Copy'
    return (
      <CopyToClipboard text={text} onCopy={this.onCopyText}>
        <button
          className={`button copy ${type} ${this.state.copied ? 'copied' : ''}`}
          type="button"
        >
          {this.state.copied ? '\u2714' : displayText}
        </button>
      </CopyToClipboard>
    )
  }
}

export default CopyButton
