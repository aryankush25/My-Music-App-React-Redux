import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "./style.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class UploadSong extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

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

  handleAddSong = async () => {
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
        <button className="btn btn-md btn-danger" onClick={this.toggle}>
          Upload Song
        </button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Upload Song</ModalHeader>
          <ModalBody>
            <input
              type="file"
              className="form-control btn btn-sm btn-danger"
              accept="audio/*"
              onChange={this.handleOnChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color="info"
              onClick={() => {
                if (this.selectedFile !== "") {
                  this.toggle();
                  this.handleAddSong();
                }
              }}
            >
              Upload
            </Button>{" "}
            <Button color="danger" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default UploadSong;
