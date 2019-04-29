import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const updateUser = async (userId, name) => {
  return firebase
    .firestore()
    .collection("users")
    .doc(userId)
    .update({
      userName: name
    });
};

export default updateUser;
