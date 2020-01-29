import React, { Component } from "react";
import { Link } from "@reach/router";

class RecipePreview extends Component {
  render() {
    return (
      <>
        <div className="col-xs-12 col-md-6 col-lg-4">
          <div class="card mb-3" style={{ maxWidth: 540 }}>
            <div class="row no-gutters">
              <div class="col-md-4">
                <svg
                  class="bd-placeholder-img"
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
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">
                    It's a broader card with text below as a natural lead-in to
                    extra content. This content is a little longer.
                  </p>
                  <p class="card-text">
                    <small class="text-muted">Last updated 3 mins ago</small>
                  </p>
                  <a
                    href="#!"
                    className="black-text d-flex justify-content-end"
                  >
                    <h5>
                      Read more <i className="fas fa-angle-double-right"></i>
                    </h5>
                  </a>
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
