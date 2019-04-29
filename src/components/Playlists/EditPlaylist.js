import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class EditPlaylist extends React.Component {
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

  handleSubmitButton = () => {
    if (this.newPlaylistName !== "") {
      this.toggle();
      this.props.handleEditPlaylist(this.props.index, this.newPlaylistName);
    }
  };

  newPlaylistName = "";

  render() {
    if (this.props.showDisableBtn) {
      return null;
    }

    return (
      <div className="d-inline" onClick={this.toggle}>
        <div className="d-inline playlist-cross">
          {" "}
          <FontAwesomeIcon icon={faEdit} />
        </div>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            Edit Playlist / Delete Playlist
          </ModalHeader>
          <ModalBody>
            <button
              className="btn btn-md btn-danger delete-playlist"
              onClick={this.props.handleDeletePlaylist}
            >
              Delete Playlist
            </button>

            <input
              type="text"
              className="form-control"
              placeholder="Enter New Playlist Name"
              required
              onChange={event => {
                this.newPlaylistName = event.target.value;
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="info" onClick={this.handleSubmitButton}>
              Change Name
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

export default EditPlaylist;
