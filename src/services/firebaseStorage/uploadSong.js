import firebase from "firebase/app";
import "firebase/storage";

const uploadSong = selectedFile => {
  return firebase
    .storage()
    .ref()
    .child(`Music/${selectedFile.name}`)
    .put(selectedFile);
};

export default uploadSong;
