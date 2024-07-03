import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const TodoForm = ({
  showModal,
  handleClose,
  isLoading,
  createTodo,
  updateTodo,
  initialTodo,
}) => {
  const initialValues = {
    title: initialTodo?.title || "",
    description: initialTodo?.description || "",
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Title is required")
      .min(3, "Title must be at least 3 characters long")
      .max(30, "Title is no more than 30 characters long"),
    description: Yup.string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters long")
      .max(150, "Description is no more than 150 characters long"),
  });

  return (
    <div>
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {initialTodo ? "Edit Todo" : "Create a Todo"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              if (initialTodo) {
                await updateTodo({
                  id: initialTodo.id,
                  title: values.title,
                  description: values.description,
                });
              } else {
                await createTodo(values);
              }
              handleClose();
              resetForm();
            }}
          >
            {({ values }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label fw-bold">
                    Title
                    <span className="fw-normal text-danger">(required)</span>
                  </label>
                  <Field
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Title"
                    id="title"
                  />
                  <div className="d-flex justify-content-between w-100">
                    <p className="text-black-50">{values.title.length} / 30</p>
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label fw-bold">
                    Description
                    <span className="fw-normal text-danger">(required)</span>
                  </label>
                  <Field
                    type="text"
                    name="description"
                    className="form-control"
                    placeholder="Description"
                    id="description"
                  />
                  <div className="d-flex justify-content-between w-100">
                    <p className="text-black-50">
                      {values.description.length} / 150
                    </p>
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
                <Modal.Footer>
                  <button
                    type="button"
                    className="bg-custom-secondary border-0 px-3 py-2 rounded"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                  <Button
                    type="submit"
                    className="bg-custom-primary bg-primary text-white border-0 px-3 py-2 rounded"
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TodoForm;
