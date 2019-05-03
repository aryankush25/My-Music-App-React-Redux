import {
  SET_SONG_ARRAY,
  SET_CURRENT_SONG_NUMBER,
  SET_SONG_IS_LOADING
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
