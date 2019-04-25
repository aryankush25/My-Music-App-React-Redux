import React from "react";
import currentUser from "../../services/firebaseAuth/currentUser";
import "./style.scss";

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      showName: true
    };
  }

  name = "";

  handleSubmitName = async e => {
    e.preventDefault();
    this.handleLoadingStateChange(true);
    console.log(this.name);
    var user = await currentUser();
    await user.updateProfile({
      displayName: this.name
    });
    this.setState({
      showName: true
    });
    this.props.getCurrentUserData();
    this.handleLoadingStateChange(false);
  };

  handleChangeName = event => {
    this.name = event.target.value;
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

    return (
      <div className="card-body profile-card-body">
        <div>
          <label className="form-lable">Name:</label>
          <h5>{this.props.displayName}</h5>
          <form onSubmit={this.handleSubmitName}>
            <input
              type="text"
              id="inputName"
              className="form-control"
              placeholder="Enter New Name"
              required
              onChange={this.handleChangeName}
            />
          </form>
        </div>

        <div>
          <label className="form-lable">Email:</label>
          <h5> {this.props.email} </h5>
        </div>

        <button
          className="btn btn-md btn-info"
          onClick={this.props.handleSignOut}
        >
          Sign Out
        </button>
      </div>
    );
  }
}

export default UserInfo;
