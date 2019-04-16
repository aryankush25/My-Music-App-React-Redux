import firebase from "firebase/app";
import "firebase/auth";

const signInUser = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export default signInUser;
