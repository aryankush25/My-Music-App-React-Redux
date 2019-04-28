import React from "react";
import NavBar from "../NavBar/";
import Playlists from "../Playlists/";
import Songs from "../Songs/";
import Users from "../Users/";
import ShowLoadingComponent from "../ShowLoadingComponent";
import "./style.scss";

class HomePageDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedUserObject: [],
      isLoading: true,
      songsArray: [],
      index: 0
    };
  }

  handleClickedUser = userObject => {
    this.setState({
      clickedUserObject: userObject,
      isLoading: false
    });
  };

  handleSongsArray = (songsArray, index) => {
    this.setState({
      songsArray: songsArray,
      index: index
    });
  };

  render() {
    return (
      <div className="row upper-div">
        <div className="col left-col">
          <div className="header-div-left">
            <p className="friends-logo">FRIENDS</p>
          </div>
          <Users
            userId={this.state.clickedUserObject.userId}
            handleClickedUser={this.handleClickedUser}
          />
        </div>

        <div className="col-8 middle-col">
          <NavBar sound={this.props.sound} />

          <ShowLoadingComponent isLoading={this.state.isLoading}>
            <Songs
              userObject={this.state.clickedUserObject}
              songsArray={this.state.songsArray}
              index={this.state.index}
              userId={this.state.clickedUserObject.userId}
              handleArrayUpdate={this.props.handleArrayUpdate}
              handleSongClick={this.props.handleSongClick}
            />
          </ShowLoadingComponent>
        </div>

        <div className="col right-col">
          <div className="header-div-right">
            <p className="playlist-logo">PLAYLISTS</p>
          </div>
          <ShowLoadingComponent isLoading={this.state.isLoading}>
            <Playlists
              userObject={this.state.clickedUserObject}
              handleSongsArray={this.handleSongsArray}
            />
          </ShowLoadingComponent>
        </div>
      </div>
    );
  }
}

export default HomePageDashboard;
