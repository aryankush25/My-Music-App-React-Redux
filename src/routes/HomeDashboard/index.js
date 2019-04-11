import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { withRouter, Link } from "react-router-dom";
import "./index.scss";
var FontAwesome = require("react-fontawesome");

class Home extends React.Component {
  render() {
    return (
      <div className="homePageDiv">
        <div className="row upperDiv">
          <div className="col leftCol">
            <div className="headerDivLeft">LOGO</div>
            <hr />
            <div className="smallDivLeft">Friends</div>
          </div>

          <div className="col-8 middleCol">
            <div className="headerDivMiddle">
              <div className="">
                <div class="input-group">
                  <nav class="navbar navbar-light bg-light">
                    <form class="form-inline">
                      <input
                        class="form-control mr-sm-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                      />
                      <button
                        class="btn btn-outline-success my-2 my-sm-0"
                        type="submit"
                      >
                        Search
                      </button>
                    </form>
                  </nav>
                </div>
              </div>
              <div>
                <Link to="/profile">My Profile</Link>
              </div>
              <div className="">
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
            </div>
            <hr />
            <div className="smallDivMiddle">Songs</div>
          </div>

          <div className="col rightCol">
            <div className="headerDivRight">Playlists</div>
            <hr />
            <div className="smallDivRight">Playlist1</div>
          </div>
        </div>
        <div className="musicBar">
          <nav>
            <button>Don't Click Me</button>
          </nav>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
