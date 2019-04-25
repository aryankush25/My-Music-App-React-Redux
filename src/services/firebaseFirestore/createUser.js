import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const createUser = async (uId, userName) => {
  return firebase
    .firestore()
    .collection("users")
    .add({
      uId: uId,
      userName: userName,
      playlists: [
        {
          playlistName: "Default Playlist",
          playlist: [
            {
              name: "Vande Mataram - RAW.mp3",
              url:
                "https://firebasestorage.googleapis.com/v0/b/react-mini-project-music-app.appspot.com/o/Default%20Music%2FVande%20Mataram%20-%20RAW.mp3?alt=media&token=558cc09a-b6e6-41ae-8a8f-fa1dc92631fa"
            },
            {
              name: "Sher Aaya Sher - Gully Boy.mp3",
              url:
                "https://firebasestorage.googleapis.com/v0/b/react-mini-project-music-app.appspot.com/o/Default%20Music%2FSher%20Aaya%20Sher%20-%20Gully%20Boy.mp3?alt=media&token=39008662-3796-48b4-9e74-052908e4040a"
            },
            {
              name: "NY Se Mumbai - Ranveer Singh.mp3",
              url:
                "https://firebasestorage.googleapis.com/v0/b/react-mini-project-music-app.appspot.com/o/Default%20Music%2FNY%20Se%20Mumbai%20-%20Ranveer%20Singh.mp3?alt=media&token=1bb8a3aa-2c29-4bdc-bff5-ad72274b592b"
            },
            {
              name: "Kab Se Kab Tak - Gully Boy.mp3",
              url:
                "https://firebasestorage.googleapis.com/v0/b/react-mini-project-music-app.appspot.com/o/Default%20Music%2FKab%20Se%20Kab%20Tak%20-%20Gully%20Boy.mp3?alt=media&token=3917f130-1ba5-4592-8c6c-a59461ce7ea7"
            },
            {
              name: "Kaam Bhaari - Gully Boy.mp3",
              url:
                "https://firebasestorage.googleapis.com/v0/b/react-mini-project-music-app.appspot.com/o/Default%20Music%2FKaam%20Bhaari%20-%20Gully%20Boy.mp3?alt=media&token=0c16092c-c9e1-46aa-9d0b-8b488aa866df"
            },
            {
              name: "First Class - Kalank.mp3",
              url:
                "https://firebasestorage.googleapis.com/v0/b/react-mini-project-music-app.appspot.com/o/Default%20Music%2FFirst%20Class%20-%20Kalank.mp3?alt=media&token=1dd066b3-381f-4598-bce0-ffddba7fdc25"
            },
            {
              name: "Bulleya - RAW.mp3",
              url:
                "https://firebasestorage.googleapis.com/v0/b/react-mini-project-music-app.appspot.com/o/Default%20Music%2FBulleya%20-%20RAW.mp3?alt=media&token=29476bb5-23b6-4d74-925e-eac3dccb3ea3"
            }
          ]
        }
      ]
    });
};

export default createUser;
