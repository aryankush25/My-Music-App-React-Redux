import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "./style.scss";
import ShowLoadingComponent from "../ShowLoadingComponent";

const UserDiv = props => {
  return (
    <div
      key={props.index}
      style={{ backgroundColor: props.bgColor }}
      onClick={props.handleClickedUser}
    >
      <div className="user-element"> {props.userName} </div>
    </div>
  );
};

const UsersData = props => {
  return props.userArray.map((user, index) => {
    if (firebase.auth().currentUser.uid === user.userData.uId) {
      return (
        <UserDiv
          index={index}
          handleClickedUser={() => props.handleClickedUser(user)}
          userName={user.userData.userName}
          bgColor={"#77c4d3"}
        />
      );
    }
    return (
      <UserDiv
        index={index}
        handleClickedUser={() => props.handleClickedUser(user)}
        userName={user.userData.userName}
        bgColor={""}
      />
    );
  });
};

class Playlists extends React.Component {
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
        <div className="small-div-right">
          <UsersData
            userArray={this.state.userArray}
            handleClickedUser={this.props.handleClickedUser}
          />
        </div>
      </ShowLoadingComponent>
    );
  }
}

export default Playlists;
