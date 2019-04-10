import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./LoginRegisterRoutes/Login";
import Register from "./LoginRegisterRoutes/Register";
import Home from "./HomeDashboard";
import Landing from "./Landing";
import { PAGE_NOT_FOUND } from "../utils/ConstantKeywords/errorConstants";

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/home" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route
          path="*"
          render={() => {
            return <h1>{PAGE_NOT_FOUND}</h1>;
          }}
        />
      </Switch>
    </div>
  );
};

export default Routes;
