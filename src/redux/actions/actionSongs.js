import {
  SET_SONG_ARRAY,
  SET_CURRENT_SONG_NUMBER,
  SET_SONG_IS_LOADING,
  SET_SONG_IS_PLAYING,
  SET_SONG_CURRENT_DURATION,
  SET_IS_NEW_SONG
} from "../../utils/constantKeywords/actionsReducersConstants";

export const setSongAction = songArray => ({
  type: SET_SONG_ARRAY,
  payload: { songArray }
});

export const setCurrentSongNumberAction = songNumber => ({
  type: SET_CURRENT_SONG_NUMBER,
  payload: { songNumber }
});

export const setSongIsLoadingAction = isLoading => ({
  type: SET_SONG_IS_LOADING,
  payload: { isLoading }
});

export const setSongIsPlayingAction = isPlaying => ({
  type: SET_SONG_IS_PLAYING,
  payload: { isPlaying }
});

export const setSongCurrentDurationAction = currentSongDuration => ({
  type: SET_SONG_CURRENT_DURATION,
  payload: { currentSongDuration }
});

export const setIsNewSong = isNewSong => ({
  type: SET_IS_NEW_SONG,
  payload: { isNewSong }
});

export const setSongAndPlay = songNumber => ({
  type: "SET_SONG_AND_PLAY",
  payload: {
    songNumber,
    currentSongDuration: 0,
    isNewSong: true
  }
});

export const setSongAndPlayFromSongCard = songNumber => ({
  type: "SET_SONG_AND_PLAY_FROM_SONG_CARD",
  payload: {
    songNumber,
    currentSongDuration: 0,
    isNewSong: true,
    isPlaying: true
  }
});
