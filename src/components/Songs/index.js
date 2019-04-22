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
          <div
            className="card song-div"
            key={index}
            onClick={() => nextProps.handleSongClick(index)}
          >
            <div className="song-logo">
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

      return true;
    }
    return false;
  }

  songsdiv = this.props.songsArray.map((song, index) => {
    return (
      <div
        className="card song-div"
        key={index}
        onClick={() => this.props.handleSongClick(index)}
      >
        <div className="song-logo">
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

  handleOnChange = async event => {
    const selectedFile = event.target.files[0];

    var filePresent = false;

    await firebase
      .firestore()
      .collection("defaultPlaylist")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (doc.data().name === selectedFile.name) {
            console.log(doc.data());
            filePresent = true;
          }
        });
      });

    if (filePresent === false) {
      const uploadTask = firebase
        .storage()
        .ref()
        .child(`Default Music/${selectedFile.name}`)
        .put(selectedFile);

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
          uploadTask.snapshot.ref.getDownloadURL().then(url => {
            console.log(url);

            firebase
              .firestore()
              .collection("defaultPlaylist")
              .add({
                name: selectedFile.name,
                url: url
              })
              .then(function() {
                this.props.handleLoadingStateChange(false);
                console.log("Document successfully written!");
              })
              .catch(function(error) {
                console.error("Error writing document: ", error);
              });
          });
        }
      );
    }
  };
  render() {
    // console.log("Inside" + this.props.songsArray);

    return (
      <div className="songs-div">
        <div className="row songs-div">{this.songsdiv}</div>
        <div className="filesubmit row">
          <input
            type="file"
            className="file-select btn btn-md btn-info"
            accept="audio/*"
            onChange={this.handleOnChange}
          />
        </div>
      </div>
    );
  }
}

class Songs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      songsArray: []
    };
  }

  handleLoadingStateChange = isLoading => {
    this.setState({
      isLoading: isLoading
    });
  };

  render() {
    if (this.props.playlistComponentIsLoading === true) {
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
        songsArray={this.props.songsArray}
        handleSongClick={this.props.handleSongClick}
        handleArrayUpdate={this.props.handleArrayUpdate}
        handleLoadingStateChange={this.handleLoadingStateChange}
      />
    );
  }
}

export default Songs;
