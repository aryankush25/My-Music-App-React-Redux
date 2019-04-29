import React from "react";
import currentUser from "../../services/firebaseAuth/currentUser";
import "./style.scss";
import uploadImage from "../../services/firebaseStorage/uploadImage";

class UserImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  handleSetImage = event => {
    const selectedFile = event.target.files[0];
    const uploadTask = uploadImage(selectedFile);

    uploadTask.on(
      "state_changed",
      () => {
        this.handleLoadingStateChange(true);
      },
      error => {
        this.handleLoadingStateChange(false);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(async url => {
          var user = await currentUser();
          await user.updateProfile({
            photoURL: url
          });
          this.props.getCurrentUserData();
          this.handleLoadingStateChange(false);
        });
      }
    );
  };

  handleRemoveUserImage = async () => {
    this.handleLoadingStateChange(true);
    var user = await currentUser();
    await user.updateProfile({
      photoURL: ""
    });
    this.props.getCurrentUserData();
    this.handleLoadingStateChange(false);
  };

  handleLoadingStateChange = isLoading => {
    this.setState({
      isLoading: isLoading
    });
  };

  render() {
    if (this.state.isLoading === true) {
      return (
        <div className="d-flex justify-content-center loader-songs ">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }

    if (this.props.photoURL === null) {
      return (
        <div className="card-image">
          <input type="file" accept="image/*" onChange={this.handleSetImage} />
          <div className="set-image"> Set Image </div>
        </div>
      );
    }

    return (
      <div>
        <div className="card-image">
          <a href={this.props.photoURL}>
            <img src={this.props.photoURL} alt="User-Img" />
          </a>
          <div className="change-image">
            <input
              type="file"
              accept="image/*"
              onChange={this.handleSetImage}
            />
            Change Image
          </div>
        </div>
        <button
          className="btn btn-sm btn-danger"
          onClick={this.handleRemoveUserImage}
        >
          Remove User Image
        </button>
      </div>
    );
  }
}

export default UserImage;
