import React from "react";
import updatePlaylist from "../../services/firebaseFirestore/updatePlaylist";
import uploadSong from "../../services/firebaseStorage/uploadSong";
import "./style.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { setSongIsLoadingAction } from "../../redux/actions/actionSongs";

class UploadSong extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      songName: "",
      buttonIsDisable: true,
      songGenre: "Bollywood Music",
      songImageurl: ""
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.selectedFile = "";
    this.songRatings = 0;
    this.setState(prevState => ({
      modal: !prevState.modal,
      songName: "",
      buttonIsDisable: true,
      songGenre: "",
      songImageurl: ""
    }));
  }

  selectedFile = "";
  songRatings = 0;

  filePresent = true;
  handleOnChangeUpalodSong = event => {
    this.selectedFile = event.target.files[0];
    this.filePresent = false;
    this.setState(
      {
        songName: this.selectedFile.name
      },
      () => {
        this.props.songsArray.forEach(doc => {
          if (doc.name === this.selectedFile.name) {
            this.filePresent = true;
          }
        });

        if (this.filePresent === false) {
          this.setState({
            buttonIsDisable: false
          });
        }
      }
    );
  };

  handleOnChangeSongName = event => {
    this.setState({
      songName: event.target.value
    });
  };

  handleOnChangeGenre = event => {
    this.setState({
      songGenre: event.target.value
    });
  };

  handleOnChangeSongImageUrl = event => {
    this.setState({
      songImageurl: event.target.value
    });
  };

  handleOnChangeRatings = event => (this.songRatings = event.target.value);

  handleAddSong = async () => {
    if (this.filePresent === false) {
      const { songName, songGenre, songImageurl } = this.state;
      this.props.setSongIsLoadingAction(true);
      const uploadTask = uploadSong(this.selectedFile);
      uploadTask.on(
        "state_changed",
        task => {
          console.log(task);
        },
        error => {
          console.log(error);
          this.props.setSongIsLoadingAction(false);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(async url => {
            var userObject = this.props.userObject.userData;
            userObject.playlists[this.props.playlistNumber].playlist.push({
              name: songName,
              url: url,
              genre: songGenre,
              ratings: this.songRatings,
              imageUrl: songImageurl,
              likedBy: []
            });

            try {
              await updatePlaylist(this.props.userId, userObject.playlists);
              console.log("Document successfully written!");
            } catch (error) {
              console.error("Error writing document: ", error);
            }
          });
          this.props.setSongIsLoadingAction(false);
        }
      );
    }
  };

  handleOnClickUpload = () => {
    if (this.selectedFile !== "" && this.state.songName !== "") {
      this.handleAddSong();
      this.toggle();
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
              <label className="form-lable">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter New Song Name"
                value={this.state.songName}
                required
                autoFocus
                onChange={this.handleOnChangeSongName}
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
                <option>Select</option>
                <option>Bollywood Music</option>
                <option>EDM</option>
                <option>Rock Music</option>
                <option>Jazz Music</option>
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
          </ModalBody>
          <ModalFooter>
            <Button
              color="info"
              disabled={this.state.buttonIsDisable}
              onClick={this.handleOnClickUpload}
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

const mapStateToProps = state => {
  const { isLoading: isLoadingSong } = state.song;

  return {
    isLoadingSong
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSongIsLoadingAction: isLoading =>
      dispatch(setSongIsLoadingAction(isLoading))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadSong);
