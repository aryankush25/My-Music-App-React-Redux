import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faForward,
  faBackward,
  faPlay,
  faPause
} from "@fortawesome/free-solid-svg-icons";
import "./style.scss";

const IconComponent = props => {
  if (props.isPlaying) {
    return <FontAwesomeIcon icon={faPause} />;
  }
  return <FontAwesomeIcon icon={faPlay} />;
};

class MusicBarButtons extends React.Component {
  render() {
    return (
      <div className="buttonsDiv">
        <div className="previousSong">
          <span
            className="btn btn-info btn-lg"
            onClick={() => {
              this.props.playPrevious();
            }}
          >
            <FontAwesomeIcon icon={faBackward} />
          </span>
        </div>
        <div className="playPauseSong">
          <span
            className="btn btn-info btn-lg"
            onClick={() => this.props.playPauseAudio()}
          >
            <IconComponent isPlaying={this.props.isPlaying} />
          </span>
        </div>
        <div className="nextSong">
          <span
            className="btn btn-info btn-lg"
            onClick={() => {
              this.props.playNext();
            }}
          >
            <FontAwesomeIcon icon={faForward} />
          </span>
        </div>
      </div>
    );
  }
}

export default MusicBarButtons;
