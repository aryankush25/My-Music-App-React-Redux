import React from "react";
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

  selectedFile = "";
  filePresent = true;
  handleOnChange = event => {
    this.selectedFile = event.target.files[0];
    this.filePresent = false;

    this.props.songsArray.forEach(doc => {
      if (doc.name === this.selectedFile.name) {
        console.log(doc.name);
        console.log(this.props.index);
        this.filePresent = true;
      }
    });
  };

  handleOnClick = async () => {
    if (this.filePresent === false) {
      const uploadTask = firebase
        .storage()
        .ref()
        .child(`Music/${this.selectedFile.name}`)
        .put(this.selectedFile);

      uploadTask.on(
        "state_changed",
        () => {
          this.props.handleLoadingStateChange(true);
        },
        error => {
          this.props.handleLoadingStateChange(false);
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(async url => {
            var userObject = this.props.userObject.userData;
            userObject.playlists[this.props.index].playlist.push({
              name: this.selectedFile.name,
              url: url
            });

            await firebase
              .firestore()
              .collection("users")
              .doc(this.props.userId)
              .update({
                playlists: userObject.playlists
              })
              .then(() => {
                console.log("Document successfully written!");
              })
              .catch(error => {
                console.error("Error writing document: ", error);
              });
            this.props.handleLoadingStateChange(false);
          });
        }
      );
    }
  };
  render() {
    return (
      <div className="middle-songs-container">
        <p className="current-address">
          {this.props.userObject.userData.userName} > Playlist{" "}
          {this.props.index + 1}
        </p>
        <div className="row songs-div">{this.songsdiv}</div>
        <div className="filesubmit">
          <input
            type="file"
            className="file-select btn btn-md btn-danger"
            accept="audio/*"
            onChange={this.handleOnChange}
          />
          <button className="btn btn-md btn-info" onClick={this.handleOnClick}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}

class Songs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      songsArray: []
    };
  }

  handleLoadingStateChange = isLoading => {
    this.setState({
      isLoading: isLoading
    });
  };

  render() {
    if (this.state.isLoading === true) {
      return (
        <div className="d-flex justify-content-center loader-songs ">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }

    return (
      <SongCard
        userObject={this.props.userObject}
        songsArray={this.props.songsArray}
        index={this.props.index}
        userId={this.props.userId}
        handleClickedUser={this.props.handleClickedUser}
        handleSongClick={this.props.handleSongClick}
        handleArrayUpdate={this.props.handleArrayUpdate}
        handleLoadingStateChange={this.handleLoadingStateChange}
      />
    );
  }
}

export default Songs;
