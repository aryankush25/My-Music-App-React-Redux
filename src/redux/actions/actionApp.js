import { SET_APP_IS_LOADING } from "../../utils/constantKeywords/actionsReducersConstants";

export const setAppIsLoadingAction = isLoading => ({
  type: SET_APP_IS_LOADING,
  payload: {
    isLoading
  }
});
