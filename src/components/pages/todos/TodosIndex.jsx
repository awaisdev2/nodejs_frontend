import React, { useState } from "react";

import TodoForm from "./TodoForm";
import TodoCard from "./TodoCard";
import { useCreateTodo, useUpdateTodo } from "../../queries/todos";

const TodosIndex = () => {
  const [showModal, setShowModal] = useState(false);
  const [editTodo, setEditTodo] = useState(null);

  const { mutateAsync: createTodo, isLoading } = useCreateTodo();
  const { mutateAsync: updateTodo } = useUpdateTodo();

  const handleClose = () => {
    setShowModal(false);
    setEditTodo(null);
  };

  return (
    <div>
      <div className="d-flex justify-content-end my-5 mx-3">
        <button
          type="button"
          className="bg-custom-primary bg-primary text-white border-0 px-4 py-2 rounded"
          onClick={() => setShowModal(true)}
        >
          Add Todo
        </button>
      </div>
      <TodoCard setEditTodo={setEditTodo} setShowModal={setShowModal} />
      {showModal && (
        <TodoForm
          showModal={showModal}
          handleClose={handleClose}
          isLoading={isLoading}
          createTodo={createTodo}
          updateTodo={updateTodo}
          initialTodo={editTodo}
        />
      )}
    </div>
  );
};

export default TodosIndex;
