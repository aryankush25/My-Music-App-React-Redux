import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { withRouter } from "react-router-dom";
import "./index.scss";

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to home page</h1>
        <button
          onClick={() => {
            firebase
              .auth()
              .signOut()
              .then(() => {
                window.localStorage.setItem("musicAppSignedIn", false);
                this.props.history.push("/login");
              });
          }}
        >
          Logout
        </button>
      </div>
    );
  }
}

export default withRouter(Home);
