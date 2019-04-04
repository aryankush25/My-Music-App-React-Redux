import React from "react";

const Landing = props => {
  return (
    <div>
      Login Page
      <button onClick={e => props.history.push("/home")}> Please Click </button>
    </div>
  );
};

export default Landing;
