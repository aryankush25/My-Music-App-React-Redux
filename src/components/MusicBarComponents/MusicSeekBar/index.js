import React from "react";
import "./style.scss";

class MusicSeekBar extends React.Component {
  handleOnClick = e => {
    const percent =
      (e.clientX - e.currentTarget.offsetLeft) / e.currentTarget.offsetWidth;
    var temp = Math.round(percent * this.props.duration);
    this.props.adjustSeek(temp);
  };

  render() {
    return (
      <div className="slider-container-seek">
        <div className="main-music-bar-box">
          <p>{this.props.currentDuration} </p>
          <div className="music-bar-box" onClick={this.handleOnClick}>
            <div
              className="increasing-bar-box"
              style={{
                width:
                  (this.props.currentDuration * 100) / this.props.duration + "%"
              }}
            />
          </div>
          <p> {this.props.duration}</p>
        </div>
      </div>
    );
  }
}

export default MusicSeekBar;
