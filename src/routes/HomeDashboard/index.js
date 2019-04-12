import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { withRouter, Link } from "react-router-dom";
import { Howl, Howler } from "howler";
import "./index.scss";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      playingDuration: 0
    };

    var context = new AudioContext();
  }

  sound = new Howl({
    src: [
      "https://firebasestorage.googleapis.com/v0/b/react-mini-project-music-app.appspot.com/o/Default%20Music%2FFirst%20Class%20-%20Kalank.mp3?alt=media&token=1dd066b3-381f-4598-bce0-ffddba7fdc25"
    ],
    html5: true
  });

  context = new AudioContext();

  playPauseAudio() {
    if (this.state.playing === true) {
      this.sound.pause();
    } else {
      this.sound.play();
    }
    this.setState({
      playing: !this.state.playing
    });
    console.log(this.sound);
  }

  adjustSeek(value) {
    this.sound.seek(value);
  }

  adjustAudio(value) {
    Howler.volume(value / 10);
  }

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
            <button onClick={() => this.playPauseAudio()}>
              Play / Pause Audio
            </button>
            <div className="volumeDiv">
              <span>Volume</span>
              <input
                type="range"
                name="points"
                min="0"
                max="10"
                onChange={event => {
                  this.adjustAudio(event.target.value);
                }}
              />
            </div>
            <div className="seekDiv">
              <span>Seek</span>
              <input
                type="range"
                name="points"
                min="0"
                max={this.sound._duration}
                defaultValue="0"
                onChange={event => {
                  this.adjustSeek(event.target.value);
                }}
              />
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
