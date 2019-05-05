import React from "react";
import EditButton from "./EditButton";
import "./style.scss";
import currentUser from "../../services/firebaseAuth/currentUser";
import StarRatings from "react-star-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { setCurrentSongNumberAction } from "../../redux/actions/actionSongs";

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

class SongCard extends React.Component {
  render() {
    return this.props.songsArray.map((song, index) => {
      return (
        <div
          className={
            "card song-div " +
            (this.props.songNumber === index ? "selected-song" : "")
          }
          key={index}
        >
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
                  this.props.setCurrentSongNumberAction(index);
                }}
              >
                Play
              </button>
              <DeleteButton
                showDisableBtn={
                  this.props.userObject.userData.uId !==
                  this.props.currentUserId
                }
                handleSongDelete={() => this.props.handleSongDelete(index)}
              />
              <EditButton
                showDisableBtn={
                  this.props.userObject.userData.uId !==
                  this.props.currentUserId
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

const mapStateToProps = state => {
  const { songArray: songsArray, songNumber } = state.song;
  const userObject = state.users.userArray[state.users.userNumber];
  const currentUserId = state.app.appCurrentUser;
  return { userObject, songsArray, currentUserId, songNumber };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentSongNumberAction: songNumber =>
      dispatch(setCurrentSongNumberAction(songNumber))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SongCard);
