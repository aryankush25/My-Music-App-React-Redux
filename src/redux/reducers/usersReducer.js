import {
  SET_USER_ARRAY,
  SET_CURRENT_USER_NUMBER,
  SET_USER_IS_LOADING
} from "../../utils/constantKeywords/actionsReducersConstants";

let defaultState = {
  userArray: [],
  userNumber: 0,
  isLoading: true
};

const users = (state = defaultState, action) => {
  switch (action.type) {
    case SET_USER_ARRAY:
      return {
        ...state,
        userArray: action.payload.userArray
      };

    case SET_CURRENT_USER_NUMBER:
      return {
        ...state,
        userNumber: action.payload.userNumber
      };

    case SET_USER_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading
      };

    default:
      return state;
  }
};

export default users;
