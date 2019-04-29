import React from "react";
import "./style.scss";
import ShowLoadingComponent from "../ShowLoadingComponent";
import fetchUsersCollections from "../../services/firebaseFirestore/fetchUsersCollections";
import currentUser from "../../services/firebaseAuth/currentUser";

const UsersData = props => {
  return props.userArray.map((user, index) => {
    if (props.currentUserId === user.userData.uId) {
      return (
        <div
          key={index}
          style={{ backgroundColor: "#77c4d3" }}
          onClick={() => props.handleClickedUser(user)}
        >
          <div className="user-element"> {user.userData.userName} </div>
        </div>
      );
    }
    return (
      <div
        key={index}
        style={{ backgroundColor: "" }}
        onClick={() => props.handleClickedUser(user)}
      >
        <div className="user-element"> {user.userData.userName} </div>
      </div>
    );
  });
};

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      userArray: []
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  currentUserId = "";

  fetchUsers = async () => {
    this.currentUserId = await currentUser().uid;
    var userSnapshot = await fetchUsersCollections();

    userSnapshot.onSnapshot(querySnapshot => {
      var userArray = [];
      querySnapshot.forEach(user => {
        var obj = { userData: user.data(), userId: user.id };
        userArray.push(obj);
        if (this.currentUserId === user.data().uId) {
          this.props.handleClickedUser(obj);
        }
      });
      this.setState({
        isLoading: false,
        userArray: userArray
      });
    });
  };

  render() {
    return (
      <ShowLoadingComponent isLoading={this.state.isLoading}>
        <div className="small-div-left">
          <UsersData
            userArray={this.state.userArray}
            currentUserId={this.currentUserId}
            handleClickedUser={this.props.handleClickedUser}
          />
        </div>
      </ShowLoadingComponent>
    );
  }
}

export default Users;
