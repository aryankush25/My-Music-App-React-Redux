import React from "react";
import currentUser from "../../services/firebaseAuth/currentUser";
import "./style.scss";
import ShowLoadingComponent from "../ShowLoadingComponent";
import updateUser from "../../services/firebaseFirestore/updateUser";
import fetchUsers from "../../services/firebaseFirestore/fetchUsers";

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      showName: true
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  name = "";

  handleSubmitName = async e => {
    e.preventDefault();
    this.handleLoadingStateChange(true);
    var user = await currentUser();
    await user.updateProfile({
      displayName: this.name
    });

    await updateUser(this.userId, this.name);

    this.setState({
      showName: true
    });
    this.props.getCurrentUserData();
    this.handleLoadingStateChange(false);
  };

  fetchUsers = async () => {
    var querySnapshot = await fetchUsers();
    var userId = await currentUser().uid;

    querySnapshot.forEach(user => {
      if (userId === user.data().uId) {
        this.userId = user.id;
      }
    });
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
    return (
      <ShowLoadingComponent isLoading={this.state.isLoading}>
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
              <button className="btn btn-md btn-danger">Submit</button>
            </form>
          </div>

          <div>
            <label className="form-lable">Email:</label>
            <h5> {this.props.email} </h5>
          </div>

          <button
            className="btn btn-md btn-danger"
            onClick={this.props.handleSignOut}
          >
            Sign Out
          </button>
        </div>
      </ShowLoadingComponent>
    );
  }
}

export default UserInfo;
