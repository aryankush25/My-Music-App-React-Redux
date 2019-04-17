import React from "react";
import NavBar from "../NavBar/";
import Playlists from "../Playlists/";
import Songs from "../Songs/";
import "./style.scss";

class HomePageDashboard extends React.Component {
  render() {
    return (
      <div className="row upper-div">
        <div className="col left-col">
          <div className="header-div-left">
            <p className="friends-logo">FRIENDS</p>
          </div>
          <div className="small-div-left">Friends</div>
        </div>

        <div className="col-8 middle-col">
          <NavBar sound={this.props.sound} />
          <Songs />
        </div>

        <div className="col right-col">
          <div className="header-div-right">
            <p className="playlist-logo">PLAYLISTS</p>
          </div>
          <Playlists />
        </div>
      </div>
    );
  }
}

export default HomePageDashboard;
