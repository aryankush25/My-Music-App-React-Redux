import {
  SET_PLAYLIST_ARRAY,
  SET_CURRENT_PLAYLIST_NUMBER,
  SET_PLAYLIST_IS_LOADING
} from "../../utils/constantKeywords/actionsReducersConstants";

let defaultState = {
  playlistArray: [],
  playlistNumber: 0,
  isLoading: true
};

const users = (state = defaultState, action) => {
  switch (action.type) {
    case SET_PLAYLIST_ARRAY:
      return {
        ...state,
        userArray: action.payload.playlistArray
      };

    case SET_CURRENT_PLAYLIST_NUMBER:
      return {
        ...state,
        userNumber: action.payload.playlistNumber
      };

    case SET_PLAYLIST_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading
      };

    default:
      return state;
  }
};

export default users;
