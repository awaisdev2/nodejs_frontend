import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";

import { useGetAllTodos, useDeleteTodo } from "../../queries/todos";
import TodoDetailModal from "./TodoDetailModal";

const DeleteConfirmationModal = ({ show, handleClose, handleConfirm }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this todo?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const TodoCard = ({ setEditTodo, setShowModal }) => {
  const { data: todosData, isFetching } = useGetAllTodos();
  const todosResult = todosData?.slice().reverse();
  const { mutateAsync: deleteTodo } = useDeleteTodo();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleEdit = (todo) => {
    setEditTodo(todo);
    console.log(todo);
    setShowModal(true);
  };
  const openDeleteModal = (todo) => {
    setTodoToDelete(todo);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
  };

  return (
    <div className="container">
      {isFetching && (
        <div className="d-flex justify-content-between w-100 h-100">
          <h6>Fetching...</h6>
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {!isFetching &&
        todosResult?.map((todo, index) => (
          <div
            key={index}
            className="card m-2 bg-custom-secondary cursor-pointer"
            onClick={() => {
              setShowDetailModal(true);
              setSelectedTodo(todo);
            }}
          >
            <div className="card-body">
              <h5 className="card-title">{todo.title}</h5>
              <p className="card-text">{todo.description}</p>
            </div>
            <div className="card-footer d-flex justify-content-end">
              <button
                className="btn btn-danger m-1"
                onClick={(e) => {
                  e.stopPropagation();
                  openDeleteModal(todo)
                }}
              >
                Delete
              </button>
              <button
                className="bg-custom-primary bg-primary text-white border-0 px-3 py-2 rounded m-1"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(todo)
                }}
              >
                Edit
              </button>
            </div>
          </div>
        ))}

      <DeleteConfirmationModal
        show={showDeleteModal}
        handleClose={closeDeleteModal}
        handleConfirm={() => {
          handleDelete(todoToDelete?.id);
          closeDeleteModal();
        }}
      />
      <TodoDetailModal
        todo={selectedTodo}
        showDetailModal={showDetailModal}
        handleCloseDetailModal={handleCloseDetailModal}
      />
    </div>
  );
};

export default TodoCard;
