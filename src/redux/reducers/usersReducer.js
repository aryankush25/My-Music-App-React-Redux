let defaultState = {
  userArray: [],
  userNumber: 0,
  isLoading: true
};

const users = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_USER_ARRAY":
      return {
        ...state,
        userArray: action.payload
      };

    case "SET_CURRENT_USER_NUMBER":
      return {
        ...state,
        userNumber: action.payload
      };

    case "SET_USER_IS_LOADING":
      return {
        ...state,
        isLoading: action.payload
      };

    default:
      return state;
  }
};

export default users;
