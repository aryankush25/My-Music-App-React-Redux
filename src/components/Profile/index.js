import React from "react";
import signOutUser from "../../services/firebaseAuth/signOutUser";

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

  render() {
    return (
      <div>
        <h1>Profile</h1>
        <button className="btn btn-info" onClick={this.handleSignOut}>
          Logout
        </button>
      </div>
    );
  }
}
export default Profile;
