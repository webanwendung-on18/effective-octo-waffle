import React, { Component } from "react";
import { Link } from "@reach/router";

class CollectionPreview extends Component {
  render() {
    return (
      <div
        className="col-sm-6 col-md-4 col-lg-3 mb-5
            "
      >
        <div className="card">
          <div className="view overlay">
            <img
              className="card-img-top"
              src="https://mdbootstrap.com/img/Photos/Others/food.jpg"
              alt="Card cap"
            ></img>
          </div>
          <a
            className="btn-floating btn-action ml-auto mr-4 mdb-color lighten-3"
            href="/"
          >
            <i className="fas fa-chevron-right pl-1"></i>
          </a>
          <div className="card-body">
            <h4 className="card-title">Card title</h4>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
          <a href="#!" className="black-text d-flex justify-content-end">
            <h5>
              Read more <i className="fas fa-angle-double-right"></i>
            </h5>
          </a>
        </div>
      </div>
    );
  }
}

export default CollectionPreview;
