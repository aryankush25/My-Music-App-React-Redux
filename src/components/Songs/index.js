import React from "react";
import SongCard from "./SongCard";
import "./style.scss";

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
    );
  }
}

export default Songs;
