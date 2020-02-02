import { Link } from "@reach/router";
import React, { Component } from "react";

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
      <div id="http_404">
        <header id="http_404-content">
          <div className="text-center text-light">
            <h1 className="h1">There's nothing here!</h1>
            <p className="lead mb-5">
              Whatever you were looking for doesn't currently exist at this
              address. Unless you were looking for this error page, in which
              case: Congrats! You totally found it.
            </p>
            <div className="d-flex justify-content-center">
              <div className="w-75">
                <Link className="btn btn-primary btn-block mb-3" to="/">
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
    );
  }
}

export default HTTP_404;
