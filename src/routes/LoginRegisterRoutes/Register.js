import React, { useState } from "react";
import { BrowserRouter as Route, Link } from "react-router-dom";
import { auth } from "firebase";
import LoginRegisterContainer from "../../components/LoginRegister";
import "./index.scss";

const RegisterFormDiv = props => {
  var [formData, updateFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onFormSubmit = event => {
    event.preventDefault();
    console.log(formData);

    auth()
      .createUserWithEmailAndPassword(formData.email, formData.password)
      .then(() => {
        // window.localStorage.setItem("musicAppSignedIn", true);
        auth()
          .signOut()
          .then(() => {
            props.history.push("/login");
          });
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === "auth/weak-password") {
          alert("The password is too weak.");
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  };

  const handleChangeName = event => {
    const { value } = event.target;
    updateFormData({
      ...formData,
      name: value
    });
  };

  const handleChangeEmail = event => {
    const { value } = event.target;
    updateFormData({
      ...formData,
      email: value
    });
  };

  const handleChangePassword = event => {
    const { value } = event.target;
    updateFormData({
      ...formData,
      password: value
    });
  };

  return (
    <div className="card-block">
      <form className="form-signin" onSubmit={onFormSubmit}>
        <label className="form-lable">Name</label>
        <input
          type="text"
          id="inputName"
          className="form-control"
          placeholder="Name"
          required
          autoFocus
          onChange={handleChangeName}
        />
        <label className="form-lable">Email Address</label>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          required
          autoFocus
          onChange={handleChangeEmail}
        />
        <label className="form-lable">Password</label>
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required
          onChange={handleChangePassword}
        />
        <button className="btn btn-lg btn-info btn-block" type="submit">
          Sign up for free
        </button>
      </form>
      <p className="mt-5 mb-3 text-muted">
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
};

const Register = props => {
  const registerHeaderMsg = "Create an account";
  return (
    <LoginRegisterContainer
      headerMsg={registerHeaderMsg}
      form={RegisterFormDiv}
      history={props.history}
    />
  );
};

export default Register;
