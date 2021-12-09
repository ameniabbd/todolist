
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AddTask from "./components/AddTask";
import Task from "./components/Task";
import TaskList from "./components/TaskList";
function App() {
  return (
    <Router>
 

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/tasks"]} component={TaskList} />
          <Route exact path="/add" component={AddTask} />
          <Route path="/tasks/:id" component={Task} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
