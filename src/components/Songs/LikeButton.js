import React from "react";
import "./style.scss";
import currentUser from "../../services/firebaseAuth/currentUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

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

export default LikeButton;
