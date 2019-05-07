import React from "react";
import "./style.scss";
import UploadSong from "./UploadSong";
import "./style.scss";
import updatePlaylist from "../../services/firebaseFirestore/updatePlaylist";
import currentUser from "../../services/firebaseAuth/currentUser";
import { connect } from "react-redux";
import SongCard from "./SongCard";

class Songs extends React.Component {
  handleSongDelete = async playlistNumber => {
    var playlistObject = this.props.userObject.userData.playlists[
      this.props.playlistNumber
    ].playlist;
    var newSongs = [];

    for (var i = 0; i < playlistObject.length; i++) {
      if (i !== playlistNumber) {
        newSongs.push(playlistObject[i]);
      }
    }

    var newPlaylistObject = this.props.userObject.userData.playlists;
    newPlaylistObject[this.props.playlistNumber].playlist = newSongs;

    try {
      await updatePlaylist(this.props.userId, newPlaylistObject);
      console.log("Document successfully written!");
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  };

  handleSongEdit = async (playlistNumber, name, imageUrl, genre, ratings) => {
    var playlistObject = this.props.userObject.userData.playlists[
      this.props.playlistNumber
    ].playlist;

    if (genre !== "") playlistObject[playlistNumber].genre = genre;

    if (name !== "") playlistObject[playlistNumber].name = name;

    if (imageUrl !== "") playlistObject[playlistNumber].imageUrl = imageUrl;

    if (ratings !== "") playlistObject[playlistNumber].ratings = ratings;

    var newPlaylistObject = this.props.userObject.userData.playlists;
    newPlaylistObject[this.props.playlistNumber].playlist = playlistObject;

    try {
      await updatePlaylist(this.props.userId, newPlaylistObject);
      console.log("Document successfully written!");
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  };

  handleSongLike = async playlistNumber => {
    var playlistObject = this.props.userObject.userData.playlists[
      this.props.playlistNumber
    ].playlist;

    var likeUsersArray = this.props.userObject.userData.playlists[
      this.props.playlistNumber
    ].playlist[playlistNumber].likedBy;

    var currUser = await currentUser().uid;

    likeUsersArray.push(currUser);

    var newPlaylistObject = this.props.userObject.userData.playlists;
    newPlaylistObject[this.props.playlistNumber].playlist = playlistObject;

    try {
      await updatePlaylist(this.props.userId, newPlaylistObject);
      console.log("Document successfully written!");
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  };

  handleSongUnLike = async playlistNumber => {
    var playlistObject = this.props.userObject.userData.playlists[
      this.props.playlistNumber
    ].playlist;

    var likeUsersArray = this.props.userObject.userData.playlists[
      this.props.playlistNumber
    ].playlist[playlistNumber].likedBy;

    var currUser = await currentUser().uid;
    var tempArr = [];
    likeUsersArray.forEach(user => {
      if (currUser !== user) {
        tempArr.push(user);
      }
    });

    playlistObject[playlistNumber].likedBy = tempArr;

    var newPlaylistObject = this.props.userObject.userData.playlists;
    newPlaylistObject[this.props.playlistNumber].playlist = playlistObject;

    try {
      await updatePlaylist(this.props.userId, newPlaylistObject);
      console.log("Document successfully written!");
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  };

  render() {
    return (
      <div className="middle-songs-container">
        <div className="songs-header-row">
          <div className="current-address">
            <p>
              {this.props.userObject.userData.userName} >{" "}
              {
                this.props.userObject.userData.playlists[
                  this.props.playlistNumber
                ].playlistName
              }
            </p>
          </div>
          <UploadSong
            userObject={this.props.userObject}
            songsArray={this.props.songsArray}
            playlistNumber={this.props.playlistNumber}
            userId={this.props.userId}
            showDisableBtn={
              this.props.userObject.userData.uId !== this.props.currentUserId
            }
            handleLoadingStateChange={this.props.handleLoadingStateChange}
          />
        </div>
        <div className="row songs-div">
          <SongCard
            handleSongDelete={this.handleSongDelete}
            handleSongEdit={this.handleSongEdit}
            handleSongLike={this.handleSongLike}
            handleSongUnLike={this.handleSongUnLike}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    isLoading: isLoadingSong,
    songArrayCard: songsArray
  } = state.songsCard;
  const userObject = state.users.userArray[state.users.userNumber];
  const { playlistNumber } = state.playlist;
  const userId = userObject.userId;
  const currentUserId = state.app.appCurrentUser;
  return {
    isLoadingSong,
    userObject,
    songsArray,
    playlistNumber,
    userId,
    currentUserId
  };
};

export default connect(
  mapStateToProps,
  null
)(Songs);
