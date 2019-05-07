import {
  SET_SONG_ARRAY_CARD,
  SET_CURRENT_SONG_NUMBER_CARD,
  SET_SONG_IS_LOADING_CARD,
  SET_SONG_IS_PLAYING_CARD
} from "../../utils/constantKeywords/actionsReducersConstants";

let defaultState = {
  songArrayCard: [],
  songNumberCard: 0,
  isLoadingCard: true,
  isPlayingCard: false
};

const songsCard = (state = defaultState, action) => {
  switch (action.type) {
    case SET_SONG_ARRAY_CARD:
      return {
        ...state,
        songArrayCard: action.payload.songArrayCard
      };

    case SET_CURRENT_SONG_NUMBER_CARD:
      return {
        ...state,
        songNumberCard: action.payload.songNumberCard
      };

    case SET_SONG_IS_LOADING_CARD:
      return {
        ...state,
        isLoadingCard: action.payload.isLoadingCard
      };

    case SET_SONG_IS_PLAYING_CARD:
      return {
        ...state,
        isPlayingCard: action.payload.isPlayingCard
      };
    default:
      return state;
  }
};

export default songsCard;
