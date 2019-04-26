import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "./style.scss";
import ShowLoadingComponent from "../ShowLoadingComponent";

const UsersData = props => {
  return props.userArray.map((user, index) => {
    if (firebase.auth().currentUser.uid === user.userData.uId) {
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

  fetchUsers = () => {
    firebase
      .firestore()
      .collection("users")
      .onSnapshot(querySnapshot => {
        var userArray = [];
        querySnapshot.forEach(user => {
          var obj = { userData: user.data(), userId: user.id };
          userArray.push(obj);
          if (firebase.auth().currentUser.uid === user.data().uId) {
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
            handleClickedUser={this.props.handleClickedUser}
          />
        </div>
      </ShowLoadingComponent>
    );
  }
}

export default Users;
