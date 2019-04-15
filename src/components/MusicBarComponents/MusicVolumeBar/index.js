import React from "react";
import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";

class MusicVolumeBar extends React.Component {
  render() {
    return (
      <div className="slidecontainervolume">
        <FontAwesomeIcon icon={faVolumeUp} />

        <input
          type="range"
          min="0"
          max="10"
          defaultValue={this.props.Howler._volume * 10}
          onChange={event => {
            this.props.adjustAudio(event.target.value);
          }}
          className="slidervolume"
          id="myRange"
        />
      </div>
    );
  }
}

export default MusicVolumeBar;
