import * as React from "react";
import "./App.css";
import {
  Switch,
  Route,
  withRouter,
  RouteComponentProps,
  Link,
} from "react-router-dom";
import Home from "./components/Home";
import Create from "./components/customer/Create";
import Edit from "./components/customer/Edit";

const App: React.FC<RouteComponentProps<any>> = ({}) => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to={"/"}> Home </Link>
          </li>
          <li>
            <Link to={"/create"}> Create Customer </Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path={"/"} exact component={Home} />
        <Route path={"/create"} exact component={Create} />
        <Route path={"/edit/:id"} exact component={Edit} />
      </Switch>
    </div>
  );
};
export default withRouter(App);
