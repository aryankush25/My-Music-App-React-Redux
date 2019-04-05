import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Routes from "../routes";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Routes />
      </div>
    );
  }
}

export default App;
