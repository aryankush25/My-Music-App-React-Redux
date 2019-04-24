import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "./style.scss";
import AddPlaylist from "./AddPlaylist";
import Playlist from "./UserPlaylist";

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

  handleDeletePlaylist = async index => {
    var userObject = this.props.userObject.userData.playlists;
    var newPlaylists = [];

    for (var i = 0; i < userObject.length; i++) {
      if (i !== index) {
        newPlaylists.push(userObject[i]);
      }
    }

    this.handleLoadingStateChange(true);

    await firebase
      .firestore()
      .collection("users")
      .doc(this.props.userObject.userId)
      .update({
        playlists: newPlaylists
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
          userObject={this.props.userObject}
          playlistsArray={this.props.userObject.userData.playlists}
          handleSongsArray={this.props.handleSongsArray}
          handleDeletePlaylist={this.handleDeletePlaylist}
        />
        <AddPlaylist
          userObject={this.props.userObject}
          handleLoadingStateChange={this.handleLoadingStateChange}
        />
      </div>
    );
  }
}

export default Playlists;
