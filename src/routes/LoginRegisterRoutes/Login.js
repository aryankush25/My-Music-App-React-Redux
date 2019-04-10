import React from "react";
import LoginRegisterContainer from "../../components/LoginRegister";
import LoginFormDiv from "./LoginForm";

class Login extends React.Component {
  loginHeaderMsg = "Log in to your account";
  render() {
    return (
      <LoginRegisterContainer headerMsg={this.loginHeaderMsg}>
        <LoginFormDiv />
      </LoginRegisterContainer>
    );
  }
}

export default Login;
