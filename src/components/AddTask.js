import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../actions/Tasks";

const AddTask = () => {
  const initialTaskState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [task, setTask] = useState(initialTaskState);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  const saveTask = () => {
    const { title, description } = task;

    dispatch(createTask(title, description))
      .then(data => {
        setTask({
          id: data.id,
          title: data.title,
          description: data.description,
          published: data.published
        });
        setSubmitted(true);

        console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newTask = () => {
    setTask(initialTaskState);
    setSubmitted(false);
  };
  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTask}>
            Add
          </button>
         

        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={task.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={task.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveTask} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
 
};

export default AddTask;