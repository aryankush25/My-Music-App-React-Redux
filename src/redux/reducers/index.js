import { combineReducers } from "redux";
import isLoading from "./isLoadingReducer";
import users from "./usersReducer";

export default combineReducers({
  isLoading,
  users
});
