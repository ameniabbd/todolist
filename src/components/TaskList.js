import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  retrieveTask,
  findTaskByTitle,
  deleteAllTasks,
} from "../actions/Tasks";

const TaskList = () => {
  const [currentTask, setCurrentTask] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  const tasks = useSelector(state => state.task);
  console.log(tasks)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveTask())
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const refreshData = () => {
    setCurrentTask(null);
    setCurrentIndex(-1);
  };

  const setActiveTask = (task, index) => {
    setCurrentTask(task);
    setCurrentIndex(index);
  };

  const removeAllTask = () => {
    dispatch(deleteAllTasks())
      .then(response => {
        console.log(response);
        refreshData();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    refreshData();
    dispatch(findTaskByTitle(searchTitle));
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="form-control mr-sm-2"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Tasks List</h4>

        <ul className="list-group">
          {tasks &&
            tasks.map((task, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveTask(task, index)}
                key={index}
              >
                {task.title}
              </li>
            ))}
        </ul>

        <button className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </button>
      </div>
      <div className="col-md-6">
        {currentTask ? (
          <div>
            <h4>Task</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>
              {currentTask.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>
              {currentTask.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>
              {currentTask.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/tasks/" + currentTask.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Task...</p>
          </div>
        )}
      </div>
     
    </div>
  );
};

export default TaskList;