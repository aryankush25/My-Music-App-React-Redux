import React from "react";
import NavBar from "../NavBar/";
import Playlists from "../Playlists/";
import "./style.scss";
import logo from "../../assets/images/logo.png";
import playlistImg from "../../assets/images/playlist.png";

class HomePageDashboard extends React.Component {
  render() {
    return (
      <div className="row upperDiv">
        <div className="col leftCol">
          <div className="headerDivLeft">
            <img src={logo} alt="logo" />
          </div>
          <div className="smallDivLeft">Friends</div>
        </div>

        <div className="col-8 middleCol">
          <NavBar sound={this.props.sound} />
          <div className="smallDivMiddle">Songs</div>
        </div>

        <div className="col rightCol">
          <div className="headerDivRight">
            <img src={playlistImg} alt="playlistimg" />
          </div>
          <Playlists />
        </div>
      </div>
    );
  }
}

export default HomePageDashboard;
