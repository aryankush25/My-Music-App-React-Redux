import React from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const UsersData = props => {
  const userDiv = props.userArray.map((user, index) => {
    if (firebase.auth().currentUser.uid === user.uId) {
      return (
        <Link to="#" key={index} onClick={() => {}}>
          <div className="playlist-element"> {user.userName} </div>
        </Link>
      );
    }
    return (
      <Link to="#" key={index} onClick={() => {}}>
        <div className="playlist-element"> {user.userName} </div>
      </Link>
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
          userArray.push(user.data());
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
        <UsersData userArray={this.state.userArray} />
      </div>
    );
  }
}

export default Playlists;
