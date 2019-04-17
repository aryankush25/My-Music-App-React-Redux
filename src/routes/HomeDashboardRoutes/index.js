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
      src: [this.state.songsUrlArray[this.state.currentIndex]],
      html5: true
    });
  };

  handleStop = async () => {
    this.sound.stop();
    clearInterval(this.intervalID);
    await this.setState({
      isPlaying: false,
      currentDuration: 0
    });
  };

  handleSongClick = async index => {
    if (this.state.isPlaying === true) this.handleStop();
    await this.setState({
      currentIndex: index
    });
    this.sound = new Howl({
      src: [this.state.songsUrlArray[index]],
      html5: true
    });
    this.handlePlayPauseAudio();
  };

  handlePlayPauseAudio = async () => {
    if (this.state.isPlaying === true) {
      this.sound.pause();
      clearInterval(this.intervalID);
    } else {
      this.intervalID = setInterval(async () => {
        if (Math.round(this.sound._duration) === this.state.currentDuration) {
          this.handleStop();
          this.handlePlayNext();
        } else {
          await this.setState({
            currentDuration: this.state.currentDuration + 1
          });
        }
      }, 1000);
      this.sound.play();
    }
    await this.setState({
      isPlaying: !this.state.isPlaying
    });
  };

  handlePlayNext = async () => {
    this.handleStop();

    if (this.state.songsUrlArray.length - 1 > this.state.currentIndex) {
      await this.setState({
        currentIndex: this.state.currentIndex + 1
      });
    } else {
      await this.setState({
        currentIndex: 0
      });
    }

    this.sound = new Howl({
      src: [this.state.songsUrlArray[this.state.currentIndex]],
      html5: true
    });
    this.handlePlayPauseAudio();
  };

  handlePlayPrevious = async () => {
    this.handleStop();

    if (this.state.currentIndex > 0) {
      await this.setState({
        currentIndex: this.state.currentIndex - 1
      });
    } else {
      await this.setState({
        currentIndex: this.state.songsUrlArray.length - 1
      });
    }

    this.sound = new Howl({
      src: [this.state.songsUrlArray[this.state.currentIndex]],
      html5: true
    });
    this.handlePlayPauseAudio();
  };

  handleAdjustSeek = async value => {
    this.sound.seek(value);
    await this.setState({
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
