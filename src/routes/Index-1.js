import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Landing from "./Landing";
import WithHeader from "../containers/LayoutWithHeader";
import Home from "./Home";
import About from "./About";
import Users from "./Users";

const Routes = () => {
  console.log("asdas");
  return (
    <div>
      <Switch>
        <Route path="/login" exact component={Landing} />
        <Route
          path="/"
          render={props => {
            return (
              <div>
                <WithHeader {...props}>
                  <Route path="home" exact component={Home} />
                  <Route path="about" exact component={About} />
                  <Route path="users" exact component={Users} />
                </WithHeader>
              </div>
            );
          }}
        />
      </Switch>
    </div>
  );
};

export default Routes;
