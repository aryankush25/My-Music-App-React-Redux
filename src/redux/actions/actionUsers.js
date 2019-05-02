export const setUsers = userArray => ({
  type: "SET_USER_ARRAY",
  payload: userArray
});

export const setCurrentUsersNumber = userNumber => ({
  type: "SET_CURRENT_USER_NUMBER",
  payload: userNumber
});

export const setUsersIsLoading = isLoading => ({
  type: "SET_USER_IS_LOADING",
  payload: isLoading
});
