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
        style={{ width: "10rem" }}
        onClick={() => console.log(index)}
      >
        <div className="song-logo">{song.name.trim().charAt(0)}</div>
        <div className="card-body">
          <p className="card-text">{song.name.trim()}</p>
        </div>
      </div>
    );
  });
  return <div className="row songs-div">{songsdiv}</div>;
};

class Songs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      songsArray: []
    };
  }

  componentDidMount() {
    this.playistList();
  }

  playistList = async () => {
    try {
      var docRef = await firebase.firestore().collection("defaultPlaylist");
      var songsTempArray = [];
      await docRef.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          songsTempArray.push(doc.data());
        });
      });

      this.setState({
        isLoading: false,
        songsArray: songsTempArray
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    if (this.state.isLoading === true) {
      return (
        <div class="d-flex justify-content-center loader-songs ">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      );
    }

    return <SongCard songsArray={this.state.songsArray} />;
  }
}

export default Songs;
