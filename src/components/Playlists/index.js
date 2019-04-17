import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

class Playlists extends React.Component {
  render() {
    return (
      <div className="small-div-right">
        <Link to="#">
          <div className="playlist-element">Default Playlist </div>
        </Link>
        <Link to="#">
          <div className="playlist-element">Playlist 1</div>
        </Link>
        <Link to="#">
          <div className="playlist-element">Playlist 2</div>
        </Link>
        <Link to="#">
          <div className="playlist-element">Playlist 3</div>
        </Link>
      </div>
    );
  }
}

export default Playlists;
