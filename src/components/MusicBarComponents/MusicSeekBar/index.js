import React from "react";
import "./style.scss";

class MusicSeekBar extends React.Component {
  handleOnClick = e => {
    const percent =
      (e.clientX - e.currentTarget.offsetLeft) / e.currentTarget.offsetWidth;
    console.log("onMouseMove", Math.round(percent * this.props.duration));
    var temp = Math.round(percent * this.props.duration);
    this.props.adjustSeek(temp);
  };

  render() {
    console.log(this.props.currentDuration);

    return (
      <div className="slidecontainerseek">
        <div className="mainMusicBarBox">
          <p>{this.props.currentDuration} </p>
          <div className="musicBarBox" onClick={this.handleOnClick}>
            <div
              className="increasingBarBox"
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
