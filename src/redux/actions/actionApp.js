import {
  SET_APP_IS_LOADING,
  SET_APP_CURRENT_USER
} from "../../utils/constantKeywords/actionsReducersConstants";

export const setAppIsLoadingAction = isLoading => ({
  type: SET_APP_IS_LOADING,
  payload: {
    isLoading
  }
});

export const setAppCurrentUserAction = currentUser => ({
  type: SET_APP_CURRENT_USER,
  payload: {
    currentUser
  }
});
