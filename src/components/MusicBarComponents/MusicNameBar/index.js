import React from "react";
import { connect } from "react-redux";
import "./style.scss";

class MusicImage extends React.Component {
  render() {
    if (this.props.currentSongImage !== "") {
      return <img src={this.props.currentSongImage} alt="User-Img" />;
    } else {
      return (
        <div className="song-image-bar">
          <p>
            {this.props.currentSongName
              ? this.props.currentSongName.trim(0).charAt(0)
              : "?"}
          </p>
        </div>
      );
    }
  }
}

class MusicNameBar extends React.Component {
  render() {
    if (this.props.songsArrayLength === 0) {
      return (
        <div className="song-name-music-bar">
          <p>Please Upload a Song</p>
        </div>
      );
    }

    return (
      <div className="song-name-music-bar">
        <MusicImage
          currentSongImage={this.props.currentSongImage}
          currentSongName={this.props.currentSongName}
        />
        <p>{this.props.currentSongName}</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { songArray, songNumber } = state.song;

  var songsArrayLength = songArray.length;

  if (songsArrayLength === 0) {
    return { songsArrayLength };
  }

  var currentSongName = songArray[songNumber].name;

  var currentSongImage = songArray[songNumber].imageUrl;

  return { currentSongName, currentSongImage };
};

export default connect(mapStateToProps)(MusicNameBar);
