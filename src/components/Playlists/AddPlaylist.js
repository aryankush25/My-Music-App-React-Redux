import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "./style.scss";

class AddPlaylist extends React.Component {
  handleAddPlaylist = async () => {
    var userObject = this.props.userObject.userData;
    userObject.playlists.push({
      playlist: []
    });

    this.props.handleLoadingStateChange(true);

    await firebase
      .firestore()
      .collection("users")
      .doc(this.props.userObject.userId)
      .update({
        playlists: userObject.playlists
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch(error => {
        console.error("Error writing document: ", error);
      });
    this.props.handleLoadingStateChange(false);
  };

  render() {
    if (
      this.props.userObject.userData.uId !== firebase.auth().currentUser.uid
    ) {
      return <p>You Make Playlists</p>;
    }
    return (
      <div className="button-class">
        <button onClick={() => this.handleAddPlaylist()}>Add Playlist</button>
      </div>
    );
  }
}

export default AddPlaylist;
