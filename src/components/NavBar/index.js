import React from "react";

import { withRouter, Link } from "react-router-dom";
import "./style.scss";
import signOutUser from "../../services/firebaseAuth/signOutUser";

class NavBar extends React.Component {
  handleSignOut = async () => {
    try {
      await signOutUser();
      window.localStorage.setItem("musicAppSignedIn", false);
      this.props.sound.unload();
      this.props.history.push("/login");
    } catch (err) {
      console.log("err", err);
    }
  };

  render() {
    return (
      <div className="header-div-middle">
        <div className="input-group">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
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
              <button className="btn btn-info" onClick={this.handleSignOut}>
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
