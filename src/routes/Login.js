import React from "react";
import { BrowserRouter as Route, Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-container container col-lg-10 col-md-8">
      <div className="card">
        <div className="card-header">
          <div className="card-img">
            <img
              src={require("../assets/images/acoustic-guitar.png")}
              alt="img"
              className="mb-4"
              width="100"
              height="100"
            />
          </div>
          <h1 className="h3 mb-3 font-weight-normal">Log in to your account</h1>
        </div>

        <div className="card-block">
          <form className="form-signin">
            <label className="form-lable">Email address</label>
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
        </div>

        <div>
          <p className="mt-5 mb-3 text-muted">
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
