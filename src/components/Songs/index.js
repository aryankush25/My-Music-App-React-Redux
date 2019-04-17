import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "./style.scss";

const SongCard = props => {
  const songsdiv = props.songsArray.map((song, index) => {
    return (
      <div
        className="card song-div"
        key={index}
        onClick={() => props.handleSongClick(index)}
      >
        <div className="song-logo">{song.name.trim().charAt(0)}</div>
        <div className="card-body">
          <p className="card-text">{song.name.trim()}</p>
        </div>
      </div>
    );
  });
  return <div className="row songs-div">{songsdiv}</div>;
};

class Songs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      songsArray: []
    };
  }

  componentDidMount() {
    this.playistList();
  }

  playistList = async () => {
    try {
      var docRef = await firebase.firestore().collection("defaultPlaylist");
      var songsTempArray = [];
      var songsTempArrayUrl = [];
      await docRef.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          songsTempArray.push(doc.data());
          songsTempArrayUrl.push(doc.data().url);
        });
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
      />
    );
  }
}

export default Songs;
