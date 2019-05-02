import { combineReducers } from "redux";
import app from "./appReducer";
import users from "./usersReducer";

export default combineReducers({
  app,
  users
});
