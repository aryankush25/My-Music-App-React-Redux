import React from "react";
import "./style.scss";
import { connect } from "react-redux";
import OverlaySongCard from "./OverlaySongCard";

const SongImage = props => {
  if (props.songImage === "") {
    return (
      <div className="song-logo">
        {props.songName ? props.songName.trim().charAt(0) : "?"}
      </div>
    );
  }
  return (
    <div className="song-logo">
      <img src={props.songImage} alt="Song-Img" />
    </div>
  );
};

class SongCard extends React.Component {
  render() {
    return this.props.songsArray.map((song, index) => {
      return (
        <div
          className={
            "card song-div " +
            (this.props.songNumber === index ? "selected-song" : "")
          }
          key={index}
        >
          <SongImage songImage={song.imageUrl} songName={song.name} />
          <div className="card-body song-card-body">
            <p className="card-text">
              {song.name ? song.name.trim() : "NO NAME"}
            </p>
          </div>
          <OverlaySongCard
            song={song}
            index={index}
            handleSongLike={this.props.handleSongLike}
            handleSongUnLike={this.props.handleSongUnLike}
            handleSongDelete={this.props.handleSongDelete}
            handleSongEdit={this.props.handleSongEdit}
          />
        </div>
      );
    });
  }
}

const mapStateToProps = state => {
  const { songArray: songsArray, songNumber } = state.song;

  return { songsArray, songNumber };
};

export default connect(mapStateToProps)(SongCard);
