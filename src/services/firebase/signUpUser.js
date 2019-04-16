import firebase from "firebase/app";
import "firebase/auth";

const signUpUser = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};

export default signUpUser;
