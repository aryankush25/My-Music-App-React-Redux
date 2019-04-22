import React from "react";
import NavBar from "../NavBar/";
import Playlists from "../Playlists/";
import Songs from "../Songs/";
import "./style.scss";

class HomePageDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songsArray: [],
      playlistComponentIsLoading: true,
      index: 0,
      userId: ""
    };
  }

  handleSongsArray = (songsArray, index, userId) => {
    this.setState({
      songsArray: songsArray,
      playlistComponentIsLoading: false,
      index: index,
      userId: userId
    });
  };

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
          <Songs
            playlistComponentIsLoading={this.state.playlistComponentIsLoading}
            songsArray={this.state.songsArray}
            index={this.state.index}
            userId={this.state.userId}
            handleArrayUpdate={this.props.handleArrayUpdate}
            handleSongClick={this.props.handleSongClick}
          />
        </div>

        <div className="col right-col">
          <div className="header-div-right">
            <p className="playlist-logo">PLAYLISTS</p>
          </div>
          <Playlists handleSongsArray={this.handleSongsArray} />
        </div>
      </div>
    );
  }
}

export default HomePageDashboard;
