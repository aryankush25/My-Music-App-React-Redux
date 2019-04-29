import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const updatePlaylists = async (userId, playlists) => {
  return firebase
    .firestore()
    .collection("users")
    .doc(userId)
    .update({
      playlists: playlists
    });
};

export default updatePlaylists;
