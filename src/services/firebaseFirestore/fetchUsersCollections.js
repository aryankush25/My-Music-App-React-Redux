import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const fetchUsersOnSnapshot = async () => {
  return firebase.firestore().collection("users");
};

export default fetchUsersOnSnapshot;
