import React, { PureComponent } from 'react'
import CircularProgressbar from 'react-circular-progressbar'
import PropTypes from 'prop-types'

const CustomProgressBar = props => {
  const { children, extraClass, ...otherProps } = props
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}
    >
      <div
        className={extraClass}
        style={{ position: 'absolute', width: '100%', height: '100%' }}
      >
        <CircularProgressbar {...otherProps} />
      </div>
      <div
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {props.children}
      </div>
    </div>
  )
}

class ProgressBar extends PureComponent {
  static propTypes = {
    percentage: PropTypes.number.isRequired,
    endColor: PropTypes.string.isRequired,
    startColor: PropTypes.string.isRequired,
    gradientId: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired,
    extraClass: PropTypes.string.isRequired
  }

  render() {
    const {
      percentage,
      endColor,
      startColor,
      gradientId,
      children,
      extraClass
    } = this.props
    const gradientTransform = `rotate(90)`
    return (
      <div className="progress-bar">
        <svg style={{ height: 0, width: 0 }}>
          <defs>
            <linearGradient
              id={gradientId}
              gradientTransform={gradientTransform}
            >
              <stop offset="0%" stopColor={startColor} />
              <stop offset="100%" stopColor={endColor} />
            </linearGradient>
          </defs>
        </svg>
        <CustomProgressBar
          percentage={percentage}
          strokeWidth="15"
          styles={{
            path: {
              stroke: `url(#${gradientId})`,
              height: '100%',
              strokeLinecap: 'butt'
            },
            trail: { stroke: '#556F7D' }
          }}
          extraClass={extraClass}
        >
          {children}
        </CustomProgressBar>
      </div>
    )
  }
}

export default ProgressBar
