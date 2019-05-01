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
    this.props.setUserNumber(index);
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
      userArray: [],
      userNumber: 0
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
      });

      userArray.unshift(currentObj);

      var i = 0;
      userArray.forEach(user => {
        if (this.state.userNumber === i) {
          this.props.handleClickedUser(user);
          console.log(this.state.userNumber);
          console.log("Fetch Users");
        }
        i++;
      });

      this.setState({
        isLoading: false,
        userArray: userArray
      });
    });
  };

  setUserNumber = userNumber => {
    this.setState({
      userNumber: userNumber
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
            setUserNumber={this.setUserNumber}
          />
        </div>
      </ShowLoadingComponent>
    );
  }
}

export default Users;
