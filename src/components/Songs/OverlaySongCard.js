import React from "react";
import "./style.scss";
import OverlaySongInfo from "./OverlaySongsInfo";
import OverlaySongsButtons from "./OverlaySongsButtons";

class OverlaySongCard extends React.Component {
  render() {
    return (
      <div className="overlay">
        <OverlaySongInfo
          song={this.props.song}
          index={this.props.index}
          handleSongLike={this.props.handleSongLike}
          handleSongUnLike={this.props.handleSongUnLike}
        />
        <OverlaySongsButtons
          song={this.props.song}
          index={this.props.index}
          handleSongDelete={this.props.handleSongDelete}
          handleSongEdit={this.props.handleSongEdit}
        />
      </div>
    );
  }
}

export default OverlaySongCard;
