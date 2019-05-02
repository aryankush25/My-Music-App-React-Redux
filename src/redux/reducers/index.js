import { combineReducers } from "redux";
import app from "./appReducer";
import users from "./usersReducer";
import playlist from "./playlistReducer";

export default combineReducers({
  app,
  users,
  playlist
});
