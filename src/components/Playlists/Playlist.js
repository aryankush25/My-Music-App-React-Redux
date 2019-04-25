import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";
import firebase from "firebase/app";
import "firebase/auth";

const DeletePlaylist = props => {
  if (props.userObject.userData.uId !== firebase.auth().currentUser.uid) {
    return <p />;
  }

  return (
    <div
      className="d-inline playlist-cross"
      onClick={() => props.handleDeletePlaylist(props.index)}
    >
      {"  "}
      <FontAwesomeIcon icon={faTimesCircle} />
    </div>
  );
};

const Playlist = props => {
  const playlistDiv = props.playlistsArray.map((playlist, index) => {
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
          userObject={props.userObject}
          index={index}
          handleDeletePlaylist={props.handleDeletePlaylist}
        />
      </div>
    );
  });

  return <div className="playlists-container">{playlistDiv}</div>;
};

export default Playlist;
