import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Routes from "../routes";
import firebase from "firebase/app";
import "firebase/auth";

// import { library } from "@fortawesome/fontawesome-svg-core";
// import { faStroopwafel, faCamera } from "@fortawesome/free-solid-svg-icons";

// library.add(faStroopwafel, faCamera);

class App extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        window.localStorage.setItem("musicAppSignedIn", true);
      } else {
        window.localStorage.setItem("musicAppSignedIn", false);
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
