import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Routes from "../routes";
import firebase from "firebase/app";
import "firebase/auth";

class App extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        window.localStorage.setItem("musicAppSignedIn", true);
      }
    });
  }

  render() {
    return (
      <div>
        <Routes />
      </div>
    );
  }
}

export default App;
