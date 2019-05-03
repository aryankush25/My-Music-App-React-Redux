import React from "react";
import "./style.scss";
import EditPlaylist from "./EditPlaylist";
import { connect } from "react-redux";
import { setCurrentPlaylistNumberAction } from "../../redux/actions/actionPlaylist";

class Playlist extends React.Component {
  handleOnClick = (playlist, index) => {
    this.props.handleSongsArray(playlist, index);
    this.props.setCurrentPlaylistNumberAction(index);
  };

  render() {
    return this.props.playlistArray.map((playlist, index) => {
      return (
        <div
          key={index}
          className={
            "playlist-element " +
            (this.props.playlistNumber === index ? "selected-playlist" : "")
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
              this.props.userObject.userData.uId !== this.props.appCurrentUser
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

const mapStateToProps = state => {
  const { playlistArray, playlistNumber } = state.playlist;
  const { appCurrentUser } = state.app;
  const userObject = state.users.userArray[state.users.userNumber];

  return {
    playlistArray,
    playlistNumber,
    appCurrentUser,
    userObject
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentPlaylistNumberAction: userNumber =>
      dispatch(setCurrentPlaylistNumberAction(userNumber))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlist);
