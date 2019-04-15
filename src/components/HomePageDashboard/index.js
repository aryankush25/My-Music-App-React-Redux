import React from "react";
import NavBar from "../NavBar/";
import Playlists from "../Playlists/";
import "./style.scss";
import logo from "../../assets/images/logo.png";
import playlistImg from "../../assets/images/playlist.png";

class HomePageDashboard extends React.Component {
  render() {
    return (
      <div className="row upper-div">
        <div className="col left-col">
          <div className="header-div-left">
            <img src={logo} alt="logo" />
          </div>
          <div className="small-div-left">Friends</div>
        </div>

        <div className="col-8 middle-col">
          <NavBar sound={this.props.sound} />
          <div className="small-div-middle">Songs</div>
        </div>

        <div className="col right-col">
          <div className="header-div-right">
            <img src={playlistImg} alt="playlistimg" />
          </div>
          <Playlists />
        </div>
      </div>
    );
  }
}

export default HomePageDashboard;
