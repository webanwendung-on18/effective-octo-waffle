import React, { Component } from "react";
import { Link } from "@reach/router";

class Home extends Component {
  render() {
    const { user } = this.props;

    return (
      <div id="home">
        <header id="home-content">
          <div className="text-center text-light">
            <h1 className="h2">Octo Waffle</h1>
            <p className="lead mb-5">
              You want to explore new recipes and share your own ones with your
              friends and the community? Octo Waffle is a social recipe book and
              a must have for everyone who loves cooking.
            </p>
            {user == null && (
              <>
                <div className="d-flex justify-content-center">
                  <div className="w-75">
                    <Link
                      className="btn btn-primary btn-block mb-3"
                      to="/register"
                    >
                      Get started
                    </Link>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <div className="w-75">
                    <Link
                      className="btn btn-outline-light btn-block"
                      to="/login"
                    >
                      Login
                    </Link>
                  </div>
                </div>
              </>
            )}
            {user != null && (
              <div className="d-flex justify-content-center">
                <div className="w-75">
                  <Link
                    className="btn btn-primary btn-block mb-3"
                    to="/recipes"
                  >
                    Discover new recipes
                  </Link>
                </div>
              </div>
            )}
          </div>
        </header>
      </div>
    );
  }
}

export default Home;
