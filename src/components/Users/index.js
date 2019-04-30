import React from "react";
import "./style.scss";
import ShowLoadingComponent from "../ShowLoadingComponent";
import fetchUsersCollections from "../../services/firebaseFirestore/fetchUsersCollections";
import currentUser from "../../services/firebaseAuth/currentUser";

class UsersData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: 0
    };
  }

  handleOnClick = (user, index) => {
    this.props.handleClickedUser(user);
    this.setState({
      selectedUser: index
    });
  };

  render() {
    return this.props.userArray.map((user, index) => {
      if (this.props.currentUserId === user.userData.uId) {
        return (
          <div
            key={index}
            style={{ backgroundColor: "#77c4d3" }}
            onClick={() => this.handleOnClick(user, index)}
          >
            <div className="user-element"> {user.userData.userName} </div>
          </div>
        );
      }
      return (
        <div
          key={index}
          className={this.state.selectedUser === index ? "selected-user" : ""}
          style={{ backgroundColor: "" }}
          onClick={() => this.handleOnClick(user, index)}
        >
          <div className="user-element"> {user.userData.userName} </div>
        </div>
      );
    });
  }
}

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
      var currentObj = {};
      querySnapshot.forEach(user => {
        var obj = { userData: user.data(), userId: user.id };

        if (this.currentUserId === user.data().uId) {
          currentObj = obj;
        } else {
          userArray.push(obj);
        }
        if (this.currentUserId === user.data().uId) {
          this.props.handleClickedUser(obj);
        }
      });

      userArray.unshift(currentObj);

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
