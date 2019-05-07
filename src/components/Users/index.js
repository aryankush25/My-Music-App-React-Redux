import React from "react";
import "./style.scss";
import ShowLoadingComponent from "../ShowLoadingComponent";
import { connect } from "react-redux";
import { setCurrentUsersNumberAction } from "../../redux/actions/actionUsers";
import {
  setPlaylistAction,
  setCurrentPlaylistNumberAction
} from "../../redux/actions/actionPlaylist";
import {
  setSongArrayCardAction,
  setCurrentSongNumberCardAction
} from "../../redux/actions/actionSongsCard";

class UsersData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: 0
    };
  }

  handleOnClick = (user, index) => {
    this.props.setUserNumber(index);
    this.props.setPlaylistAction(
      this.props.userArray[index].userData.playlists
    );
    this.props.setCurrentPlaylistNumberAction(0);
    this.props.setSongArrayCardAction(
      this.props.userArray[index].userData.playlists[0].playlist
    );
    this.props.setCurrentSongNumberCardAction(0);
    this.setState({
      selectedUser: index
    });
  };

  render() {
    return this.props.userArray.map((user, index) => {
      if (this.props.currentUserId === user.userData.uId) {
        return (
          <div
            key={index}
            style={{ backgroundColor: "#77c4d3" }}
            onClick={() => this.handleOnClick(user, index)}
          >
            <div className="user-element"> {user.userData.userName} </div>
          </div>
        );
      }
      return (
        <div
          key={index}
          className={this.state.selectedUser === index ? "selected-user" : ""}
          style={{ backgroundColor: "" }}
          onClick={() => this.handleOnClick(user, index)}
        >
          <div className="user-element"> {user.userData.userName} </div>
        </div>
      );
    });
  }
}

class Users extends React.Component {
  render() {
    return (
      <ShowLoadingComponent isLoading={this.props.isLoadingUsers}>
        <div className="small-div-left">
          <UsersData
            userArray={this.props.userArray}
            currentUserId={this.props.appCurrentUser}
            setUserNumber={this.props.setCurrentUsersNumberAction}
            setPlaylistAction={this.props.setPlaylistAction}
            setCurrentPlaylistNumberAction={
              this.props.setCurrentPlaylistNumberAction
            }
            setSongArrayCardAction={this.props.setSongArrayCardAction}
            setCurrentSongNumberCardAction={
              this.props.setCurrentSongNumberCardAction
            }
          />
        </div>
      </ShowLoadingComponent>
    );
  }
}

const mapStateToProps = state => {
  const { userArray, userNumber, isLoading: isLoadingUsers } = state.users;
  const { appCurrentUser } = state.app;
  return { userArray, userNumber, isLoadingUsers, appCurrentUser };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentUsersNumberAction: userNumber =>
      dispatch(setCurrentUsersNumberAction(userNumber)),

    setPlaylistAction: userArray => dispatch(setPlaylistAction(userArray)),

    setCurrentPlaylistNumberAction: playlistNumber =>
      dispatch(setCurrentPlaylistNumberAction(playlistNumber)),

    setSongArrayCardAction: songsArray =>
      dispatch(setSongArrayCardAction(songsArray)),

    setCurrentSongNumberCardAction: songNumber =>
      dispatch(setCurrentSongNumberCardAction(songNumber))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
