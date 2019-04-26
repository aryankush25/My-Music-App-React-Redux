import React from "react";
import SongCard from "./SongCard";
import "./style.scss";
import ShowLoadingComponent from "../ShowLoadingComponent";

class Songs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      songsArray: []
    };
  }

  handleLoadingStateChange = isLoading => {
    this.setState({
      isLoading: isLoading
    });
  };

  render() {
    return (
      <ShowLoadingComponent isLoading={this.state.isLoading}>
        <SongCard
          userObject={this.props.userObject}
          songsArray={this.props.songsArray}
          index={this.props.index}
          userId={this.props.userId}
          handleClickedUser={this.props.handleClickedUser}
          handleSongClick={this.props.handleSongClick}
          handleArrayUpdate={this.props.handleArrayUpdate}
          handleLoadingStateChange={this.handleLoadingStateChange}
        />
      </ShowLoadingComponent>
    );
  }
}

export default Songs;
