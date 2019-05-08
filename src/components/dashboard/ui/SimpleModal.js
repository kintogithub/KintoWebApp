// Example options
// {
//   onConfirm: someFunctionCallBack() // required
//   text: { title, message, subtitle, confirmText, cancelText, confirmClass, cancelClass } // at least one is required
//   image: { src, description }
//   isOpen: boolean // required
//   onClose: functionToCloseCallBack() // optional
//   className: "super-special-modal-class" // optional
// }

import React from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'
import Tooltip from 'rc-tooltip'

const SimpleModal = ({ options }) => {
  return (
    <Modal
      isOpen={options.isOpen}
      className={`kh-modal ${options.className ? options.className : ''}`}
    >
      <div className="kh-modal-title">{options.text.title}</div>
      <div className="kh-modal-body">
        {options.text.subtitle && (
          <div className="full-width-field">
            <h3>
              {options.text.subtitle}
              {options.toolTip && (
                <Tooltip
                  placement="top"
                  overlay={options.toolTip.text}
                  trigger="hover"
                >
                  <a
                    className="tooltip-wrap"
                    href={options.toolTip.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="tooltip" />
                  </a>
                </Tooltip>
              )}
            </h3>
          </div>
        )}

        {options.text.message && (
          <div className="full-width-field">
            <h5>{options.text.message}</h5>
          </div>
        )}

        {options.image && (
          <div className="full-width-field image">
            <img src={options.image.src} alt={options.image.description} />
          </div>
        )}

        <div className="kh-modal-actions">
          {options.text.cancelText && (
            <button
              type="button"
              onClick={() => options.onClose()}
              className={`button ${
                options.text.cancelClass ? options.text.cancelClass : ''
              }`}
            >
              {options.text.cancelText}
            </button>
          )}

          {options.text.confirmText && (
            <button
              onClick={() => options.onConfirm()}
              className={`button ${
                options.text.confirmClass ? options.text.confirmClass : ''
              }`}
            >
              {options.text.confirmText}
            </button>
          )}

          {options.link && (
            <a
              href={options.link.href}
              className={`button ${
                options.link.linkClass ? options.link.linkClass : ''
              }`}
            >
              {options.link.linkText}
            </a>
          )}
        </div>
      </div>
    </Modal>
  )
}

SimpleModal.propTypes = {
  options: PropTypes.object.isRequired
}

export default SimpleModal
