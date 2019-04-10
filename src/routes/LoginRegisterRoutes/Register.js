import React from "react";
import LoginRegisterContainer from "../../components/LoginRegister";
import RegisterFormDiv from "./RegisterForm";

class Register extends React.Component {
  registerHeaderMsg = "Create an account";
  render() {
    return (
      <LoginRegisterContainer headerMsg={this.registerHeaderMsg}>
        <RegisterFormDiv />
      </LoginRegisterContainer>
    );
  }
}

export default Register;
