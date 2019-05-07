import {
  SET_SONG_ARRAY,
  SET_CURRENT_SONG_NUMBER,
  SET_SONG_IS_LOADING,
  SET_SONG_IS_PLAYING
} from "../../utils/constantKeywords/actionsReducersConstants";

let defaultState = {
  songArray: [],
  songNumber: 0,
  isLoading: true,
  isPlaying: false
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
    default:
      return state;
  }
};

export default song;
