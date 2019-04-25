import React from "react";
import { Link } from "react-router-dom";
import signOutUser from "../../services/firebaseAuth/signOutUser";
import currentUser from "../../services/firebaseAuth/currentUser";
import UserImage from "./UserImage";
import UserInfo from "./UserInfo";
import "./style.scss";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: "",
      email: "",
      phoneNumber: "",
      photoURL: ""
    };
  }

  componentDidMount() {
    this.getCurrentUserData();
  }

  handleSignOut = async () => {
    await signOutUser();
    window.localStorage.setItem("musicAppSignedIn", false);
    this.props.history.push("/login");
  };

  getCurrentUserData = async () => {
    var currentUserData = await currentUser();
    console.log(currentUserData);
    this.setState({
      displayName: currentUserData.displayName,
      email: currentUserData.email,
      phoneNumber: currentUserData.phoneNumber,
      photoURL: currentUserData.photoURL
    });
  };

  render() {
    return (
      <div className="profile-container">
        <div className="mini-profile-container">
          <div className="card">
            <div className="card-header login-card-header">
              <h1>User Profile</h1>
              <UserImage
                photoURL={this.state.photoURL}
                getCurrentUserData={this.getCurrentUserData}
              />
            </div>
            <UserInfo
              displayName={this.state.displayName}
              phoneNumber={this.state.phoneNumber}
              email={this.state.email}
              handleSignOut={this.handleSignOut}
              getCurrentUserData={this.getCurrentUserData}
            />
            <Link to="/home" className="btn btn-md btn-info">
              Back To Home
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default Profile;
