import React from "react";
import { BrowserRouter as Route, Link } from "react-router-dom";
import headerImage from "../../assets/images/acoustic-guitar.png";
import "./index.scss";

const LoginRegisterContainer = props => {
  return (
    <div className="login-register-container container col-lg-10 col-md-8">
      <div className="card">
        <div className="card-header">
          <div className="card-img">
            <img src={headerImage} alt="img" className="mb-4" />
          </div>
          <h1 className="h3 mb-3 font-weight-normal">{props.headerMsg}</h1>
        </div>
        <props.form
          history={props.history}
          reRenderComponent={props.reRenderComponent}
        />
      </div>
    </div>
  );
};

export default LoginRegisterContainer;
