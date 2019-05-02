let defaultState = true;

const isLoadingReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_IS_LOADING":
      return action.isLoading;
    default:
      return state;
  }
};

export default isLoadingReducer;
