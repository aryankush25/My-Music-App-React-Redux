import React, { useState } from "react";
import { BrowserRouter as Route, Link } from "react-router-dom";
import { auth } from "firebase";
import LoginRegisterContainer from "../../components/LoginRegister";
import "./index.scss";

const RegisterFormDiv = props => {
  var [formData, updateFormData] = useState({
    name: "",
    email: "",
    password: "",
    errorMessage: "Everything OK"
  });

  const onFormSubmit = event => {
    event.preventDefault();

    if (
      formData.email !== "" &&
      formData.password !== "" &&
      formData.name !== ""
    ) {
      auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          // window.localStorage.setItem("musicAppSignedIn", true);
          var user = auth().currentUser;
          if (user) {
            user
              .updateProfile({
                displayName: formData.name
              })
              .then(() => {
                console.log(user);
                auth()
                  .signOut()
                  .then(() => {
                    console.log("Register and LogOut Done");
                    props.history.push("/login");
                  });
              });
          }
        })
        .catch(function(error) {
          var errorCode = error.code;
          formData.errorMessage = error.message;
          if (errorCode === "auth/weak-password") {
            formData.errorMessage = "The password is too weak.";
          }
          props.reRenderComponent();
          console.log(error);
        });
    } else {
      if (formData.password === "") {
        formData.errorMessage = "Enter Password";
        props.reRenderComponent();
      }
      if (formData.email === "") {
        formData.errorMessage = "Enter Email";
        props.reRenderComponent();
      }
      if (formData.name === "") {
        formData.errorMessage = "Enter Name";
        props.reRenderComponent();
      }
    }
  };

  const handleChangeName = event => {
    const { value } = event.target;
    updateFormData({
      ...formData,
      name: value
    });
  };

  const handleChangeEmail = event => {
    const { value } = event.target;
    updateFormData({
      ...formData,
      email: value
    });
  };

  const handleChangePassword = event => {
    const { value } = event.target;
    updateFormData({
      ...formData,
      password: value
    });
  };

  return (
    <div className="card-block">
      <div className="valid-form"> {formData.errorMessage} </div>
      <form
        className="form-signin needs-validation"
        onSubmit={onFormSubmit}
        noValidate
      >
        <div>
          <label className="form-lable">Name</label>
          <input
            type="text"
            id="inputName"
            className="form-control"
            placeholder="Name"
            required
            autoFocus
            onChange={handleChangeName}
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
            onChange={handleChangeEmail}
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
            onChange={handleChangePassword}
          />
        </div>
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

class Register extends React.Component {
  reRenderComponent = () => {
    this.forceUpdate();
  };

  registerHeaderMsg = "Create an account";

  render() {
    return (
      <LoginRegisterContainer
        headerMsg={this.registerHeaderMsg}
        form={RegisterFormDiv}
        history={this.history}
        reRenderComponent={this.reRenderComponent}
      />
    );
  }
}

export default Register;
