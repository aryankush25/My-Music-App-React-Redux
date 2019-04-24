let defaultState = [];

const songsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "GET_SONGS":
      return [...state];
    default:
      return state;
  }
};

export default songsReducer;
