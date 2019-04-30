import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const fetchUsers = async () => {
  return firebase
    .firestore()
    .collection("users")
    .get();
};

export default fetchUsers;
