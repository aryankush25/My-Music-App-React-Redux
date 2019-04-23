import React from "react";
import NavBar from "../NavBar/";
import Playlists from "../Playlists/";
import Songs from "../Songs/";
import Users from "../Users/";
import "./style.scss";

class HomePageDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedUserArray: [],
      isLoading: true,
      songsArray: [],
      playlistComponentIsLoading: true,
      index: 0,
      userId: ""
    };
  }

  handleClickedUser = userArray => {
    this.setState({
      clickedUserArray: userArray,
      isLoading: false
    });
  };

  handleSongsArray = (songsArray, index, userId) => {
    this.setState({
      songsArray: songsArray,
      playlistComponentIsLoading: false,
      index: index,
      userId: userId
    });
  };

  checkUserLoaded = component => {
    if (this.state.isLoading === true) {
      return (
        <div className="d-flex justify-content-center loader-songs ">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    } else {
      return component;
    }
  };

  render() {
    return (
      <div className="row upper-div">
        <div className="col left-col">
          <div className="header-div-left">
            <p className="friends-logo">FRIENDS</p>
          </div>
          <Users handleClickedUser={this.handleClickedUser} />
        </div>

        <div className="col-8 middle-col">
          <NavBar sound={this.props.sound} />
          {this.checkUserLoaded(
            <Songs
              playlistComponentIsLoading={this.state.playlistComponentIsLoading}
              songsArray={this.state.songsArray}
              index={this.state.index}
              userId={this.state.userId}
              handleArrayUpdate={this.props.handleArrayUpdate}
              handleSongClick={this.props.handleSongClick}
            />
          )}
        </div>

        <div className="col right-col">
          <div className="header-div-right">
            <p className="playlist-logo">PLAYLISTS</p>
          </div>
          {this.checkUserLoaded(
            <Playlists
              userArray={this.state.clickedUserArray}
              handleSongsArray={this.handleSongsArray}
            />
          )}
        </div>
      </div>
    );
  }
}

export default HomePageDashboard;
