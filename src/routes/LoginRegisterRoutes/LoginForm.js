import React from "react";
import { Link } from "react-router-dom";
// import { auth } from "firebase";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import "./index.scss";
import firebase from "firebase/app";
import "firebase/auth";

class LoginFormDiv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: "Enter Details",
      isErrorExists: false,
      isLoading: false
    };
  }

  onFormSubmit = event => {
    event.preventDefault();

    if (this.state.email !== "" && this.state.password !== "") {
      this.setState({
        isLoading: true
      });

      let lastAtPos = this.state.email.lastIndexOf("@");
      let lastDotPos = this.state.email.lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          this.state.email.indexOf("@@") === -1 &&
          lastDotPos > 2 &&
          this.state.email.length - lastDotPos > 2
        )
      ) {
        this.setState({
          errorMessage: "Email is not valid",
          isLoading: false,
          isErrorExists: true
        });
      } else {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.state.email, this.state.password)
          .then(() => {
            this.props.history.push("/home");
          })
          .catch(error => {
            var errorCode = error.code;
            this.setState({
              errorMessage: error.message,
              isErrorExists: true
            });
            if (errorCode === "auth/wrong-password") {
              this.setState({
                errorMessage: "Wrong password."
              });
            }
            this.setState({
              isLoading: false
            });
          });
      }
    } else {
      if (this.state.password === "") {
        this.setState({
          errorMessage: "Enter Password",
          isErrorExists: true
        });
      }
      if (this.state.email === "") {
        this.setState({
          errorMessage: "Enter Email",
          isErrorExists: true
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
      return <div className="valid-form"> {this.state.errorMessage} </div>;
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

export default LoginFormDiv;
