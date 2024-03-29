import React from "react";
import EditButton from "./EditButton";
import "./style.scss";
import { connect } from "react-redux";
import { setSongAndPlayFromSongCardAction } from "../../redux/actions/actionSongs";
import {
  setSongUserAction,
  setSongPlaylistAction
} from "../../redux/actions/actionSongs";

const DeleteButton = props => {
  if (props.showDisableBtn) {
    return null;
  }
  return (
    <button className="btn btn-md btn-danger" onClick={props.handleSongDelete}>
      Delete
    </button>
  );
};

class OverlaySongsButtons extends React.Component {
  render() {
    return (
      <div className="test-class song-buttons">
        <button
          className="btn btn-md btn-info"
          onClick={() => {
            this.props.setSongAndPlayFromSongCardAction(
              this.props.songArray,
              this.props.index
            );
            this.props.setSongUserAction(this.props.userNumber);
            this.props.setSongPlaylistAction(this.props.playlistNumber);
          }}
        >
          Play
        </button>
        <DeleteButton
          showDisableBtn={this.props.showDisableBtn}
          handleSongDelete={() => this.props.handleSongDelete(this.props.index)}
        />
        <EditButton
          showDisableBtn={this.props.showDisableBtn}
          songImage={this.props.song.imageUrl}
          songName={this.props.song.name}
          songGenre={this.props.song.genre}
          songRating={this.props.song.ratings}
          index={this.props.index}
          handleSongEdit={this.props.handleSongEdit}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const userObject = state.users.userArray[state.users.userNumber].userData.uId;
  const currentUserId = state.app.appCurrentUser;

  const songArray = state.songsCard.songArrayCard;

  const { playlistNumber } = state.playlist;
  const { userNumber } = state.users;

  var showDisableBtn = true;
  if (userObject === currentUserId) {
    showDisableBtn = false;
  }
  return { showDisableBtn, songArray, playlistNumber, userNumber };
};

const mapDispatchToProps = dispatch => {
  return {
    setSongAndPlayFromSongCardAction: (songArray, songNumber) =>
      dispatch(setSongAndPlayFromSongCardAction(songArray, songNumber)),

    setSongUserAction: userNumber => dispatch(setSongUserAction(userNumber)),

    setSongPlaylistAction: playlistNumber =>
      dispatch(setSongPlaylistAction(playlistNumber))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OverlaySongsButtons);
