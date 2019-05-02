import React from "react";
import "./style.scss";
import ShowLoadingComponent from "../ShowLoadingComponent";
import fetchUsersCollections from "../../services/firebaseFirestore/fetchUsersCollections";
import currentUser from "../../services/firebaseAuth/currentUser";
import { connect } from "react-redux";
import {
  setUsersAction,
  setCurrentUsersNumberAction,
  setUsersIsLoadingAction
} from "../../redux/actions/actionUsers";

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
        if (this.props.userNumber === i) {
          this.props.handleClickedUser(user);
        }
        i++;
      });

      this.props.setUsersAction(userArray);
      this.props.setUsersIsLoadingAction(false);
    });
  };

  render() {
    return (
      <ShowLoadingComponent isLoading={this.props.isLoading}>
        <div className="small-div-left">
          <UsersData
            userArray={this.props.userArray}
            currentUserId={this.currentUserId}
            setUserNumber={this.props.setCurrentUsersNumberAction}
            handleClickedUser={this.props.handleClickedUser}
          />
        </div>
      </ShowLoadingComponent>
    );
  }
}

const mapStateToProps = state => {
  const { userArray, userNumber, isLoading } = state.users;

  return { userArray, userNumber, isLoading };
};

const mapDispatchToProps = dispatch => {
  return {
    setUsersAction: userArray => dispatch(setUsersAction(userArray)),
    setCurrentUsersNumberAction: userNumber =>
      dispatch(setCurrentUsersNumberAction(userNumber)),
    setUsersIsLoadingAction: isLoading =>
      dispatch(setUsersIsLoadingAction(isLoading))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
