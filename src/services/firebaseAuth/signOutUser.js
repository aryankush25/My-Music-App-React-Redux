import firebase from "firebase/app";
import "firebase/auth";

const signOutUser = () => {
  return firebase.auth().signOut();
};

export default signOutUser;
