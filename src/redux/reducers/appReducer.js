import {
  SET_APP_IS_LOADING,
  SET_APP_CURRENT_USER
} from "../../utils/constantKeywords/actionsReducersConstants";

let defaultState = {
  appIsLoading: true,
  appCurrentUser: null
};

const isAppLoadingReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_APP_IS_LOADING:
      return {
        ...state,
        appIsLoading: action.payload.isLoading
      };
    case SET_APP_CURRENT_USER:
      return {
        ...state,
        appCurrentUser: action.payload.currentUser
      };
    default:
      return state;
  }
};

export default isAppLoadingReducer;
