import {
  SET_USER_ARRAY,
  SET_CURRENT_USER_NUMBER,
  SET_USER_IS_LOADING
} from "../../utils/constantKeywords/actionsReducersConstants";

export const setUsersAction = userArray => ({
  type: SET_USER_ARRAY,
  payload: { userArray }
});

export const setCurrentUsersNumberAction = userNumber => ({
  type: SET_CURRENT_USER_NUMBER,
  payload: { userNumber }
});

export const setUsersIsLoadingAction = isLoading => ({
  type: SET_USER_IS_LOADING,
  payload: { isLoading }
});
