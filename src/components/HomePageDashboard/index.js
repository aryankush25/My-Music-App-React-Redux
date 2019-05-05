import React from "react";
import NavBar from "../NavBar/";
import Playlists from "../Playlists/";
import Songs from "../Songs/";
import Users from "../Users/";
import ShowLoadingComponent from "../ShowLoadingComponent";
import "./style.scss";
import fetchUsersCollections from "../../services/firebaseFirestore/fetchUsersCollections";
import { connect } from "react-redux";
import {
  setUsersAction,
  setUsersIsLoadingAction
} from "../../redux/actions/actionUsers";
import {
  setPlaylistAction,
  setPlaylistIsLoadingAction
} from "../../redux/actions/actionPlaylist";
import {
  setSongAction,
  setSongIsLoadingAction
} from "../../redux/actions/actionSongs";

class HomePageDashboard extends React.Component {
  componentDidMount() {
    this.fetchUsers();
  }
  fetchUsers = async () => {
    var userSnapshot = await fetchUsersCollections();

    userSnapshot.onSnapshot(querySnapshot => {
      var userArray = [];
      var currentObj = {};
      querySnapshot.forEach(user => {
        var obj = { userData: user.data(), userId: user.id };

        if (this.props.appCurrentUser === user.data().uId) {
          currentObj = obj;
        } else {
          userArray.push(obj);
        }
      });
      userArray.unshift(currentObj);

      this.props.setUsersAction(userArray);
      this.props.setUsersIsLoadingAction(false);
      this.props.setPlaylistAction(
        userArray[this.props.userNumber].userData.playlists
      );
      this.props.setPlaylistIsLoadingAction(false);
      this.props.setSongAction(
        userArray[this.props.userNumber].userData.playlists[
          this.props.playlistNumber
        ].playlist
      );
      this.props.setSongIsLoadingAction(false);
    });
  };

  render() {
    return (
      <div className="row upper-div">
        <div className="col left-col">
          <div className="header-div-left">
            <p className="friends-logo">FRIENDS</p>
          </div>
          <Users />
        </div>

        <div className="col-8 middle-col">
          <NavBar sound={this.props.sound} />

          <ShowLoadingComponent isLoading={this.props.isLoadingSong}>
            <Songs />
          </ShowLoadingComponent>
        </div>

        <div className="col right-col">
          <div className="header-div-right">
            <p className="playlist-logo">PLAYLISTS</p>
          </div>
          <ShowLoadingComponent isLoading={this.props.isLoadingPlaylist}>
            <Playlists />
          </ShowLoadingComponent>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { isLoading: isLoadingPlaylist } = state.playlist;
  const { isLoading: isLoadingSong } = state.song;
  const { appCurrentUser } = state.app;

  const { playlistNumber } = state.playlist;
  const { userNumber } = state.users;

  // console.log(playlistNumber, userNumber);

  return {
    isLoadingPlaylist,
    isLoadingSong,
    appCurrentUser,
    playlistNumber,
    userNumber
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUsersAction: userArray => dispatch(setUsersAction(userArray)),

    setUsersIsLoadingAction: isLoading =>
      dispatch(setUsersIsLoadingAction(isLoading)),

    setPlaylistAction: playlistArray =>
      dispatch(setPlaylistAction(playlistArray)),

    setPlaylistIsLoadingAction: isLoading =>
      dispatch(setPlaylistIsLoadingAction(isLoading)),

    setSongAction: songArray => dispatch(setSongAction(songArray)),

    setSongIsLoadingAction: isLoading =>
      dispatch(setSongIsLoadingAction(isLoading))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePageDashboard);
