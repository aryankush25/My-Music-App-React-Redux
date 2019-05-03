import React from "react";
import SongsCard from "./SongCard";
import "./style.scss";
import ShowLoadingComponent from "../ShowLoadingComponent";
import { connect } from "react-redux";

class Songs extends React.Component {
  render() {
    return (
      <ShowLoadingComponent isLoading={this.props.isLoadingSong}>
        <SongsCard
          userObject={this.props.userObject}
          songsArray={this.props.songsArray}
          index={this.props.index}
          userId={this.props.userId}
        />
      </ShowLoadingComponent>
    );
  }
}

const mapStateToProps = state => {
  const { isLoading: isLoadingSong, songArray: songsArray } = state.song;
  const userObject = state.users.userArray[state.users.userNumber];

  return { isLoadingSong, userObject, songsArray };
};

export default connect(
  mapStateToProps,
  null
)(Songs);
