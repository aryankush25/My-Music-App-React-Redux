import React from "react";
import "./style.scss";
import firebase from "firebase/app";
import "firebase/auth";
import EditPlaylist from "./EditPlaylist";

const Playlist = props => {
  return props.playlistsArray.map((playlist, index) => {
    return (
      <div key={index} className="playlist-element">
        <div
          onClick={() => {
            props.handleSongsArray(playlist.playlist, index);
          }}
          className="d-inline playlist-text"
        >
          {playlist.playlistName}
        </div>
        <EditPlaylist
          showDisableBtn={
            props.userObject.userData.uId !== firebase.auth().currentUser.uid
          }
          index={index}
          handleDeletePlaylist={() => props.handleDeletePlaylist(index)}
          handleEditPlaylist={props.handleEditPlaylist}
        />
      </div>
    );
  });
};

export default Playlist;
