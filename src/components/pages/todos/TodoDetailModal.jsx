import React from 'react'
import { Modal } from 'react-bootstrap'

const TodoDetailModal = ({todo, showDetailModal, handleCloseDetailModal}) => {
  return (
    <div>
      <Modal show={showDetailModal} onHide={handleCloseDetailModal} size='lg' centered>
        <Modal.Header closeButton>
          <Modal.Title>Todo Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>{todo?.title}</h2>
          <p>{todo?.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleCloseDetailModal} className="bg-custom-secondary border-0 px-3 py-2 rounded">Close</button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default TodoDetailModal
