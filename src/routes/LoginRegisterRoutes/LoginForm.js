import React from "react";
import { withRouter, Link } from "react-router-dom";
import SubmitButton from "../../components/SubmitButton/";
import validateEmail from "../../utils/ValidationFunctions/validateEmail";
import validatePassword from "../../utils/ValidationFunctions/validatePassword";
import signInUser from "../../services/firebaseAuth/signInUser";
import {
  AUTH_WRONG_PASS,
  WRONG_PASS
} from "../../utils/constantKeywords123/errorConstants";

class LoginFormDiv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: "",
      isErrorExists: false,
      isLoading: false
    };
  }

  onFormSubmit = event => {
    event.preventDefault();

    var emailValidObj = validateEmail(this.state.email);
    var passwordValidObj = validatePassword(this.state.password);

    if (emailValidObj.isErrorExists === true) {
      this.setState({
        errorMessage: emailValidObj.errorMessage,
        isErrorExists: emailValidObj.isErrorExists
      });
    } else if (passwordValidObj.isErrorExists === true) {
      this.setState({
        errorMessage: passwordValidObj.errorMessage,
        isErrorExists: passwordValidObj.isErrorExists
      });
    } else {
      this.setState({
        isLoading: true
      });
      this.handleSignIn();
    }
  };

  handleSignIn = async () => {
    try {
      await signInUser(this.state.email, this.state.password);
      window.localStorage.setItem("musicAppSignedIn", true);
      this.props.history.replace("/home");
    } catch (error) {
      var errorCode = error.code;
      this.setState({
        errorMessage: error.message,
        isErrorExists: true
      });
      if (errorCode === AUTH_WRONG_PASS) {
        this.setState({
          errorMessage: WRONG_PASS,
          isLoading: false
        });
      } else {
        this.setState({
          isLoading: false
        });
      }
    }
  };

  handleChangeEmail = event => {
    const { value } = event.target;
    this.setState({
      email: value
    });
  };

  handleChangePassword = event => {
    const { value } = event.target;
    this.setState({
      password: value
    });
  };

  renderErrorLable = () => {
    if (this.state.isErrorExists === true) {
      return <div className="invalid-form"> {this.state.errorMessage} </div>;
    }
  };

  render() {
    return (
      <div className="card-block">
        <form className="form-signin" onSubmit={this.onFormSubmit} noValidate>
          {this.renderErrorLable()}
          <label className="form-lable">Email Address</label>
          <input
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            required
            autoFocus
            onChange={this.handleChangeEmail}
          />
          <label className="form-lable">Password</label>
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            required
            onChange={this.handleChangePassword}
          />
          <SubmitButton
            isLoading={this.state.isLoading}
            buttonData={"Sign in"}
          />
        </form>
        <p className="mt-5 mb-3 text-muted">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    );
  }
}

export default withRouter(LoginFormDiv);
