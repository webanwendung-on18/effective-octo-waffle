import React, { Component } from "react";
import { Link } from "@reach/router";
import firebase from "./../firebase/config";

class Home extends Component {
  render() {
    return (
      <div id="home">
        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-8">
            <div className="text-center">
              <h1 className="h2">Effective Octo Waffle</h1>
              <p className="lead mb-5">
                You want to explore new recipes and share your own ones with
                your friends and the community? Octo Waffle is a social recipe
                book and a must have for everyone who loves cooking.
              </p>
              <div className="d-flex justify-content-center">
                <div className="w-75">
                  <button
                    type="button"
                    className="btn btn-primary btn-block mb-3"
                  >
                    Get started
                  </button>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <div className="w-75">
                  <button type="button" className="btn btn-light btn-block">
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
