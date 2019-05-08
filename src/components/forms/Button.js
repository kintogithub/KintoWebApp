import React from 'react'
import PropTypes from 'prop-types'

const Button = props => {
  let {
    buttonType,
    isSubmitted,
    type,
    image,
    disabled,
    onClick,
    children,
    className,
    overwriteClass
  } = props

  type = type || 'submit'
  buttonType = buttonType || 'default'

  const buttonHandler = e => {
    if (onClick && !isSubmitted && !disabled) {
      onClick(e)
    }
  }

  if (isSubmitted) {
    buttonType = 'submitted'
  }

  const btnClass =
    overwriteClass ||
    `button ${buttonType} ${disabled ? 'disabled' : ''} ${
      className ? className : ''
    }`

  return (
    <button
      type={type}
      className={btnClass}
      onClick={buttonHandler}
      disabled={!!disabled}
      data-test={props['data-test']}
    >
      {image ? <img src={image} alt="" /> : ''}
      {children}
    </button>
  )
}
Button.propType = {
  buttonType: PropTypes.string,
  type: PropTypes.string,
  isSubmitted: PropTypes.bool,
  image: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  'data-test': PropTypes.string,
  overwriteClass: PropTypes.string
}

export default Button
