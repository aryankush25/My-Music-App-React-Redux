import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { withRouter, Link } from "react-router-dom";
import { Howl, Howler } from "howler";
import "./index.scss";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  sound = new Howl({
    src: [
      "https://firebasestorage.googleapis.com/v0/b/react-mini-project-music-app.appspot.com/o/First%20Class%20-%20Kalank.mp3?alt=media&token=9a01a38a-08e3-4922-b092-01d6eb3325f0"
    ],
    html5: true
  });

  playAudio() {
    this.sound.play();
    console.log(this.sound);
  }

  pauseAudio() {
    this.sound.pause();
    console.log(this.sound);
  }

  // getHower() {
  //   this.player.howler;
  // }

  // getDuration() {
  //   this.player.duration();
  // }

  // getSeek() {
  //   this.player.seek();
  // }

  // setSeek() {
  //   this.player.seek(0.5);
  // }

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
                <div className="input-group">
                  <nav className="navbar navbar-light bg-light">
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
            <button
              onClick={() =>
                this.playAudio(
                  "https://firebasestorage.googleapis.com/v0/b/react-mini-project-music-app.appspot.com/o/First%20Class%20-%20Kalank.mp3?alt=media&token=9a01a38a-08e3-4922-b092-01d6eb3325f0"
                )
              }
            >
              Play Audio
            </button>
            <button
              onClick={() => {
                this.pauseAudio();
              }}
            >
              Pause
            </button>
          </nav>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
