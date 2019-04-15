import React from "react";
import { Howl, Howler } from "howler";
import HomePageDashboard from "../../components/HomePageDashboard";
import MusicSeekBar from "../../components/MusicBarComponents/MusicSeekBar";
import MusicVolumeBar from "../../components/MusicBarComponents/MusicVolumeBar";
import MusicBarButtons from "../../components/MusicBarComponents/MusicBarButtons";
import "./style.scss";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      currentDuration: 0
    };
  }

  arr = [
    "https://firebasestorage.googleapis.com/v0/b/react-mini-project-music-app.appspot.com/o/Default%20Music%2FFirst%20Class%20-%20Kalank.mp3?alt=media&token=1dd066b3-381f-4598-bce0-ffddba7fdc25",
    "https://firebasestorage.googleapis.com/v0/b/react-mini-project-music-app.appspot.com/o/Default%20Music%2FBulleya%20-%20RAW.mp3?alt=media&token=29476bb5-23b6-4d74-925e-eac3dccb3ea3"
  ];
  intervalID = 0;

  sound = new Howl({
    src: [this.arr[0]],
    html5: true
  });

  handlePlayPauseAudio = () => {
    if (this.state.playing === true) {
      this.sound.pause();
      clearInterval(this.intervalID);
    } else {
      this.sound.play();
      this.intervalID = setInterval(() => {
        this.setState({
          currentDuration: this.state.currentDuration + 1
        });
      }, 1000);
    }
    this.setState({
      playing: !this.state.playing
    });
  };

  handlePlayNext = () => {
    this.sound.stop();
    this.sound = new Howl({
      src: [this.arr[1]],
      html5: true
    });

    this.handlePlayPauseAudio();
  };

  handlePlayPrevious = () => {
    this.sound.stop();
    this.sound = new Howl({
      src: [this.arr[0]],
      html5: true
    });
    this.handlePlayPauseAudio();
  };

  handleAdjustSeek = value => {
    this.sound.seek(value);
    this.setState({
      currentDuration: value
    });
  };

  handleAdjustAudio = value => {
    Howler.volume(value / 10);
  };

  render() {
    return (
      <div className="home-page-div">
        <HomePageDashboard sound={this.sound} />

        {/* Music Bar Div That Contains the music bar elements */}

        <div className="music-bar">
          <MusicBarButtons
            isPlaying={this.state.playing}
            playPrevious={this.handlePlayPrevious}
            playPauseAudio={this.handlePlayPauseAudio}
            playNext={this.handlePlayNext}
          />
          <MusicSeekBar
            duration={this.sound._duration}
            currentDuration={this.state.currentDuration}
            adjustSeek={this.handleAdjustSeek}
          />
          <MusicVolumeBar
            volume={Howler._volume}
            adjustAudio={this.handleAdjustAudio}
          />
        </div>
      </div>
    );
  }
}

export default Home;
