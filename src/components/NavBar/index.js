import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import currentUser from "../../services/firebaseAuth/currentUser";
import userImage from "../../assets/images/userImage.png";
import { connect } from "react-redux";
import { setSongStopAction } from "../../redux/actions/actionSongs";

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
    var currentUserName = currentUser().displayName;
    if (currentUserName !== null) {
      currentUserName = currentUserName.toUpperCase();
    }
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
        <Link to="/profile" onClick={() => this.props.setSongStopAction(true)}>
          {this.state.userName}
        </Link>
      </div>
    );
  }
}

class NavBar extends React.Component {
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

        <FetchCurrentUserDetails />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setSongStopAction: stopSong => dispatch(setSongStopAction(stopSong))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(NavBar);
