import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Users from "./Users";
import App from "../components/App";

const Routes = () => {
  return (
    <Route path="/" exact component={App}>
      <Route path="/Home" exact component={Home} />
      <Route path="/about/" component={About} />
      <Route path="/users/" component={Users} />
    </Route>
  );
};

export default Routes;
