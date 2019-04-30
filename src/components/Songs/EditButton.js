import React from "react";
import "./style.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import StarRatings from "react-star-ratings";

class EditButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      rating: 0,
      songName: "",
      songGenre: "Bollywood Music",
      songImageurl: ""
    };
    this.toggle = this.toggle.bind(this);
  }

  changeRating = newRating => {
    this.setState({
      rating: newRating
    });
  };

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
      rating: this.props.songRating,
      songName: this.props.songName,
      songGenre: this.props.songGenre,
      songImageurl: this.props.songImageurl
    }));
  }

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
                value={this.state.songGenre}
                required
                autoFocus
                onChange={this.handleOnChangeGenre}
              >
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
                value={this.state.songImage}
                required
                autoFocus
                onChange={this.handleOnChangeSongImageUrl}
              />
            </div>

            <div className="rating-div">
              <label className="form-lable">Ratings</label>
              <br />
              <StarRatings
                rating={this.state.rating}
                starRatedColor="blue"
                changeRating={this.changeRating}
                numberOfStars={5}
                name="rating"
                starDimension="20px"
                starSpacing="5px"
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="info"
              onClick={() => {
                this.toggle();
                this.props.handleSongEdit(
                  this.props.index,
                  this.state.songName,
                  this.state.songImageurl,
                  this.state.songGenre,
                  this.state.rating
                );
              }}
            >
              Change
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
