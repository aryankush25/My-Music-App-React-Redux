import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

const Playlist = props => {
  const playlistDiv = props.playlistsArray.map((playlist, index) => {
    return (
      <Link
        to="#"
        key={index}
        onClick={() => {
          props.handleSongsArray(playlist.playlist, index, props.userId);
        }}
      >
        <div className="playlist-element">Playlist {index + 1} </div>
      </Link>
    );
  });

  return <div>{playlistDiv}</div>;
};

class Playlists extends React.Component {
  render() {
    return (
      <div className="small-div-right">
        <Playlist
          playlistsArray={this.props.userArray.userData.playlists}
          handleSongsArray={this.props.handleSongsArray}
        />
      </div>
    );
  }
}

export default Playlists;
