import React from "react";
import "./style.scss";
import AddPlaylist from "./AddPlaylist";
import Playlist from "./Playlist";
import ShowLoadingComponent from "../ShowLoadingComponent";
import updatePlaylist from "../../services/firebaseFirestore/updatePlaylist";
import { connect } from "react-redux";
import { setCurrentPlaylistNumberAction } from "../../redux/actions/actionPlaylist";

class Playlists extends React.Component {
  handleEditPlaylist = async (index, newPlaylistName) => {
    var userObject = this.props.userObject.userData.playlists;
    var newPlaylists = [];
    for (var i = 0; i < userObject.length; i++) {
      newPlaylists.push(userObject[i]);
      if (i === index) {
        newPlaylists[i].playlistName = newPlaylistName;
      }
    }

    try {
      await updatePlaylist(this.props.userObject.userId, newPlaylists);
      console.log("Document successfully written!");
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  };

  handleDeletePlaylist = async index => {
    var userObject = this.props.userObject.userData.playlists;
    var newPlaylists = [];
    for (var i = 0; i < userObject.length; i++) {
      if (i !== index) {
        newPlaylists.push(userObject[i]);
      }
    }

    try {
      this.props.setCurrentPlaylistNumberAction(0);
      await updatePlaylist(this.props.userObject.userId, newPlaylists);
      console.log("Document successfully written!");
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  };

  render() {
    return (
      <ShowLoadingComponent isLoading={this.props.isLoadingPlaylist}>
        <div className="small-div-right">
          <div className="playlists-container">
            <Playlist
              handleSongsArray={this.props.handleSongsArray}
              handleDeletePlaylist={this.handleDeletePlaylist}
              handleEditPlaylist={this.handleEditPlaylist}
            />
          </div>
          <AddPlaylist
            showDisableBtn={
              this.props.userObject.userData.uId !== this.props.appCurrentUser
            }
            userObject={this.props.userObject}
          />
        </div>
      </ShowLoadingComponent>
    );
  }
}

const mapStateToProps = state => {
  const { isLoading: isLoadingPlaylist } = state.playlist;
  const { appCurrentUser } = state.app;
  const userObject = state.users.userArray[state.users.userNumber];

  return {
    isLoadingPlaylist,
    appCurrentUser,
    userObject
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentPlaylistNumberAction: playlistNumber =>
      dispatch(setCurrentPlaylistNumberAction(playlistNumber))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlists);
