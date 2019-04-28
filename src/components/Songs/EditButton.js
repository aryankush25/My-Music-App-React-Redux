import React from "react";
import "./style.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class EditButton extends React.Component {
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

  songName = "";
  songGenre = "Bollywood Music";
  songImageurl = "";
  songRatings = "5";

  handleOnChangeSongName = event => {
    this.songName = event.target.value;
  };

  handleOnChangeGenre = event => {
    this.songGenre = event.target.value;
  };

  handleOnChangeSongImageUrl = event =>
    (this.songImageurl = event.target.value);

  handleOnChangeRatings = event => (this.songRatings = event.target.value);

  render() {
    if (this.props.showDisableBtn) {
      return null;
    }

    return (
      <div className="edit-button">
        <button className="btn btn-md btn-info" onClick={this.toggle}>
          Edit Info
        </button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Edit Song Info</ModalHeader>
          <ModalBody>
            <div>
              <label className="form-lable">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter New Song Name"
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
                <option default>Bollywood Music</option>
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
                this.toggle();
                this.props.handleSongEdit(
                  this.props.index,
                  this.songName,
                  this.songImageurl,
                  this.songGenre,
                  this.songRatings
                );
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

export default EditButton;
