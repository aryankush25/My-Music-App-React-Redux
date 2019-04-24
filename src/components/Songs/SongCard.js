import React from "react";
import UploadSong from "./UploadSong";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "./style.scss";

class SongCard extends React.Component {
  componentDidMount() {
    var songsTempArrayUrl = [];
    this.props.songsArray.forEach(doc => {
      songsTempArrayUrl.push(doc.url);
    });
    this.props.handleArrayUpdate(this.props.songsArray, songsTempArrayUrl);
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.songsArray !== nextProps.songsArray) {
      var songsTempArrayUrl = [];
      nextProps.songsArray.forEach(doc => {
        songsTempArrayUrl.push(doc.url);
      });
      nextProps.handleArrayUpdate(nextProps.songsArray, songsTempArrayUrl);

      this.songsdiv = nextProps.songsArray.map((song, index) => {
        return (
          <div className="card song-div" key={index}>
            <div
              className="song-logo"
              onClick={() => {
                nextProps.handleSongClick(index);
              }}
            >
              {song.name ? song.name.trim().charAt(0) : "?"}
            </div>
            <div
              className="card-body"
              onClick={async () => {
                var playlistObject = this.props.userObject.userData.playlists[
                  this.props.index
                ].playlist;
                var newSongs = [];

                for (var i = 0; i < playlistObject.length; i++) {
                  if (i !== index) {
                    newSongs.push(playlistObject[i]);
                  }
                }

                var newPlaylistObject = this.props.userObject.userData
                  .playlists;
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
              }}
            >
              <p className="card-text">
                {song.name ? song.name.trim() : "NO NAME"}
              </p>
            </div>
          </div>
        );
      });

      return true;
    }
    return false;
  }

  songsdiv = this.props.songsArray.map((song, index) => {
    return (
      <div className="card song-div" key={index}>
        <div
          className="song-logo"
          onClick={() => this.props.handleSongClick(index)}
        >
          {song.name ? song.name.trim().charAt(0) : "?"}
        </div>
        <div className="card-body">
          <p className="card-text">
            {song.name ? song.name.trim() : "NO NAME"}
          </p>
        </div>
      </div>
    );
  });

  render() {
    return (
      <div className="middle-songs-container">
        <p className="current-address">
          {this.props.userObject.userData.userName} > Playlist{" "}
          {this.props.index + 1}
        </p>
        <div className="row songs-div">{this.songsdiv}</div>
        <UploadSong
          userObject={this.props.userObject}
          songsArray={this.props.songsArray}
          index={this.props.index}
          userId={this.props.userId}
          handleLoadingStateChange={this.props.handleLoadingStateChange}
        />
      </div>
    );
  }
}

export default SongCard;
