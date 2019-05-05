import { combineReducers } from "redux";
import app from "./appReducer";
import users from "./usersReducer";
import playlist from "./playlistReducer";
import song from "./songsReducer";

export default combineReducers({
  app,
  users,
  playlist,
  song
});
