import React from "react";
import { Howl, Howler } from "howler";
import HomePageDashboard from "../../components/HomePageDashboard";
import MusicSeekBar from "../../components/MusicBarComponents/MusicSeekBar";
import MusicVolumeBar from "../../components/MusicBarComponents/MusicVolumeBar";
import MusicBarButtons from "../../components/MusicBarComponents/MusicBarButtons";
import "./style.scss";
import { connect } from "react-redux";
import {
  setSongAction,
  setCurrentSongNumberAction,
  setSongIsLoadingAction,
  setSongIsPlayingAction,
  setSongCurrentDurationAction,
  setIsNewSong
} from "../../redux/actions/actionSongs";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
      currentDuration: 0,
      songNumber: 0,
      songArray: []
    };
  }

  // componentDidUpdate(prevProps) {
  //   const {
  //     songArray,
  //     songNumber,
  //     isPlaying,
  //     currentSongDuration,
  //     isNewSong
  //   } = this.props;

  //   console.log("nextProps");
  //   console.log({
  //     songArray,
  //     songNumber,
  //     isPlaying,
  //     currentSongDuration,
  //     isNewSong
  //   });

  //   const {
  //     songArray: songArrayPrev,
  //     songNumber: songNumberPrev,
  //     isPlaying: isPlayingPrev,
  //     currentSongDuration: currentSongDurationPrev,
  //     isNewSong: isNewSongPrev
  //   } = prevProps;

  //   console.log("prevProps");
  //   console.log({
  //     songArrayPrev,
  //     songNumberPrev,
  //     isPlayingPrev,
  //     currentSongDurationPrev,
  //     isNewSongPrev
  //   });
  // }

  sound = {};
  intervalID = 0;

  handleStop = () => {
    this.sound.stop();
    clearInterval(this.intervalID);
    this.props.setIsNewSong(true);
    this.props.setSongIsPlayingAction(false);
    this.props.setSongCurrentDurationAction(0);
  };

  handlePlayAudio = () => {
    console.log("isNewSong ", this.props.isNewSong);
    if (this.props.isNewSong === true) {
      this.sound = new Howl({
        src: [this.props.songArray[this.props.songNumber].url],
        html5: true
      });
      this.props.setIsNewSong(false);
    }

    this.intervalID = setInterval(() => {
      if (Math.round(this.sound._duration) === this.props.currentSongDuration) {
        this.handlePlayNext();
      } else {
        this.props.setSongCurrentDurationAction(
          this.props.currentSongDuration + 1
        );
      }
    }, 1000);
    this.props.setSongIsPlayingAction(true);
    this.sound.play();
  };

  handlePauseAudio = () => {
    this.sound.pause();
    clearInterval(this.intervalID);
    this.props.setSongIsPlayingAction(false);
  };

  handlePlayPauseAudio = () => {
    if (this.props.isPlaying === true) {
      this.handlePauseAudio();
    } else {
      this.handlePlayAudio();
    }
  };

  handlePlayNext = () => {
    this.handleStop();
    var songNumber = 0;
    if (this.props.songArray.length - 1 > this.props.songNumber) {
      songNumber = this.props.songNumber + 1;
    } else {
      songNumber = 0;
    }
    this.props.setCurrentSongNumberAction(songNumber);

    this.handlePlayAudio();
  };

  handlePlayPrevious = () => {
    this.handleStop();
    var songNumber = 0;
    if (this.props.songNumber > 0) {
      songNumber = this.props.songNumber - 1;
    } else {
      songNumber = this.props.songArray.length - 1;
    }

    this.props.setCurrentSongNumberAction(songNumber);
    this.handlePlayAudio();
  };

  handleAdjustSeek = value => {
    this.sound.seek(value);
    this.props.setSongCurrentDurationAction(value);
  };

  handleAdjustAudio = value => {
    Howler.volume(value / 10);
  };

  render() {
    return (
      <div className="home-container">
        <div className="home-page-div">
          <HomePageDashboard
            sound={this.sound}
            handleArrayUpdate={this.handleArrayUpdate}
          />

          {/* Music Bar Div That Contains the music bar elements */}

          <div className="music-bar">
            <MusicBarButtons
              isPlaying={this.props.isPlaying}
              playPrevious={this.handlePlayPrevious}
              playPauseAudio={this.handlePlayPauseAudio}
              playNext={this.handlePlayNext}
            />
            <MusicSeekBar
              duration={this.sound._duration}
              currentDuration={this.props.currentSongDuration}
              adjustSeek={this.handleAdjustSeek}
            />
            <MusicVolumeBar
              volume={Howler._volume}
              adjustAudio={this.handleAdjustAudio}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    songArray,
    songNumber,
    isPlaying,
    currentSongDuration,
    isNewSong
  } = state.song;
  return { songArray, songNumber, isPlaying, currentSongDuration, isNewSong };
};

const mapDispatchToProps = dispatch => {
  return {
    setSongAction: songsArray => dispatch(setSongAction(songsArray)),

    setCurrentSongNumberAction: songNumber =>
      dispatch(setCurrentSongNumberAction(songNumber)),

    setSongIsLoadingAction: isLoading =>
      dispatch(setSongIsLoadingAction(isLoading)),

    setSongIsPlayingAction: isPlaying =>
      dispatch(setSongIsPlayingAction(isPlaying)),

    setSongCurrentDurationAction: currentSongDuration =>
      dispatch(setSongCurrentDurationAction(currentSongDuration)),

    setIsNewSong: isNewSong => dispatch(setIsNewSong(isNewSong))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
