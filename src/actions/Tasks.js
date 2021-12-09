import {
    CREATE_TASK,
    RETRIEVE_TASK,
    UPDATE_TASK,
    DELETE_TASK,
    DELETE_ALL_TASK,
  } from "./ActionType";
  
  import TaskService from "../services/Service";
  
  export const createTask = (title, description) => async (dispatch) => {
    try {
      const res = await TaskService.create({ title, description });
  
      dispatch({
        type: CREATE_TASK,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  
  export const retrieveTask = () => async (dispatch) => {
    try {
      const res = await TaskService.getAll();
    
      dispatch({
        type: RETRIEVE_TASK,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateTask = (id, data) => async (dispatch) => {
    try {
      const res = await TaskService.update(id, data);
  
      dispatch({
        type: UPDATE_TASK,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteTask = (id) => async (dispatch) => {
    try {
      await TaskService.remove(id);
  
      dispatch({
        type: DELETE_TASK,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const deleteAllTasks= () => async (dispatch) => {
    try {
      const res = await TaskService.removeAll();
  
      dispatch({
        type: DELETE_ALL_TASK,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const findTaskByTitle = (title) => async (dispatch) => {
    try {
      const res = await TaskService.findByTitle(title);
  
      dispatch({
        type: RETRIEVE_TASK,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };