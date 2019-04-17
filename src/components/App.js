import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Routes from "../routes";
import firebase from "firebase/app";
import "firebase/auth";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        window.localStorage.setItem("musicAppSignedIn", true);
      } else {
        window.localStorage.setItem("musicAppSignedIn", false);
      }
      this.handleState();
    });
  }

  handleState() {
    this.setState({
      isLoading: false
    });
  }

  render() {
    if (this.state.isLoading === true) {
      return (
        <div class="d-flex justify-content-center spinner-body">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      );
    }
    return (
      <div className="main-container">
        <Routes />
      </div>
    );
  }
}

export default App;
