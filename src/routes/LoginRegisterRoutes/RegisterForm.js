import React from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import "./index.scss";

class RegisterFormDiv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      errorMessage: "Enter Details",
      isErrorExists: false,
      isLoading: false
    };
  }

  onFormSubmit = event => {
    event.preventDefault();

    if (
      this.state.email !== "" &&
      this.state.password !== "" &&
      this.state.name !== ""
    ) {
      this.setState({
        isLoading: true
      });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          var user = firebase.auth().currentUser;
          if (user) {
            user
              .updateProfile({
                displayName: this.state.name
              })
              .then(() => {
                firebase
                  .auth()
                  .signOut()
                  .then(() => {
                    this.props.history.push("/login");
                  });
              });
          }
        })
        .catch(error => {
          var errorCode = error.code;
          this.setState({
            errorMessage: error.message,
            isErrorExists: true
          });
          if (errorCode === "auth/weak-password") {
            this.setState({
              errorMessage: "The password is too weak."
            });
          }
          this.setState({
            isLoading: false
          });
        });
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
      if (this.state.name === "") {
        this.setState({
          errorMessage: "Enter Name",
          isErrorExists: true
        });
      }
    }
  };

  handleChangeName = event => {
    const { value } = event.target;
    this.setState({
      name: value
    });
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
        {this.renderErrorLable()}
        <form className="form-signin" onSubmit={this.onFormSubmit} noValidate>
          <div>
            <label className="form-lable">Name</label>
            <input
              type="text"
              id="inputName"
              className="form-control"
              placeholder="Name"
              required
              autoFocus
              onChange={this.handleChangeName}
            />
          </div>
          <div>
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
          </div>
          <div>
            <label className="form-lable">Password</label>
            <input
              type="password"
              id="inputPassword"
              className="form-control"
              placeholder="Password"
              required
              onChange={this.handleChangePassword}
            />
          </div>

          <SubmitButton
            isLoading={this.state.isLoading}
            buttonData={"Sign up for free"}
          />
        </form>
        <p className="mt-5 mb-3 text-muted">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    );
  }
}

export default RegisterFormDiv;
