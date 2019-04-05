import React from "react";

const Register = props => {
  return (
    <div>
      Register Page
      <button onClick={e => props.history.push("/login")}>
        {" "}
        Click Here To Login{" "}
      </button>
    </div>
  );
};

export default Register;
