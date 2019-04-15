import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faForward,
  faBackward,
  faPlay,
  faPause
} from "@fortawesome/free-solid-svg-icons";
import "./index.scss";

class MusicBarButtons extends React.Component {
  playPauseButton() {
    if (this.props.isPlaying === false) {
      return <FontAwesomeIcon icon={faPlay} />;
    } else {
      return <FontAwesomeIcon icon={faPause} />;
    }
  }

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
            {this.playPauseButton()}
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
