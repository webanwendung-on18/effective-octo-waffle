import React, { Component } from "react";
import firebase from "../firebase/config";
import FormError from "./FormError";
import { navigate, Link } from "@reach/router";
import { BtnPrimary, TFPrimary } from "../materialUI/styles";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({ [itemName]: itemValue });
  }

  handleSubmit(e) {
    var registrationInfo = {
      email: this.state.email,
      password: this.state.password
    };
    e.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(registrationInfo.email, registrationInfo.password)
      .then(() => {
        navigate("/recipes");
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
      <div id="home">
        <div id="home-content">
          <div className="card card-login">
            <div className="card-body">
              <h1 className="h2 text-center mt-2">Login</h1>
              <h6 className="card-subtitle mb-3 text-muted text-center">Sign into your account</h6>
              <form onSubmit={this.handleSubmit}>
                {this.state.errorMessage !== null ? (
                  <FormError theMessage={this.state.errorMessage} />
                ) : null}
                <form noValidate autoComplete="off" className="mx-3 mb-1">
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
                    className="mt-2 mb-3"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </form>
                <div className="ml-3 mt-2 mb-5">
                  <BtnPrimary className="btn btn-primary" type="submit">
                    Log in
                  </BtnPrimary>
                </div>
                <div className="mr-3 d-flex justify-content-center">
                  <div className="d-flex align-items-end">
                    <Link to="/register" className="card-link mt-2 text-muted">
                      Don't have an account yet?
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
