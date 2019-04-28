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
  songGenre = "";
  songRatings = "";
  songImageurl = "";

  filePresent = true;
  handleOnChangeUpalodSong = event => {
    this.selectedFile = event.target.files[0];
    this.filePresent = false;

    this.props.songsArray.forEach(doc => {
      if (doc.name === this.selectedFile.name) {
        this.filePresent = true;
      }
    });
  };

  handleOnChangeGenre = event => {
    this.songGenre = event.target.value;
  };

  handleOnChangeSongImageUrl = event =>
    (this.songImageurl = event.target.value);

  handleOnChangeRatings = event => (this.songRatings = event.target.value);

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
              url: url,
              genre: this.songGenre,
              ratings: this.songRatings,
              imageUrl: this.songImageurl
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
    if (this.props.showDisableBtn) {
      return null;
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
            <div>
              <label className="form-lable">Song</label>
              <input
                type="file"
                className="form-control btn btn-sm btn-info"
                accept="audio/*"
                required
                autoFocus
                onChange={this.handleOnChangeUpalodSong}
              />
            </div>

            <div>
              <label className="form-lable">Genre</label>
              <select
                className="form-control"
                placeholder="Select Genre"
                required
                autoFocus
                onChange={this.handleOnChangeGenre}
              >
                <option default>Bollywood Music</option>
                <option>EDM</option>
                <option>Rock Music</option>
                <option>Jazz</option>
                <option>Dubstep</option>
                <option>Rhythm and Blues</option>
                <option>Classical Music</option>
                <option>Indie Rock</option>
                <option>Pop Music</option>
                <option>Others</option>
              </select>
            </div>

            <div>
              <label className="form-lable">Song Image URL</label>
              <input
                type="url"
                className="form-control"
                placeholder="Enter Song Image URL"
                required
                autoFocus
                onChange={this.handleOnChangeSongImageUrl}
              />
            </div>

            <div>
              <label className="form-lable">Ratings</label>
              <select
                className="form-control"
                placeholder="Select Ratings"
                required
                autoFocus
                onChange={this.handleOnChangeRatings}
              >
                <option default>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
              </select>
            </div>
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
