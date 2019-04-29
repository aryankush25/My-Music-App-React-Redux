const setLocalStorage = value => {
  window.localStorage.setItem("musicAppSignedIn", value);
};

export default setLocalStorage;
