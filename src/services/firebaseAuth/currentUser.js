import firebase from "firebase/app";
import "firebase/auth";

const currentUser = () => {
  // return new Promise((resolve, reject) => {
  //   resolve()
  // })
  return firebase.auth().currentUser;
};

export default currentUser;
