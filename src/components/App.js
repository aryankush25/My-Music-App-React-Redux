import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Routes from "../routes";
import { connect } from "react-redux";
import { setIsLoading } from "../redux/actions/actionIsLoading";
import firebase from "firebase/app";
import "firebase/auth";

class App extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      const musicAppSiginingIn = window.localStorage.getItem(
        "musicAppSiginingIn"
      );
      if (user && musicAppSiginingIn !== "true") {
        window.localStorage.setItem("musicAppSignedIn", true);
      } else {
        window.localStorage.setItem("musicAppSignedIn", false);
      }
      this.props.setIsLoading(false);
    });
  }

  render() {
    if (this.props.isLoading === true) {
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

const mapStateToProps = state => {
  const { isLoading } = state;
  return { isLoading };
};

const mapDispatchToProps = dispatch => {
  return {
    setIsLoading: isLoading => dispatch(setIsLoading(isLoading))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
