import { Link } from "@reach/router";
import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { BtnLight } from "../materialUI/styles";

class Home extends Component {
  render() {
    const { user } = this.props;

    return (
      <div id="home" className="no-nav-space">
        <header id="home-content">
          <div className="text-center text-light">
            <h1 className="h2">Octo Waffle</h1>
            <p className="lead mb-5">
              You want to explore new recipes and share your own ones with your friends and the
              community? Octo Waffle is a social recipe book and a must have for everyone who loves
              cooking.
            </p>
            {user == null && (
              <>
                <div className="d-flex justify-content-center">
                  <div className="w-75">
                    <Link className="mb-3 btn-block nounderline" to="/register">
                      <Button variant="contained" color="primary" fullWidth>
                        Get started
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <div className="w-75">
                    <Link className="btn-block nounderline" to="/login">
                      <BtnLight variant="outlined" fullWidth>
                        Login
                      </BtnLight>
                    </Link>
                  </div>
                </div>
              </>
            )}
            {user != null && (
              <div className="d-flex justify-content-center">
                <div className="w-75">
                  <Link className="mb-3 btn-block nounderline" to="/recipes">
                    <Button variant="contained" color="primary" fullWidth>
                      Discover new recipes
                    </Button>
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
