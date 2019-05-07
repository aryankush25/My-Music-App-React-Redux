import { combineReducers } from "redux";
import app from "./appReducer";
import users from "./usersReducer";
import playlist from "./playlistReducer";
import song from "./songsReducer";
import songsCard from "./songsCardsReducer";

export default combineReducers({
  app,
  users,
  playlist,
  song,
  songsCard
});
