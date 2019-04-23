import React from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "./style.scss";

const Playlist = props => {
  const playlistDiv = props.playlistsArray.map((playlist, index) => {
    return (
      <Link
        to="#"
        key={index}
        onClick={() => {
          props.handleSongsArray(playlist.playlist, index);
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
      isLoading: false
    };
  }

  componentDidMount() {
    this.props.handleSongsArray(
      this.props.userObject.userData.playlists[0].playlist,
      0
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.isLoading !== nextState.isLoading) {
      return true;
    }

    if (this.props.userObject !== nextProps.userObject) {
      nextProps.handleSongsArray(
        nextProps.userObject.userData.playlists[0].playlist,
        0
      );
      return true;
    }
    return false;
  }

  handleAddPlaylist = async () => {
    var userObject = this.props.userObject.userData;
    userObject.playlists.push({
      playlist: []
    });

    this.handleLoadingStateChange(true);

    await firebase
      .firestore()
      .collection("users")
      .doc(this.props.userObject.userId)
      .update({
        playlists: userObject.playlists
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch(error => {
        console.error("Error writing document: ", error);
      });
    this.handleLoadingStateChange(false);
  };

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
      <div className="small-div-right">
        <Playlist
          playlistsArray={this.props.userObject.userData.playlists}
          handleSongsArray={this.props.handleSongsArray}
        />
        <div className="playlist-element button-class">
          <button onClick={() => this.handleAddPlaylist()}>Add Playlist</button>
        </div>
      </div>
    );
  }
}

export default Playlists;
