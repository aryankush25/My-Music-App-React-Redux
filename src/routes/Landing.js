import React from "react";
import { Redirect } from "react-router-dom";

const Landing = () => {
  const musicAppSignedIn = window.localStorage.getItem("musicAppSignedIn");
  if (musicAppSignedIn === "true") {
    return <Redirect to="/home" />;
  } else {
    return <Redirect to="/login" />;
  }
};

export default Landing;
