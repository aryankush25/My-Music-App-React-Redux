import React from "react";
import { BrowserRouter as Route, Link } from "react-router-dom";
import LoginRegisterContainer from "../../components/LoginRegister";
import "./index.css";

const LoginFormDiv = () => {
  return (
    <div className="card-block">
      <form className="form-signin">
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
          Sign in
        </button>
      </form>
      <p className="mt-5 mb-3 text-muted">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

const Login = () => {
  const loginHeaderMsg = "Log in to your account";
  return (
    <LoginRegisterContainer headerMsg={loginHeaderMsg} form={LoginFormDiv} />
  );
};

export default Login;
