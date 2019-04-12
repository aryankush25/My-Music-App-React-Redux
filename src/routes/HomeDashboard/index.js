import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { withRouter, Link } from "react-router-dom";
import { Howl, Howler } from "howler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faForward,
  faBackward,
  faPlay,
  faPause,
  faVolumeUp
} from "@fortawesome/free-solid-svg-icons";
import "./index.scss";
import logo from "../../assets/images/logo.png";
import playlistImg from "../../assets/images/playlist.png";

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
  }

  playNext() {
    this.sound.stop();
    this.sound = new Howl({
      src: [
        "https://firebasestorage.googleapis.com/v0/b/react-mini-project-music-app.appspot.com/o/Default%20Music%2FBulleya%20-%20RAW.mp3?alt=media&token=29476bb5-23b6-4d74-925e-eac3dccb3ea3"
      ],
      html5: true
    });
    this.sound.play();
  }

  playPrevious() {
    this.sound.stop();
    this.sound = new Howl({
      src: [
        "https://firebasestorage.googleapis.com/v0/b/react-mini-project-music-app.appspot.com/o/Default%20Music%2FFirst%20Class%20-%20Kalank.mp3?alt=media&token=1dd066b3-381f-4598-bce0-ffddba7fdc25"
      ],
      html5: true
    });
    this.sound.play();
  }

  adjustSeek(value) {
    this.sound.seek(value);
  }

  adjustAudio(value) {
    Howler.volume(value / 10);
    console.log(Howler._volume);
  }

  playPauseButton() {
    if (this.state.playing === false) {
      return <FontAwesomeIcon icon={faPlay} />;
    } else {
      return <FontAwesomeIcon icon={faPause} />;
    }
  }

  render() {
    return (
      <div className="homePageDiv">
        <div className="row upperDiv">
          <div className="col leftCol">
            <div className="headerDivLeft">
              <img src={logo} />
            </div>
            <hr />
            <div className="smallDivLeft">Friends</div>
          </div>

          <div className="col-8 middleCol">
            <div className="headerDivMiddle">
              <div className="searchBarDiv">
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
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <div className="profileDiv dropdown-item">
                    <Link to="/profile">My Profile</Link>
                  </div>
                  <div className="logoutButtonDiv dropdown-item">
                    <button
                      className="btn btn-info"
                      onClick={() => {
                        firebase
                          .auth()
                          .signOut()
                          .then(() => {
                            window.localStorage.setItem(
                              "musicAppSignedIn",
                              false
                            );
                            this.sound.unload();
                            this.props.history.push("/login");
                          });
                      }}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="smallDivMiddle">Songs</div>
          </div>

          <div className="col rightCol">
            <div className="headerDivRight">
              <img src={playlistImg} />
            </div>
            <hr />
            <div className="smallDivRight">Playlist1</div>
          </div>
        </div>
        <div className="musicBar">
          <div className="previousSong">
            <span
              className="btn btn-info btn-lg"
              onClick={() => {
                this.playPrevious();
              }}
            >
              <FontAwesomeIcon icon={faBackward} />
            </span>
          </div>
          <div className="playPauseSong">
            <span
              className="btn btn-info btn-lg"
              onClick={() => this.playPauseAudio()}
            >
              {this.playPauseButton()}
            </span>
          </div>
          <div className="nextSong">
            <span
              className="btn btn-info btn-lg"
              onClick={() => {
                this.playNext();
              }}
            >
              <FontAwesomeIcon icon={faForward} />
            </span>
          </div>

          <div className="slidecontainerseek">
            <input
              type="range"
              min="0"
              max={this.sound._duration}
              defaultValue="0"
              onChange={event => {
                this.adjustSeek(event.target.value);
              }}
              className="sliderseek"
              id="myRange"
            />
          </div>

          <div className="slidecontainervolume">
            <FontAwesomeIcon icon={faVolumeUp} />

            <input
              type="range"
              min="0"
              max="10"
              defaultValue={Howler._volume * 10}
              onChange={event => {
                this.adjustAudio(event.target.value);
              }}
              className="slidervolume"
              id="myRange"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
