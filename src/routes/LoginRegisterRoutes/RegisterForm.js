import React from "react";
import { withRouter, Link } from "react-router-dom";
import SubmitButton from "../../components/SubmitButton/";
import validateName from "../../utils/validatedFunctions/validateName";
import validateEmail from "../../utils/validatedFunctions/validateEmail";
import validatePassword from "../../utils/validatedFunctions/validatePassword";
import signUpUser from "../../services/firebaseAuth/signUpUser";
import signOutUser from "../../services/firebaseAuth/signOutUser";
import currentUser from "../../services/firebaseAuth/currentUser";
import updateUser from "../../services/firebaseAuth/updateUser";
import createUser from "../../services/firebaseFirestore/createUser";
import {
  AUTH_WEAK_PASS,
  WEAK_PASS
} from "../../utils/constantKeywords/errorConstants";

class RegisterFormDiv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      errorMessage: "",
      isErrorExists: false,
      isLoading: false
    };
  }

  setTheState = (errorMessage, isErrorExists) => {
    this.setState({
      errorMessage: errorMessage,
      isErrorExists: isErrorExists
    });
  };

  onFormSubmit = event => {
    event.preventDefault();

    var emailValidObj = validateEmail(this.state.email);
    var passwordValidObj = validatePassword(this.state.password);
    var nameValidObj = validateName(this.state.name);

    if (nameValidObj.isErrorExists === true) {
      this.setTheState(nameValidObj.errorMessage, nameValidObj.isErrorExists);
    } else if (emailValidObj.isErrorExists === true) {
      this.setTheState(emailValidObj.errorMessage, emailValidObj.isErrorExists);
    } else if (passwordValidObj.isErrorExists === true) {
      this.setTheState(
        passwordValidObj.errorMessage,
        passwordValidObj.isErrorExists
      );
    } else {
      this.setState({
        isLoading: true
      });

      this.handleSignUpUser();
    }
  };

  handleSignUpUser = async () => {
    try {
      await signUpUser(this.state.email, this.state.password);
      var user = await currentUser();
      if (user) {
        await updateUser(this.state.name);
        await createUser(user.uid, this.state.name);
        await signOutUser();
        window.localStorage.setItem("musicAppSignedIn", false);
        this.props.history.push("/login");
      }
    } catch (error) {
      var errorCode = error.code;
      this.setState({
        errorMessage: error.message,
        isErrorExists: true
      });
      if (errorCode === AUTH_WEAK_PASS) {
        this.setState({
          errorMessage: WEAK_PASS
        });
      }
      this.setState({
        isLoading: false
      });
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
      return <div className="invalid-form"> {this.state.errorMessage} </div>;
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

export default withRouter(RegisterFormDiv);
