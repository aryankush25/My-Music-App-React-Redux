import {
  SET_SONG_ARRAY,
  SET_CURRENT_SONG_NUMBER,
  SET_SONG_IS_LOADING,
  SET_SONG_IS_PLAYING,
  SET_SONG_CURRENT_DURATION,
  SET_IS_NEW_SONG,
  SET_SONG_AND_PLAY,
  SET_SONG_AND_PLAY_FROM_SONG_CARD,
  SET_STOP_SONG
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

export const setIsNewSongAction = isNewSong => ({
  type: SET_IS_NEW_SONG,
  payload: { isNewSong }
});

export const setSongAndPlayAction = songNumber => ({
  type: SET_SONG_AND_PLAY,
  payload: {
    songNumber,
    currentSongDuration: 0,
    isNewSong: true
  }
});

export const setSongAndPlayFromSongCardAction = (songArray, songNumber) => ({
  type: SET_SONG_AND_PLAY_FROM_SONG_CARD,
  payload: {
    songArray,
    songNumber,
    currentSongDuration: 0,
    isNewSong: true,
    isPlaying: true
  }
});

export const setSongStopAction = stopSong => ({
  type: SET_STOP_SONG,
  payload: {
    stopSong
  }
});

export const setSongPlaylistAction = currentSongPlaylist => ({
  type: "SET_CURRENT_SONG_PLAYLIST",
  payload: {
    currentSongPlaylist
  }
});

export const setSongUserAction = currentSongUser => ({
  type: "SET_CURRENT_SONG_USER",
  payload: {
    currentSongUser
  }
});
