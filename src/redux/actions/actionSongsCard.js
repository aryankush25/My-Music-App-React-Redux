import {
  SET_SONG_ARRAY_CARD,
  SET_CURRENT_SONG_NUMBER_CARD,
  SET_SONG_IS_LOADING_CARD,
  SET_SONG_IS_PLAYING_CARD
} from "../../utils/constantKeywords/actionsReducersConstants";

export const setSongArrayCardAction = songArrayCard => ({
  type: SET_SONG_ARRAY_CARD,
  payload: { songArrayCard }
});

export const setCurrentSongNumberCardAction = songNumberCard => ({
  type: SET_CURRENT_SONG_NUMBER_CARD,
  payload: { songNumberCard }
});

export const setSongIsLoadingCardAction = isLoadingCard => ({
  type: SET_SONG_IS_LOADING_CARD,
  payload: { isLoadingCard }
});

export const setSongIsPlayingCardAction = isPlayingCard => ({
  type: SET_SONG_IS_PLAYING_CARD,
  payload: { isPlayingCard }
});
