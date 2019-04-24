import React from "react";
import { withRouter, Link } from "react-router-dom";
import "./style.scss";
import signOutUser from "../../services/firebaseAuth/signOutUser";
import currentUser from "../../services/firebaseAuth/currentUser";
import userImage from "../../assets/images/userImage.png";

class FetchCurrentUserDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      userProfilePic: ""
    };
  }

  componentDidMount() {
    this.fetchCurrentUser();
  }

  fetchCurrentUser = () => {
    const currentUserName = currentUser().displayName.toUpperCase();
    var currentUserImage = currentUser().photoURL;
    if (currentUserImage === null) {
      currentUserImage = userImage;
    }
    this.setState({
      userName: currentUserName,
      userProfilePic: currentUserImage
    });
  };

  render() {
    return (
      <div className="user-details">
        <img src={this.state.userProfilePic} alt="img" className="userImage" />
        <Link to="/profile">{this.state.userName}</Link>
      </div>
    );
  }
}

class NavBar extends React.Component {
  handleSignOut = async () => {
    await signOutUser();
    window.localStorage.setItem("musicAppSignedIn", false);
    this.props.sound.unload();
    this.props.history.push("/login");
  };

  render() {
    return (
      <div className="header-div-middle">
        <div className="input-group">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </div>

        {/* <button className="btn btn-info" onClick={this.handleSignOut}>
          Logout
        </button> */}

        <FetchCurrentUserDetails />
      </div>
    );
  }
}

export default withRouter(NavBar);
