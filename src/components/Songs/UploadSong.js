import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "./style.scss";

class UploadSong extends React.Component {
  selectedFile = "";
  filePresent = true;
  handleOnChange = event => {
    this.selectedFile = event.target.files[0];
    this.filePresent = false;

    this.props.songsArray.forEach(doc => {
      if (doc.name === this.selectedFile.name) {
        this.filePresent = true;
      }
    });
  };

  handleOnClick = async () => {
    if (this.filePresent === false) {
      const uploadTask = firebase
        .storage()
        .ref()
        .child(`Music/${this.selectedFile.name}`)
        .put(this.selectedFile);

      uploadTask.on(
        "state_changed",
        () => {
          this.props.handleLoadingStateChange(true);
        },
        error => {
          this.props.handleLoadingStateChange(false);
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(async url => {
            var userObject = this.props.userObject.userData;
            userObject.playlists[this.props.index].playlist.push({
              name: this.selectedFile.name,
              url: url
            });

            await firebase
              .firestore()
              .collection("users")
              .doc(this.props.userId)
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
          });
        }
      );
    }
  };

  render() {
    if (
      this.props.userObject.userData.uId !== firebase.auth().currentUser.uid
    ) {
      return <p />;
    }

    return (
      <div className="filesubmit">
        <input
          type="file"
          className="file-select btn btn-md btn-danger"
          accept="audio/*"
          onChange={this.handleOnChange}
        />
        <button className="btn btn-md btn-info" onClick={this.handleOnClick}>
          Upload
        </button>
      </div>
    );
  }
}

export default UploadSong;
