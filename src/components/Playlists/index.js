import React from "react";
import "./style.scss";
import AddPlaylist from "./AddPlaylist";
import Playlist from "./Playlist";
import ShowLoadingComponent from "../ShowLoadingComponent";
import updatePlaylist from "../../services/firebaseFirestore/updatePlaylist";
import currentUser from "../../services/firebaseAuth/currentUser";

class Playlists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  componentDidMount() {
    this.props.handleSongsArray(
      this.props.userObject.userData.playlists[0].playlist,
      0
    );
    this.fetchCurrentUser();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.isLoading !== nextState.isLoading) {
      return true;
    }
    if (this.props.userObject !== nextProps.userObject) {
      nextProps.handleSongsArray(
        nextProps.userObject.userData.playlists[0].playlist,
        0
      );
      return true;
    }
    return false;
  }

  currentUser = "";

  fetchCurrentUser = async () => {
    this.handleLoadingStateChange(true);

    this.currentUser = await currentUser().uid;

    this.handleLoadingStateChange(false);
  };

  handleEditPlaylist = async (index, newPlaylistName) => {
    var userObject = this.props.userObject.userData.playlists;
    var newPlaylists = [];
    for (var i = 0; i < userObject.length; i++) {
      newPlaylists.push(userObject[i]);
      if (i === index) {
        newPlaylists[i].playlistName = newPlaylistName;
      }
    }
    this.handleLoadingStateChange(true);

    try {
      await updatePlaylist(this.props.userObject.userId, newPlaylists);
      console.log("Document successfully written!");
    } catch (error) {
      console.error("Error writing document: ", error);
    }

    this.handleLoadingStateChange(false);
  };

  handleDeletePlaylist = async index => {
    var userObject = this.props.userObject.userData.playlists;
    var newPlaylists = [];
    for (var i = 0; i < userObject.length; i++) {
      if (i !== index) {
        newPlaylists.push(userObject[i]);
      }
    }
    this.handleLoadingStateChange(true);

    try {
      await updatePlaylist(this.props.userObject.userId, newPlaylists);
      console.log("Document successfully written!");
    } catch (error) {
      console.error("Error writing document: ", error);
    }

    this.handleLoadingStateChange(false);
  };

  handleLoadingStateChange = isLoading => {
    this.setState({
      isLoading: isLoading
    });
  };

  render() {
    return (
      <ShowLoadingComponent isLoading={this.state.isLoading}>
        <div className="small-div-right">
          <div className="playlists-container">
            <Playlist
              userObject={this.props.userObject}
              playlistsArray={this.props.userObject.userData.playlists}
              handleSongsArray={this.props.handleSongsArray}
              handleDeletePlaylist={this.handleDeletePlaylist}
              handleEditPlaylist={this.handleEditPlaylist}
            />
          </div>
          <AddPlaylist
            showDisableBtn={
              this.props.userObject.userData.uId !== this.currentUser
            }
            userObject={this.props.userObject}
            handleLoadingStateChange={this.handleLoadingStateChange}
          />
        </div>
      </ShowLoadingComponent>
    );
  }
}

export default Playlists;
