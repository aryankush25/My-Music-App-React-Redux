import {
  SET_PLAYLIST_ARRAY,
  SET_CURRENT_PLAYLIST_NUMBER,
  SET_PLAYLIST_IS_LOADING
} from "../../utils/constantKeywords/actionsReducersConstants";

export const setUsersAction = playlistArray => ({
  type: SET_PLAYLIST_ARRAY,
  payload: { playlistArray }
});

export const setCurrentUsersNumberAction = playlistNumber => ({
  type: SET_CURRENT_PLAYLIST_NUMBER,
  payload: { playlistNumber }
});

export const setUsersIsLoadingAction = isLoading => ({
  type: SET_PLAYLIST_IS_LOADING,
  payload: { isLoading }
});
