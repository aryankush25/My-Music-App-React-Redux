import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
// import NavBar from "../containers/NavBar";
// import Home from "./Home";
// import About from "./About";
// import Users from "./Users";

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />

        {/* <Route
          path="/"
          render={props => {
            return (
              <div>
                <NavBar {...props}>
                  <Route path="/home" exact component={Home} />
                  <Route path="/about" exact component={About} />
                  <Route path="/users" exact component={Users} />
                </NavBar>
              </div>
            );
          }}
        /> */}
      </Switch>
    </div>
  );
};

export default Routes;
