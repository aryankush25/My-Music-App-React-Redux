import React from "react";
import { connect } from "react-redux";

class MusicNameBar extends React.Component {
  render() {
    return <p>{this.props.currentSongName}</p>;
  }
}

const mapStateToProps = state => {
  const { songArray, songNumber } = state.song;

  var currentSongName = songArray[songNumber].name;

  return { currentSongName };
};

export default connect(mapStateToProps)(MusicNameBar);
