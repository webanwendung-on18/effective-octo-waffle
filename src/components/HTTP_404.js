import { Link } from "@reach/router";
import React, { Component } from "react";
import { Helmet } from "react-helmet";

class HTTP_404 extends Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    window.history.back();
  }

  render() {
    return (
      <>
        <Helmet>
          <title>
            404 - {this.props.message ? this.props.message : "There's nothing to see here"} | Octo
            Waffle
          </title>
        </Helmet>
        <div id="http_404" className="no-nav-space">
          <header id="http_404-content">
            <div className="text-center text-light">
              <h1 className="h1">
                404{" "}
                <span role="img" aria-label="emoji">
                  👀
                </span>
              </h1>
              <h2 className="h2">
                {this.props.message ? this.props.message : "There's nothing to see here"}
              </h2>
              <div className="d-flex justify-content-center">
                <div className="w-75">
                  <p className="lead mb-5 mt-2">
                    Whatever you were looking for doesn't currently exist at this address. Unless
                    you were looking for this error page, in which case: Congrats! You totally found
                    it.
                  </p>
                  <Link className="btn btn-primary btn-block mb-3" to="/recipes">
                    Home
                  </Link>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <div className="w-75">
                  <Link
                    className="btn btn-outline-light btn-block"
                    to="#"
                    onClick={() => this.handleClick()}
                  >
                    Go Back
                  </Link>
                </div>
              </div>
            </div>
          </header>
        </div>
      </>
    );
  }
}

export default HTTP_404;
