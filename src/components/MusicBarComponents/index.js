import React from "react";
import { Howl, Howler } from "howler";
import MusicSeekBar from "../../components/MusicBarComponents/MusicSeekBar";
import MusicVolumeBar from "../../components/MusicBarComponents/MusicVolumeBar";
import MusicBarButtons from "../../components/MusicBarComponents/MusicBarButtons";
import MusicNameBar from "../../components/MusicBarComponents/MusicNameBar/";
import { connect } from "react-redux";
import {
  setSongAction,
  setCurrentSongNumberAction,
  setSongIsLoadingAction,
  setSongIsPlayingAction,
  setSongCurrentDurationAction,
  setIsNewSongAction,
  setSongAndPlayAction,
  setSongStopAction
} from "../../redux/actions/actionSongs";
import "./style.scss";

class MusicBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSongDuration: 0
    };
  }

  componentDidUpdate(prevProps) {
    function isEmpty(obj) {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) return false;
      }
      return true;
    }

    if (this.props.stopSong === true) {
      if (!isEmpty(this.sound)) {
        this.sound.stop();
        clearInterval(this.intervalID);
        this.props.setSongIsPlayingAction(false);
        this.props.setIsNewSongAction(true);
        this.props.setSongCurrentDurationAction(0);
        this.props.setSongStopAction(false);
      }
    }

    if (prevProps.isNewSong && this.props.isNewSong === true) {
      if (!isEmpty(this.sound)) {
        this.sound.stop();
        clearInterval(this.intervalID);
      }

      this.sound = new Howl({
        src: [this.props.songArray[this.props.songNumber].url],
        html5: true
      });
    }

    if (prevProps.isNewSong === false && this.props.isNewSong === true) {
      if (!isEmpty(this.sound)) {
        this.sound.stop();
        clearInterval(this.intervalID);
      }

      this.sound = new Howl({
        src: [this.props.songArray[this.props.songNumber].url],
        html5: true
      });

      if (this.props.isPlaying === true) {
        this.intervalID = setInterval(this.handleSongTimer, 1000);
        this.sound.play();
      }

      this.props.setIsNewSongAction(false);
    }

    if (prevProps.isPlaying === false && this.props.isPlaying === true) {
      if (this.props.isNewSong === true) {
        this.sound = new Howl({
          src: [this.props.songArray[this.props.songNumber].url],
          html5: true
        });
        this.props.setIsNewSongAction(false);
      }
      this.intervalID = setInterval(this.handleSongTimer, 1000);
      this.sound.play();
    }
  }

  componentWillUnmount = () => {
    console.log("Component Unmounted");
  };

  sound = {};
  intervalID = 0;

  handleSongTimer = () => {
    if (Math.round(this.sound._duration) === this.props.currentSongDuration) {
      this.handlePlayNext();
    } else {
      this.props.setSongCurrentDurationAction(
        this.props.currentSongDuration + 1
      );
    }
  };

  handlePlayAudio = () => {
    this.props.setSongIsPlayingAction(true);
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

  handlePlayNext = async () => {
    var songNumber = 0;
    if (this.props.songArray.length - 1 > this.props.songNumber) {
      songNumber = this.props.songNumber + 1;
    } else {
      songNumber = 0;
    }

    this.sound.stop();
    clearInterval(this.intervalID);

    this.props.setSongAndPlayAction(songNumber);
  };

  handlePlayPrevious = () => {
    var songNumber = 0;
    if (this.props.songNumber > 0) {
      songNumber = this.props.songNumber - 1;
    } else {
      songNumber = this.props.songArray.length - 1;
    }

    this.sound.stop();
    clearInterval(this.intervalID);

    this.props.setSongAndPlayAction(songNumber);
  };

  handleAdjustSeek = value => {
    this.sound.seek(value);
    this.props.setSongCurrentDurationAction(value);
  };

  handleAdjustAudio = value => {
    Howler.volume(value / 10);
  };

  printProps = () => {
    const {
      songArray,
      songNumber,
      isPlaying,
      currentSongDuration,
      isNewSong
    } = this.props;
    console.log({
      songArray,
      songNumber,
      isPlaying,
      currentSongDuration,
      isNewSong
    });
  };

  render() {
    return (
      <div className="music-bar">
        <MusicNameBar />
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
    );
  }
}

const mapStateToProps = state => {
  const {
    songArray,
    songNumber,
    isPlaying,
    currentSongDuration,
    isNewSong,
    isLoading: isLoadingSong
  } = state.song;

  return {
    songArray,
    songNumber,
    isPlaying,
    currentSongDuration,
    isNewSong,
    isLoadingSong
  };
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

    setIsNewSongAction: isNewSong => dispatch(setIsNewSongAction(isNewSong)),

    setSongAndPlayAction: songNumber =>
      dispatch(setSongAndPlayAction(songNumber)),

    setSongStopAction: stopSong => dispatch(setSongStopAction(stopSong))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MusicBar);
