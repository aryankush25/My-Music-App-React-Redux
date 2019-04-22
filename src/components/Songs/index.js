import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "./style.scss";

const SongCard = props => {
  const songsdiv = props.songsArray.map((song, index) => {
    return (
      <div
        className="card song-div"
        key={index}
        onClick={() => props.handleSongClick(index)}
      >
        <div className="song-logo">
          {song.name ? song.name.trim().charAt(0) : "?"}
        </div>
        <div className="card-body">
          <p className="card-text">
            {song.name ? song.name.trim() : "NO NAME"}
          </p>
        </div>
      </div>
    );
  });

  const handleOnChange = async event => {
    const selectedFile = event.target.files[0];

    var filePresent = false;

    await firebase
      .firestore()
      .collection("defaultPlaylist")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (doc.data().name === selectedFile.name) {
            console.log(doc.data());
            filePresent = true;
          }
        });
      });

    if (filePresent === false) {
      const uploadTask = firebase
        .storage()
        .ref()
        .child(`Default Music/${selectedFile.name}`)
        .put(selectedFile);

      uploadTask.on(
        "state_changed",
        () => {
          props.handleLoadingStateChange(true);
        },
        error => {
          props.handleLoadingStateChange(false);
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(url => {
            console.log(url);

            firebase
              .firestore()
              .collection("defaultPlaylist")
              .add({
                name: selectedFile.name,
                url: url
              })
              .then(function() {
                props.handleLoadingStateChange(false);
                console.log("Document successfully written!");
              })
              .catch(function(error) {
                console.error("Error writing document: ", error);
              });
          });
        }
      );
    }
  };

  return (
    <div className="songs-div">
      <div className="row songs-div">{songsdiv}</div>
      <div className="filesubmit row">
        <input
          type="file"
          className="file-select btn btn-md btn-info"
          accept="audio/*"
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
};

class Songs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      songsArray: []
    };
  }
  songsTempArray = [];
  songsTempArrayUrl = [];

  handleLoadingStateChange = isLoading => {
    this.setState({
      isLoading: isLoading
    });
  };

  componentDidMount() {
    this.playistList();
    // firebase
    //   .firestore()
    //   .collection("defaultPlaylist")
    //   .snapshot(() => {
    //     this.playistList();
    //   });
  }

  playistList = async () => {
    try {
      var docRef = await firebase.firestore().collection("defaultPlaylist");

      var querySnapshot = await docRef.get();
      querySnapshot.forEach(doc => {
        this.songsTempArray.push(doc.data());
        this.songsTempArrayUrl.push(doc.data().url);
      });

      this.setState({
        isLoading: false,
        songsArray: this.songsTempArray
      });

      this.props.handleArrayUpdate(this.songsTempArray, this.songsTempArrayUrl);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    if (this.state.isLoading === true) {
      return (
        <div className="d-flex justify-content-center loader-songs ">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }

    return (
      <SongCard
        songsArray={this.state.songsArray}
        handleSongClick={this.props.handleSongClick}
        handleLoadingStateChange={this.handleLoadingStateChange}
      />
    );
  }
}

export default Songs;
