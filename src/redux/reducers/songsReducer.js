import {
  SET_SONG_ARRAY,
  SET_CURRENT_SONG_NUMBER,
  SET_SONG_IS_LOADING,
  SET_SONG_IS_PLAYING,
  SET_SONG_CURRENT_DURATION,
  SET_IS_NEW_SONG
} from "../../utils/constantKeywords/actionsReducersConstants";

let defaultState = {
  songArray: [],
  songNumber: 0,
  isLoading: true,
  isPlaying: false,
  currentSongDuration: 0,
  isNewSong: true
};

const song = (state = defaultState, action) => {
  switch (action.type) {
    case SET_SONG_ARRAY:
      return {
        ...state,
        songArray: action.payload.songArray
      };

    case SET_CURRENT_SONG_NUMBER:
      return {
        ...state,
        songNumber: action.payload.songNumber
      };

    case SET_SONG_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading
      };

    case SET_SONG_IS_PLAYING:
      return {
        ...state,
        isPlaying: action.payload.isPlaying
      };
    case SET_SONG_CURRENT_DURATION:
      return {
        ...state,
        currentSongDuration: action.payload.currentSongDuration
      };
    case SET_IS_NEW_SONG:
      return {
        ...state,
        isNewSong: action.payload.isNewSong
      };

    case "SET_SONG_AND_PLAY":
      return {
        ...state,
        songNumber: action.payload.songNumber,
        currentSongDuration: action.payload.currentSongDuration,
        isNewSong: action.payload.isNewSong
      };
    case "SET_SONG_AND_PLAY_FROM_SONG_CARD":
      return {
        ...state,
        songNumber: action.payload.songNumber,
        currentSongDuration: action.payload.currentSongDuration,
        isNewSong: action.payload.isNewSong,
        isPlaying: action.payload.isPlaying
      };

    default:
      return state;
  }
};

export default song;
