import React from "react";
import "./style.scss";
import StarRatings from "react-star-ratings";
import LikeButton from "./LikeButton";

class OverlaySongInfo extends React.Component {
  render() {
    return (
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
    );
  }
}

export default OverlaySongInfo;
