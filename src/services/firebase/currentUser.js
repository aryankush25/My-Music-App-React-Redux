import firebase from "firebase/app";
import "firebase/auth";

const currentUser = () => {
  return firebase.auth().currentUser;
};

export default currentUser;
