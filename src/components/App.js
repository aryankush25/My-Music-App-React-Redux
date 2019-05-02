import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Routes from "../routes";
import { connect } from "react-redux";
import { setAppIsLoadingAction } from "../redux/actions/actionApp";
import firebase from "firebase/app";
import "firebase/auth";
import ShowLoadingComponent from "../components/ShowLoadingComponent/index";

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
      this.props.setAppIsLoadingAction(false);
    });
  }

  render() {
    return (
      <ShowLoadingComponent isLoading={this.props.appIsLoading}>
        <div className="main-container">
          <Routes />
        </div>
      </ShowLoadingComponent>
    );
  }
}

const mapStateToProps = state => {
  const { appIsLoading } = state.app;
  return { appIsLoading };
};

const mapDispatchToProps = dispatch => {
  return {
    setAppIsLoadingAction: isLoading =>
      dispatch(setAppIsLoadingAction(isLoading))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
