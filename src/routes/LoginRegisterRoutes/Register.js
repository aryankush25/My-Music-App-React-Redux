import React from "react";
import { BrowserRouter as Route, Link } from "react-router-dom";
import LoginRegisterContainer from "../../components/LoginRegister";
import "./index.css";

const RegisterFormDiv = () => {
  return (
    <div className="card-block">
      <form className="form-signin">
        <label className="form-lable">Name</label>
        <input
          type="text"
          id="inputName"
          className="form-control"
          placeholder="Name"
          required
          autoFocus
        />
        <label className="form-lable">Email Address</label>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          required
          autoFocus
        />
        <label className="form-lable">Password</label>
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required
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

const Register = () => {
  const registerHeaderMsg = "Create an account";
  return (
    <LoginRegisterContainer
      headerMsg={registerHeaderMsg}
      form={RegisterFormDiv}
    />
  );
};

export default Register;
