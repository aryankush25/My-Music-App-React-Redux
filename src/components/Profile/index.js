import React from "react";
import signOutUser from "../../services/firebaseAuth/signOutUser";
import currentUser from "../../services/firebaseAuth/currentUser";
import "./style.scss";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Aryan"
    };
  }

  handleSignOut = async () => {
    await signOutUser();
    window.localStorage.setItem("musicAppSignedIn", false);
    this.props.history.push("/login");
  };

  func = async () => {
    var currentUserData = await currentUser();
    console.log(currentUserData);
  };

  render() {
    this.func();
    return (
      <div className="profile-container">
        <h1>Profile</h1>
        <button className="btn btn-info" onClick={this.handleSignOut}>
          Logout
        </button>
      </div>
    );
  }
}
export default Profile;
