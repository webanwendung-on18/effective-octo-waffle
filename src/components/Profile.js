import React, { Component } from "react";
import { Link } from "@reach/router";

class Profile extends Component {
  render() {
    return (
      <>
        <h1>Profile</h1>
        <Link to="/">Home</Link>

        <div classNameName="container-fluid">
          <div className="row">
            <div className="col-4 col-md-3 ml-4">
              <img
                src="https://cdn-images-1.medium.com/max/1600/1*zm5NLjdhGd3VVTA2u-xEPg.gif"
                alt=""
                className="img img-fluid"
              />
            </div>
            <div className="col-7 ml-auto">
              <h4>Name</h4>
              <p>
                # Rezepte hinzugefügt
                <br />
                # Follower
                <br /># Ich folge
              </p>
            </div>
          </div>

          <h4 className="mt-5">Deine Sammlungen</h4>
          <div class="row mt-5 ml-auto">
            <div
              class="col-sm-6 col-md-4 col-lg-3 mb-5
            "
            >
              <div class="card">
                <div class="view overlay">
                  <img
                    class="card-img-top"
                    src="https://mdbootstrap.com/img/Photos/Others/food.jpg"
                    alt="Card cap"
                  ></img>
                </div>
                <a
                  class="btn-floating btn-action ml-auto mr-4 mdb-color lighten-3"
                  href="/"
                >
                  <i class="fas fa-chevron-right pl-1"></i>
                </a>
                <div class="card-body">
                  <h4 class="card-title">Card title</h4>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
                <a href="#!" class="black-text d-flex justify-content-end">
                  <h5>
                    Read more <i class="fas fa-angle-double-right"></i>
                  </h5>
                </a>
              </div>
            </div>

            <div
              class="col-sm-6 col-md-4 col-lg-3 mb-5
            "
            >
              <div class="card">
                <div class="view overlay">
                  <img
                    class="card-img-top"
                    src="https://mdbootstrap.com/img/Photos/Others/food.jpg"
                    alt="Card cap"
                  ></img>
                </div>
                <a
                  class="btn-floating btn-action ml-auto mr-4 mdb-color lighten-3"
                  href="/"
                >
                  <i class="fas fa-chevron-right pl-1"></i>
                </a>
                <div class="card-body">
                  <h4 class="card-title">Card title</h4>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
                <a href="#!" class="black-text d-flex justify-content-end">
                  <h5>
                    Read more <i class="fas fa-angle-double-right"></i>
                  </h5>
                </a>
              </div>
            </div>

            <div
              class="col-sm-6 col-md-4 col-lg-3 mb-5
            "
            >
              <div class="card">
                <div class="view overlay">
                  <img
                    class="card-img-top"
                    src="https://mdbootstrap.com/img/Photos/Others/food.jpg"
                    alt="Card cap"
                  ></img>
                </div>
                <a
                  class="btn-floating btn-action ml-auto mr-4 mdb-color lighten-3"
                  href="/"
                >
                  <i class="fas fa-chevron-right pl-1"></i>
                </a>
                <div class="card-body">
                  <h4 class="card-title">Card title</h4>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
                <a href="#!" class="black-text d-flex justify-content-end">
                  <h5>
                    Read more <i class="fas fa-angle-double-right"></i>
                  </h5>
                </a>
              </div>
            </div>

            <div
              class="col-sm-6 col-md-4 col-lg-3 mb-5
            "
            >
              <div class="card">
                <div class="view overlay">
                  <img
                    class="card-img-top"
                    src="https://mdbootstrap.com/img/Photos/Others/food.jpg"
                    alt="Card cap"
                  ></img>
                </div>
                <a
                  class="btn-floating btn-action ml-auto mr-4 mdb-color lighten-3"
                  href="/"
                >
                  <i class="fas fa-chevron-right pl-1"></i>
                </a>
                <div class="card-body">
                  <h4 class="card-title">Card title</h4>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
                <a href="#!" class="black-text d-flex justify-content-end">
                  <h5>
                    Read more <i class="fas fa-angle-double-right"></i>
                  </h5>
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Profile;
