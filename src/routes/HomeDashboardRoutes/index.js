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
      isPlaying: false,
      currentDuration: 0,
      currentIndex: 0,
      songsUrlArray: []
    };
  }

  sound = {};
  intervalID = 0;

  handleArrayUpdate = (songsArrayUpdated, songsUrlArray) => {
    this.setState({
      songsUrlArray: songsUrlArray
    });
    this.sound = new Howl({
      src: [songsUrlArray[this.state.currentIndex]],
      html5: true
    });
  };

  handleStop = () => {
    this.sound.stop();
    clearInterval(this.intervalID);
    this.setState({
      isPlaying: false,
      currentDuration: 0
    });
  };

  handleSongClick = index => {
    if (this.state.isPlaying === true) this.handleStop();
    this.setState({
      currentIndex: index
    });
    this.sound = new Howl({
      src: [this.state.songsUrlArray[index]],
      html5: true
    });
    this.handlePlayAudio();
  };

  handlePlayAudio = () => {
    this.intervalID = setInterval(() => {
      if (Math.round(this.sound._duration) === this.state.currentDuration) {
        this.handleStop();
        this.handlePlayNext();
      } else {
        this.setState({
          currentDuration: this.state.currentDuration + 1
        });
      }
    }, 1000);
    this.sound.play();
    this.setState({
      isPlaying: true
    });
  };

  handlePauseAudio = () => {
    this.sound.pause();
    clearInterval(this.intervalID);
    this.setState({
      isPlaying: false
    });
  };

  handlePlayPauseAudio = () => {
    if (this.state.isPlaying === true) {
      this.handlePauseAudio();
    } else {
      this.handlePlayAudio();
    }
  };

  handlePlayNext = () => {
    this.handleStop();
    var currentIndex = 0;
    if (this.state.songsUrlArray.length - 1 > this.state.currentIndex) {
      currentIndex = this.state.currentIndex + 1;
    } else {
      currentIndex = 0;
    }
    this.setState({
      currentIndex: currentIndex
    });
    this.sound = new Howl({
      src: [this.state.songsUrlArray[currentIndex]],
      html5: true
    });
    this.handlePlayAudio();
  };

  handlePlayPrevious = () => {
    this.handleStop();
    var currentIndex = 0;
    if (this.state.currentIndex > 0) {
      currentIndex = this.state.currentIndex - 1;
    } else {
      currentIndex = this.state.songsUrlArray.length - 1;
    }

    this.setState({
      currentIndex: currentIndex
    });
    this.sound = new Howl({
      src: [this.state.songsUrlArray[currentIndex]],
      html5: true
    });
    this.handlePlayAudio();
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
        <HomePageDashboard
          sound={this.sound}
          handleArrayUpdate={this.handleArrayUpdate}
          handleSongClick={this.handleSongClick}
        />

        {/* Music Bar Div That Contains the music bar elements */}

        <div className="music-bar">
          <MusicBarButtons
            isPlaying={this.state.isPlaying}
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
