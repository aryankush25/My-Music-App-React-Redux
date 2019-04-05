import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./LoginRegisterRoutes/Login";
import Register from "./LoginRegisterRoutes/Register";

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
      </Switch>
    </div>
  );
};

export default Routes;
