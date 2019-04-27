import React from "react";
import UploadSong from "./UploadSong";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "./style.scss";

const DeleteButton = props => {
  if (props.showDisableBtn) {
    return null;
  }
  return (
    <button className="btn btn-md btn-danger" onClick={props.handleSongDelete}>
      Delete
    </button>
  );
};

const SongsCard = props => {
  return props.songsArray.map((song, index) => {
    return (
      <div className="card song-div" key={index}>
        <div className="song-logo">
          {song.name ? song.name.trim().charAt(0) : "?"}
        </div>
        <div className="card-body">
          <p className="card-text">
            {song.name ? song.name.trim() : "NO NAME"}
          </p>
        </div>
        <div className="overlay">
          <div className="song-buttons">
            <button
              className="btn btn-md btn-info"
              onClick={() => {
                props.handleSongClick(index);
              }}
            >
              Play
            </button>
            <DeleteButton
              userObject={props.userObject}
              showDisableBtn={
                props.userObject.userData.uId !==
                firebase.auth().currentUser.uid
              }
              handleSongDelete={() => props.handleSongDelete(index)}
            />
          </div>
        </div>
      </div>
    );
  });
};

class SongCard extends React.Component {
  componentDidMount() {
    this.handleArrayUpdateWithSongsArray();
  }

  handleArrayUpdateWithSongsArray() {
    var songsTempArrayUrl = [];
    this.props.songsArray.forEach(doc => {
      songsTempArrayUrl.push(doc.url);
    });
    this.props.handleArrayUpdate(this.props.songsArray, songsTempArrayUrl);
  }

  shouldComponentUpdate(nextprops) {
    if (nextprops.songsArray !== this.props.songsArray) {
      var songsTempArrayUrl = [];
      nextprops.songsArray.forEach(doc => {
        songsTempArrayUrl.push(doc.url);
      });
      nextprops.handleArrayUpdate(nextprops.songsArray, songsTempArrayUrl);
      return true;
    }
    return false;
  }

  handleSongDelete = async index => {
    var playlistObject = this.props.userObject.userData.playlists[
      this.props.index
    ].playlist;
    var newSongs = [];

    for (var i = 0; i < playlistObject.length; i++) {
      if (i !== index) {
        newSongs.push(playlistObject[i]);
      }
    }

    var newPlaylistObject = this.props.userObject.userData.playlists;
    newPlaylistObject[this.props.index].playlist = newSongs;

    await firebase
      .firestore()
      .collection("users")
      .doc(this.props.userId)
      .update({
        playlists: newPlaylistObject
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch(error => {
        console.error("Error writing document: ", error);
      });
    this.props.handleLoadingStateChange(false);
  };

  render() {
    return (
      <div className="middle-songs-container">
        <div className="songs-header-row">
          <div className="current-address">
            <p>
              {this.props.userObject.userData.userName} > Playlist{" "}
              {this.props.index + 1}
            </p>
          </div>
          <UploadSong
            userObject={this.props.userObject}
            songsArray={this.props.songsArray}
            index={this.props.index}
            userId={this.props.userId}
            showDisableBtn={
              this.props.userObject.userData.uId !==
              firebase.auth().currentUser.uid
            }
            handleLoadingStateChange={this.props.handleLoadingStateChange}
          />
        </div>
        <div className="row songs-div">
          <SongsCard
            songsArray={this.props.songsArray}
            userObject={this.props.userObject}
            handleSongClick={this.props.handleSongClick}
            handleSongDelete={this.handleSongDelete}
          />
        </div>
      </div>
    );
  }
}

export default SongCard;
