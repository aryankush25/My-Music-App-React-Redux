let defaultState = {
  appIsLoading: true
};

const isAppLoadingReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_APP_IS_LOADING":
      return {
        ...state,
        appIsLoading: action.payload.isLoading
      };
    default:
      return state;
  }
};

export default isAppLoadingReducer;
