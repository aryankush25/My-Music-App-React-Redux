import firebase from "firebase/app";
import "firebase/storage";

const uploadImage = selectedFile => {
  return firebase
    .storage()
    .ref()
    .child(`UserImages/${selectedFile.name}`)
    .put(selectedFile);
};

export default uploadImage;
