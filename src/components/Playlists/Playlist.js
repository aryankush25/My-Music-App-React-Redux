import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";
import firebase from "firebase/app";
import "firebase/auth";

const DeletePlaylist = props => {
  if (props.showDisableBtn) {
    return null;
  }

  return (
    <div
      className="d-inline playlist-cross"
      onClick={props.handleDeletePlaylist}
    >
      {"  "}
      <FontAwesomeIcon icon={faTimesCircle} />
    </div>
  );
};

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
        <DeletePlaylist
          showDisableBtn={
            props.userObject.userData.uId !== firebase.auth().currentUser.uid
          }
          handleDeletePlaylist={() => props.handleDeletePlaylist(index)}
        />
      </div>
    );
  });
};

export default Playlist;
