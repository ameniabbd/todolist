import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  retrieveTask,
  findTaskByTitle,
  
} from "../actions/Tasks";
import * as Icon from "react-bootstrap-icons";
import "./taskList.styles.css";

const TaskList = () => {
  const [currentTask, setCurrentTask] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  const tasks = useSelector((state) => state.task);
  console.log(tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveTask());
  }, []);

  const onChangeSearchTitle = (e) => {
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

  const findByTitle = () => {
    refreshData();
    dispatch(findTaskByTitle(searchTitle));
  };

  return (
    <div className="container ">
      <div className="col-md-6">
        <h1>TODO LIST</h1>
       
      </div>

      <div className="d-flex justify-content-center align-items-center ">
        <input
          type="text"
          className="form-control "
          placeholder="Search by title"
          value={searchTitle}
          onChange={onChangeSearchTitle}
        />

        <button
          className=" btn btn-info ms-2"
          type="button"
          onClick={findByTitle}
        >
          Search
        </button>
      </div>
      <div>
        
          <Link class=" btn btn-info ms-2 btnAdd" to={"/add"}>Add</Link>
        
      </div>
      <div className="card-header">
        <h4>Task List</h4>
       
      </div>
     
      <div class="card">
        <div class="card-body" className="list-group">
          {tasks &&
            tasks.map((task, index) => (
              <li
                className={
                  "list-group-item d-flex justify-content-between align-items-center  " +
                  (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveTask(task, index)}
                key={index}
              >
                {task.title}
              </li>
            ))}
        </div>
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

            <Link to={"/tasks/" + currentTask.id} className="btn btn-info ms-2">
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
