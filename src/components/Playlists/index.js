import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

class Playlists extends React.Component {
  func = () => {
    firebase
      .firestore()
      .collection("users")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc1 => {
          console.log(doc1.ref);
          doc1.ref.getCollections().then(collection => {
            collection.forEach(coll => {
              coll.get().then(doc => {
                doc.forEach(data => {
                  console.log(data);
                });
              });
            });
          });
        });
      });
  };

  render() {
    this.func();

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
