import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const Playlist = props => {
  const playlistDiv = props.playlistsArray.map((playlist, index) => {
    return (
      <Link
        to="#"
        key={index}
        onClick={() => {
          props.handleSongsArray(playlist.playlist);
        }}
      >
        <div className="playlist-element">Playlist {index + 1} </div>
      </Link>
    );
  });

  return <div>{playlistDiv}</div>;
};

class Playlists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      playlistsArray: []
    };
  }

  componentDidMount() {
    this.func();
  }

  func = () => {
    firebase
      .firestore()
      .collection("users")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(user => {
          this.setState({
            isLoading: false,
            playlistsArray: user.data().playlists
          });
        });
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
      <div className="small-div-right">
        <Playlist
          playlistsArray={this.state.playlistsArray}
          handleSongsArray={this.props.handleSongsArray}
        />
      </div>
    );
  }
}

export default Playlists;
