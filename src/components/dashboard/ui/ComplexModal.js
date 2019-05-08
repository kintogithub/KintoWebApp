import React from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'

const ComplexModal = ({
  className,
  component,
  data,
  isOpen,
  actions,
  onClose
}) => {
  const MiniModal = component

  return (
    <Modal
      isOpen={isOpen}
      className={`kh-modal ${className ? className : ''}`}
      data={data}
      closeTimeoutMS={300}
    >
      <MiniModal {...actions} {...data} onClose={onClose} />
    </Modal>
  )
}

ComplexModal.propTypes = {
  className: PropTypes.string,
  component: PropTypes.func.isRequired,
  data: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  actions: PropTypes.object,
  onClose: PropTypes.func.isRequired
}

export default ComplexModal
