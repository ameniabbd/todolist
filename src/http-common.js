import axios from "axios";

export default axios.create({
  baseURL: "https://61b1c8abc8d4640017aaeed7.mockapi.io/api/tasks",
  headers: {
    "Content-type": 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
  }
});