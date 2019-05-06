import React from "react";
import EditButton from "./EditButton";
import "./style.scss";
import StarRatings from "react-star-ratings";
import { connect } from "react-redux";
import { setSongAndPlayFromSongCardAction } from "../../redux/actions/actionSongs";
import LikeButton from "./LikeButton";

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
