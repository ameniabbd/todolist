import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateTask, deleteTask } from "../actions/Tasks";
import TaskService from "../services/Service";

const Task = (props) => {
  const initialTaskState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentTask, setCurrentTask] = useState(initialTaskState);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const getTask = id => {
    TaskService.get(id)
      .then(response => {
        setCurrentTask(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTask(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentTask({ ...currentTask, [name]: value });
  };

  const updateStatus = status => {
    const data = {
      id: currentTask.id,
      title: currentTask.title,
      description: currentTask.description,
      published: status
    };

    dispatch(updateTask(currentTask.id, data))
      .then(response => {
        console.log(response);

        setCurrentTask({ ...currentTask, published: status });
        setMessage("The status was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateContent = () => {
    dispatch(updateTask(currentTask.id, currentTask))
      .then(response => {
        console.log(response);

        setMessage("The task was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const removeTask = () => {
    dispatch(deleteTask(currentTask.id))
      .then(() => {
        props.history.push("/tasks");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentTask ? (
        <div className="edit-form">
          <h4>Task</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentTask.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentTask.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentTask.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentTask.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateStatus(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateStatus(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={removeTask}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateContent}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Task...</p>
        </div>
      )}
    </div>
  );
};

export default Task;