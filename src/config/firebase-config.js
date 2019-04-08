import firebase from "firebase";

var config = {
  apiKey: "AIzaSyCt9gbRk3r0d7fLBFAcgOVNgGFwayc2wug",
  authDomain: "react-mini-project-music-app.firebaseapp.com",
  databaseURL: "https://react-mini-project-music-app.firebaseio.com",
  projectId: "react-mini-project-music-app",
  storageBucket: "react-mini-project-music-app.appspot.com",
  messagingSenderId: "217762414151"
};
firebase.initializeApp(config);

export default config;
