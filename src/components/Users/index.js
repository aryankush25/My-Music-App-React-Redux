import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "./style.scss";

const UsersData = props => {
  const userDiv = props.userArray.map((user, index) => {
    if (firebase.auth().currentUser.uid === user.userData.uId) {
      return (
        <div
          to="#"
          key={index}
          style={{ backgroundColor: "#77c4d3" }}
          onClick={() => {
            props.handleClickedUser(user);
          }}
        >
          <div className="user-element"> {user.userData.userName} </div>
        </div>
      );
    }
    return (
      <div
        to="#"
        key={index}
        onClick={() => {
          props.handleClickedUser(user);
        }}
      >
        <div className="user-element"> {user.userData.userName} </div>
      </div>
    );
  });

  return <div>{userDiv}</div>;
};

class Playlists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      usersArray: []
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = () => {
    var userArray = [];
    firebase
      .firestore()
      .collection("users")
      .get()
      .then(querySnapshot => {
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
    if (this.state.isLoading === true) {
      return (
        <div className="d-flex justify-content-center loader-songs ">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }

    return (
      <div className="small-div-right">
        <UsersData
          userArray={this.state.userArray}
          handleClickedUser={this.props.handleClickedUser}
        />
      </div>
    );
  }
}

export default Playlists;
