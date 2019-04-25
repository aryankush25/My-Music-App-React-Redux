import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "./style.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class AddPlaylist extends React.Component {
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

  handleAddPlaylist = async () => {
    var userObject = this.props.userObject.userData;
    userObject.playlists.push({
      playlist: [],
      playlistName: this.playlistName
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
      return <p />;
    }
    return (
      <div className="button-class">
        <button onClick={this.toggle}>Add Playlist</button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Enter Name Of Playlist</ModalHeader>
          <ModalBody>
            <input
              type="text"
              className="form-control"
              placeholder="Enter New Playlist Name"
              required
              onChange={event => {
                this.playlistName = event.target.value;
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color="info"
              onClick={() => {
                if (this.playlistName !== "") {
                  this.toggle();
                  this.handleAddPlaylist();
                }
              }}
            >
              Add
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

export default AddPlaylist;
