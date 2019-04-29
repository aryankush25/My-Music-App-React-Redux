import React from "react";
import UploadSong from "./UploadSong";
import EditButton from "./EditButton";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "./style.scss";
import StarRatings from "react-star-ratings";

const DeleteButton = props => {
  if (props.showDisableBtn) {
    return null;
  }
  return (
    <button className="btn btn-md btn-danger" onClick={props.handleSongDelete}>
      Delete
    </button>
  );
};

const SongImage = props => {
  if (props.songImage === "") {
    return (
      <div className="song-logo">
        {props.songName ? props.songName.trim().charAt(0) : "?"}
      </div>
    );
  }
  return (
    <div className="song-logo">
      <img src={props.songImage} alt="Song-Img" />
    </div>
  );
};

class SingleSongCard extends React.Component {
  render() {
    return this.props.songsArray.map((song, index) => {
      return (
        <div className="card song-div" key={index}>
          <SongImage songImage={song.imageUrl} songName={song.name} />
          <div className="card-body song-card-body">
            <p className="card-text">
              {song.name ? song.name.trim() : "NO NAME"}
            </p>
          </div>
          <div className="overlay">
            <div className="song-info-div">
              <h6> {song.name} </h6>

              {/* <br /> */}
              <p> {song.genre} </p>
              <div>
                <StarRatings
                  rating={song.ratings}
                  starRatedColor="blue"
                  numberOfStars={5}
                  name="rating"
                  starDimension="20px"
                  starSpacing="5px"
                />
              </div>
            </div>
            <div className="song-buttons">
              <button
                className="btn btn-md btn-info"
                onClick={() => {
                  this.props.handleSongClick(index);
                }}
              >
                Play
              </button>
              <DeleteButton
                showDisableBtn={
                  this.props.userObject.userData.uId !==
                  firebase.auth().currentUser.uid
                }
                handleSongDelete={() => this.props.handleSongDelete(index)}
              />
              <EditButton
                showDisableBtn={
                  this.props.userObject.userData.uId !==
                  firebase.auth().currentUser.uid
                }
                songImage={song.imageUrl}
                songName={song.name}
                songGenre={song.genre}
                songRating={song.ratings}
                index={index}
                handleSongEdit={this.props.handleSongEdit}
              />
            </div>
          </div>
        </div>
      );
    });
  }
}

class SongsCard extends React.Component {
  componentDidMount() {
    var songsTempArrayUrl = [];
    this.props.songsArray.forEach(doc => {
      songsTempArrayUrl.push(doc.url);
    });
    this.props.handleArrayUpdate(this.props.songsArray, songsTempArrayUrl);
  }

  shouldComponentUpdate(nextprops) {
    if (nextprops.songsArray !== this.props.songsArray) {
      var songsTempArrayUrl = [];
      nextprops.songsArray.forEach(doc => {
        songsTempArrayUrl.push(doc.url);
      });
      nextprops.handleArrayUpdate(nextprops.songsArray, songsTempArrayUrl);
      return true;
    }
    return false;
  }

  handleSongDelete = async index => {
    var playlistObject = this.props.userObject.userData.playlists[
      this.props.index
    ].playlist;
    var newSongs = [];

    for (var i = 0; i < playlistObject.length; i++) {
      if (i !== index) {
        newSongs.push(playlistObject[i]);
      }
    }

    var newPlaylistObject = this.props.userObject.userData.playlists;
    newPlaylistObject[this.props.index].playlist = newSongs;

    await firebase
      .firestore()
      .collection("users")
      .doc(this.props.userId)
      .update({
        playlists: newPlaylistObject
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch(error => {
        console.error("Error writing document: ", error);
      });
    this.props.handleLoadingStateChange(false);
  };

  handleSongEdit = async (index, name, imageUrl, genre, ratings) => {
    var playlistObject = this.props.userObject.userData.playlists[
      this.props.index
    ].playlist;

    if (genre !== "") playlistObject[index].genre = genre;

    if (name !== "") playlistObject[index].name = name;

    if (imageUrl !== "") playlistObject[index].imageUrl = imageUrl;

    if (ratings !== "") playlistObject[index].ratings = ratings;

    var newPlaylistObject = this.props.userObject.userData.playlists;
    newPlaylistObject[this.props.index].playlist = playlistObject;

    await firebase
      .firestore()
      .collection("users")
      .doc(this.props.userId)
      .update({
        playlists: newPlaylistObject
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch(error => {
        console.error("Error writing document: ", error);
      });
    this.props.handleLoadingStateChange(false);
  };

  render() {
    return (
      <div className="middle-songs-container">
        <div className="songs-header-row">
          <div className="current-address">
            <p>
              {this.props.userObject.userData.userName} >{" "}
              {
                this.props.userObject.userData.playlists[this.props.index]
                  .playlistName
              }
            </p>
          </div>
          <UploadSong
            userObject={this.props.userObject}
            songsArray={this.props.songsArray}
            index={this.props.index}
            userId={this.props.userId}
            showDisableBtn={
              this.props.userObject.userData.uId !==
              firebase.auth().currentUser.uid
            }
            handleLoadingStateChange={this.props.handleLoadingStateChange}
          />
        </div>
        <div className="row songs-div">
          <SingleSongCard
            songsArray={this.props.songsArray}
            userObject={this.props.userObject}
            handleSongClick={this.props.handleSongClick}
            handleSongDelete={this.handleSongDelete}
            handleSongEdit={this.handleSongEdit}
          />
        </div>
      </div>
    );
  }
}

export default SongsCard;
