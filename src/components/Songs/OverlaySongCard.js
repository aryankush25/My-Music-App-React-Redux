import React from "react";
import EditButton from "./EditButton";
import "./style.scss";
import currentUser from "../../services/firebaseAuth/currentUser";
import StarRatings from "react-star-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { setSongAndPlayFromSongCardAction } from "../../redux/actions/actionSongs";

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

class OverlaySongCard extends React.Component {
  render() {
    return (
      <div className="overlay">
        <div className="song-info-div">
          <h6> {this.props.song.name} </h6>
          <p> {this.props.song.genre} </p>
          <div className="rating-like-buttons">
            <StarRatings
              rating={this.props.song.ratings}
              starRatedColor="blue"
              numberOfStars={5}
              name="rating"
              starDimension="20px"
              starSpacing="5px"
            />
            <LikeButton
              index={this.props.index}
              likesCount={this.props.song.likedBy.length}
              likedByArray={this.props.song.likedBy}
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
              this.props.setSongAndPlayFromSongCardAction(this.props.index);
            }}
          >
            Play
          </button>
          <DeleteButton
            showDisableBtn={
              this.props.userObject.userData.uId !== this.props.currentUserId
            }
            handleSongDelete={() =>
              this.props.handleSongDelete(this.props.index)
            }
          />
          <EditButton
            showDisableBtn={
              this.props.userObject.userData.uId !== this.props.currentUserId
            }
            songImage={this.props.song.imageUrl}
            songName={this.props.song.name}
            songGenre={this.props.song.genre}
            songRating={this.props.song.ratings}
            index={this.props.index}
            handleSongEdit={this.props.handleSongEdit}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const userObject = state.users.userArray[state.users.userNumber];
  const currentUserId = state.app.appCurrentUser;
  return { userObject, currentUserId };
};

const mapDispatchToProps = dispatch => {
  return {
    setSongAndPlayFromSongCardAction: songNumber =>
      dispatch(setSongAndPlayFromSongCardAction(songNumber))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OverlaySongCard);
