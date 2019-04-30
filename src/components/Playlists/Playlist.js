import React from "react";
import "./style.scss";
import firebase from "firebase/app";
import "firebase/auth";
import EditPlaylist from "./EditPlaylist";

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectePlaylist: 0
    };
  }

  handleOnClick = (playlist, index) => {
    this.props.handleSongsArray(playlist, index);
    this.setState({
      selectePlaylist: index
    });
  };

  render() {
    return this.props.playlistsArray.map((playlist, index) => {
      return (
        <div
          key={index}
          className={
            "playlist-element " +
            (this.state.selectePlaylist === index ? "selected-playlist" : "")
          }
        >
          <div
            onClick={() => {
              this.handleOnClick(playlist.playlist, index);
            }}
            className="d-inline playlist-text"
          >
            {playlist.playlistName}
          </div>
          <EditPlaylist
            showDisableBtn={
              this.props.userObject.userData.uId !==
              firebase.auth().currentUser.uid
            }
            index={index}
            handleDeletePlaylist={() => this.props.handleDeletePlaylist(index)}
            handleEditPlaylist={this.props.handleEditPlaylist}
          />
        </div>
      );
    });
  }
}

export default Playlist;
