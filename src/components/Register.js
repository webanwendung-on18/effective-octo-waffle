import React, { Component } from "react";
import firebase from "../firebase/config";
import FormError from "./FormError";
import { Link } from "@reach/router";
import { TFPrimary } from "../materialUI/styles";
import Button from "@material-ui/core/Button";
import { Helmet } from "react-helmet";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      email: "",
      passOne: "",
      passTwo: "",
      errorMessage: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({ [itemName]: itemValue }, () => {
      if (this.state.passOne !== this.state.passTwo) {
        this.setState({ errorMessage: "Passwords no not match" });
      } else {
        this.setState({ errorMessage: null });
      }
    });
  }

  handleSubmit(e) {
    var registrationInfo = {
      userName: this.state.userName,
      email: this.state.email,
      password: this.state.passOne
    };
    e.preventDefault();

    firebase
      .auth()
      .createUserWithEmailAndPassword(registrationInfo.email, registrationInfo.password)
      .then(() => {
        this.props.registerUser(registrationInfo.userName);
      })
      .catch(error => {
        if (error.message !== null) {
          this.setState({ errorMessage: error.message });
        } else {
          this.setState({ errorMessage: null });
        }
      });
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Register | Octo Waffle</title>
        </Helmet>
        <div id="home">
          <div id="home-content">
            <div className="card card-login">
              <div className="card-body">
                <h1 className="h2 text-center mt-2">Register</h1>
                <h6 className="card-subtitle mb-3 text-muted text-center">Create a new account</h6>
                <form onSubmit={this.handleSubmit}>
                  {this.state.errorMessage !== null ? (
                    <FormError theMessage={this.state.errorMessage} />
                  ) : null}
                  <form noValidate autoComplete="off" className="mx-3 mb-1">
                    <TFPrimary
                      fullWidth
                      id="standard-basic"
                      label="User Name"
                      className="my-2"
                      type="text"
                      name="userName"
                      value={this.state.userName}
                      onChange={this.handleChange}
                    />
                    <TFPrimary
                      fullWidth
                      id="standard-basic"
                      label="E-Mail"
                      className="my-2"
                      type="email"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                    <TFPrimary
                      fullWidth
                      id="standard-basic"
                      label="Password"
                      className="my-2"
                      type="password"
                      name="passOne"
                      value={this.state.passOne}
                      onChange={this.handleChange}
                    />
                    <TFPrimary
                      fullWidth
                      id="standard-basic"
                      label="Repeat Password"
                      className="my-2"
                      type="password"
                      name="passTwo"
                      value={this.state.passTwo}
                      onChange={this.handleChange}
                    />
                  </form>
                  <div className="ml-3 mt-2 mb-5">
                    <Button variant="contained" color="primary" type="submit">
                      Register
                    </Button>
                  </div>
                  <div className="mr-3 d-flex justify-content-center">
                    <div className="d-flex align-items-end">
                      <Link to="/login" className="card-link mt-2 text-muted">
                        Already have an account?
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Register;
