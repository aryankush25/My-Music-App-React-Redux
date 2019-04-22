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
          props.handleSongsArray(playlist.playlist, index, props.userId);
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
      playlistsArray: [],
      userId: ""
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
          if (user.data().uId === firebase.auth().currentUser.uid) {
            this.setState({
              isLoading: false,
              playlistsArray: user.data().playlists,
              userId: user.id
            });
          }
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
          userId={this.state.userId}
          handleSongsArray={this.props.handleSongsArray}
        />
      </div>
    );
  }
}

export default Playlists;
