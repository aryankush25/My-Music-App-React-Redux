import React from "react";
import UploadSong from "./UploadSong";
import EditButton from "./EditButton";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "./style.scss";
import updatePlaylist from "../../services/firebaseFirestore/updatePlaylist";
import currentUser from "../../services/firebaseAuth/currentUser";
import StarRatings from "react-star-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

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

class LikeButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      songLiked: this.props.isSongLiked,
      likesCount: this.props.likesCount
    };
  }

  componentDidMount() {
    this.isSongLiked();
  }

  isSongLiked = async () => {
    var currUser = await currentUser().uid;

    for (var i = 0; i < this.props.likesCount; i++) {
      if (this.props.likedByArray[i] === currUser) {
        this.setState({
          songLiked: true
        });
        break;
      } else {
        this.setState({
          songLiked: false
        });
      }
    }
  };

  componentWillReceiveProps(nextprops) {
    this.isSongLiked();
    this.setState({
      songLiked: nextprops.isSongLiked,
      likesCount: nextprops.likesCount
    });
  }

  toggleLike = index => {
    if (this.state.songLiked === true) {
      this.props.handleSongUnLike(index);
      this.setState({
        songLiked: false,
        likesCount: this.state.likesCount - 1
      });
    } else {
      this.props.handleSongLike(index);
      this.setState({
        songLiked: true,
        likesCount: this.state.likesCount + 1
      });
    }
  };

  render() {
    return (
      <span>
        <FontAwesomeIcon
          icon={faHeart}
          className={this.state.songLiked ? "addColor" : ""}
          onClick={() => this.toggleLike(this.props.index)}
        />{" "}
        {this.state.likesCount}
      </span>
    );
  }
}

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
              <p> {song.genre} </p>
              <div className="rating-like-buttons">
                <StarRatings
                  rating={song.ratings}
                  starRatedColor="blue"
                  numberOfStars={5}
                  name="rating"
                  starDimension="20px"
                  starSpacing="5px"
                />
                <LikeButton
                  index={index}
                  likesCount={song.likedBy.length}
                  likedByArray={song.likedBy}
                  isSongLiked={false}
                  handleSongLike={this.props.handleSongLike}
                  handleSongUnLike={this.props.handleSongUnLike}
                />
              </div>
            </div>
            <div className="test-class song-buttons">
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
  // componentDidMount() {
  //   var songsTempArrayUrl = [];
  //   this.props.songsArray.forEach(doc => {
  //     songsTempArrayUrl.push(doc.url);
  //   });
  //   this.props.handleArrayUpdate(this.props.songsArray, songsTempArrayUrl);
  // }

  // shouldComponentUpdate(nextprops) {
  //   if (nextprops.songsArray !== this.props.songsArray) {
  //     var songsTempArrayUrl = [];
  //     nextprops.songsArray.forEach(doc => {
  //       songsTempArrayUrl.push(doc.url);
  //     });
  //     nextprops.handleArrayUpdate(nextprops.songsArray, songsTempArrayUrl);
  //     return true;
  //   }
  //   return false;
  // }

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

    this.props.handleLoadingStateChange(true);

    try {
      await updatePlaylist(this.props.userId, newPlaylistObject);
      console.log("Document successfully written!");
    } catch (error) {
      console.error("Error writing document: ", error);
    }

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

    this.props.handleLoadingStateChange(true);

    try {
      await updatePlaylist(this.props.userId, newPlaylistObject);
      console.log("Document successfully written!");
    } catch (error) {
      console.error("Error writing document: ", error);
    }

    this.props.handleLoadingStateChange(false);
  };

  handleSongLike = async index => {
    var playlistObject = this.props.userObject.userData.playlists[
      this.props.index
    ].playlist;

    var likeUsersArray = this.props.userObject.userData.playlists[
      this.props.index
    ].playlist[index].likedBy;

    this.props.handleLoadingStateChange(true);

    var currUser = await currentUser().uid;

    likeUsersArray.push(currUser);

    var newPlaylistObject = this.props.userObject.userData.playlists;
    newPlaylistObject[this.props.index].playlist = playlistObject;

    console.log(newPlaylistObject);
    try {
      await updatePlaylist(this.props.userId, newPlaylistObject);
      console.log("Document successfully written!");
    } catch (error) {
      console.error("Error writing document: ", error);
    }

    this.props.handleLoadingStateChange(false);
  };

  handleSongUnLike = async index => {
    var playlistObject = this.props.userObject.userData.playlists[
      this.props.index
    ].playlist;

    var likeUsersArray = this.props.userObject.userData.playlists[
      this.props.index
    ].playlist[index].likedBy;

    this.props.handleLoadingStateChange(true);

    var currUser = await currentUser().uid;
    var tempArr = [];
    likeUsersArray.forEach(user => {
      if (currUser !== user) {
        tempArr.push(user);
      }
    });

    playlistObject[index].likedBy = tempArr;

    var newPlaylistObject = this.props.userObject.userData.playlists;
    newPlaylistObject[this.props.index].playlist = playlistObject;

    console.log(newPlaylistObject);
    try {
      await updatePlaylist(this.props.userId, newPlaylistObject);
      console.log("Document successfully written!");
    } catch (error) {
      console.error("Error writing document: ", error);
    }

    this.props.handleLoadingStateChange(false);
  };

  render() {
    console.log(this.props);
    return (
      <div className="middle-songs-container">
        {/* <div className="songs-header-row">
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
        </div> */}
        <div className="row songs-div">
          <SingleSongCard
            songsArray={this.props.songsArray}
            userObject={this.props.userObject}
            handleSongClick={this.props.handleSongClick}
            handleSongDelete={this.handleSongDelete}
            handleSongEdit={this.handleSongEdit}
            handleSongLike={this.handleSongLike}
            handleSongUnLike={this.handleSongUnLike}
          />
        </div>
      </div>
    );
  }
}

export default SongsCard;
