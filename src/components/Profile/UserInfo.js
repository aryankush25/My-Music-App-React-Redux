import React from "react";
import currentUser from "../../services/firebaseAuth/currentUser";
import "./style.scss";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import ShowLoadingComponent from "../ShowLoadingComponent";

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

    await firebase
      .firestore()
      .collection("users")
      .doc(this.userId)
      .update({
        userName: this.name
      });

    this.setState({
      showName: true
    });
    this.props.getCurrentUserData();
    this.handleLoadingStateChange(false);
  };

  fetchUsers = () => {
    firebase
      .firestore()
      .collection("users")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(user => {
          if (firebase.auth().currentUser.uid === user.data().uId) {
            this.userId = user.id;
          }
        });
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
      </ShowLoadingComponent>
    );
  }
}

export default UserInfo;
