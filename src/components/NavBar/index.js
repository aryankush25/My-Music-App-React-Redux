import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { withRouter, Link } from "react-router-dom";
import "./style.scss";

class NavBar extends React.Component {
  signOutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        window.localStorage.setItem("musicAppSignedIn", false);
        this.props.sound.unload();
        this.props.history.push("/login");
      });
  };

  render() {
    return (
      <div className="header-div-middle">
        <div className="input-group">
          <nav className="navbar navbar-light">
            <form className="form-inline">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
          </nav>
        </div>

        <div className="dropdown">
          <button
            className="btn btn-info dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Profile
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <div className="dropdown-item">
              <Link to="/profile">My Profile</Link>
            </div>
            <div className="dropdown-item">
              <button className="btn btn-info" onClick={this.signOutUser}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(NavBar);
