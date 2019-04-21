import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "./style.scss";
import { connect } from "react-redux";

const SongCard = props => {
  const songsdiv = props.songsArray.map((song, index) => {
    return (
      <div
        className="card song-div"
        key={index}
        onClick={() => props.handleSongClick(index)}
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

  const handleOnChange = event => {
    const selectedFile = event.target.files[0];
    const uploadTask = firebase
      .storage()
      .ref()
      .child(`Music/${selectedFile.name}`)
      .put(selectedFile);

    uploadTask.on(
      "state_changed",
      snapshot => {
        props.handleLoadingStateChange(true);
      },
      error => {
        console.log(error);
      },
      () => {
        props.handleLoadingStateChange(false);
        console.log("success");
      }
    );
  };

  return (
    <div className="row songs-div">
      {songsdiv}
      <div id="filesubmit">
        <input
          type="file"
          className="file-select"
          accept="audio/*"
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
};

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

  componentDidMount() {
    this.playistList();
  }

  playistList = async () => {
    try {
      var docRef = await firebase.firestore().collection("defaultPlaylist");
      var songsTempArray = [];
      var songsTempArrayUrl = [];
      var querySnapshot = await docRef.get();
      // console.log(querySnapshot);
      querySnapshot.forEach(doc => {
        songsTempArray.push(doc.data());
        songsTempArrayUrl.push(doc.data().url);
      });

      this.setState({
        isLoading: false,
        songsArray: songsTempArray
      });

      this.props.handleArrayUpdate(songsTempArray, songsTempArrayUrl);
    } catch (error) {
      console.log(error);
    }
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
        songsArray={this.state.songsArray}
        handleSongClick={this.props.handleSongClick}
        handleLoadingStateChange={this.handleLoadingStateChange}
      />
    );
  }
}

const mapStateToProps = state => {
  const { songs } = state;
  return { songs };
};

export default connect(
  mapStateToProps,
  null
)(Songs);
