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
        <div className="d-flex justify-content-center spinner-body">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
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
