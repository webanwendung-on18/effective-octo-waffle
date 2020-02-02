import React, { Component } from "react";
import { Link } from "@reach/router";
import { FiChevronsRight } from "react-icons/fi";

class RecipePreview extends Component {
  render() {
    return (
      <>
        <div className="col-xs-12 col-md-6 col-lg-4">
          <div className="card mb-3" style={{ maxWidth: 540 }}>
            <div className="row no-gutters">
              <div className="col-md-4">
                <svg
                  className="bd-placeholder-img"
                  width="100%"
                  height="250"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Placeholder: Image"
                  preserveAspectRatio="xMidYMid slice"
                  role="img"
                >
                  <title>Placeholder</title>
                  <rect width="100%" height="100%" fill="#868e96" />
                  <text x="50%" y="50%" fill="#dee2e6" dy=".3em">
                    Image
                  </text>
                </svg>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    It's a broader card with text below as a natural lead-in to
                    extra content. This content is a little longer.
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      Last updated 3 mins ago
                    </small>
                  </p>
                  <Link
                    to="#!"
                    className="black-text d-flex justify-content-end"
                  >
                    <h5>Read more</h5>
                    <FiChevronsRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default RecipePreview;
