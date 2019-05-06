import React from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

class LikeButton extends React.Component {
  toggleLike = index => {
    if (this.props.isSongLiked === true) {
      this.props.handleSongUnLike(index);
    } else {
      this.props.handleSongLike(index);
    }
  };

  render() {
    return (
      <span>
        <FontAwesomeIcon
          icon={faHeart}
          className={this.props.isSongLiked ? "addColor" : ""}
          onClick={() => this.toggleLike(this.props.index)}
        />{" "}
        {this.props.likesCount}
      </span>
    );
  }
}

const mapStateToProps = (state, props) => {
  const currentUserId = state.app.appCurrentUser;

  var isSongLiked = false;

  for (var i = 0; i < props.likesCount; i++) {
    if (props.likedByArray[i] === currentUserId) {
      isSongLiked = true;
    }
  }

  const { songArray: songsArray, songNumber } = state.song;

  return { songsArray, songNumber, isSongLiked };
};

export default connect(mapStateToProps)(LikeButton);
