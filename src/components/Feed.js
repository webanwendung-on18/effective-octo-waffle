import React, { Component } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Helmet } from "react-helmet";
import Hits from "./Hits";

import firebase from "./../firebase/config";
import "firebase/firestore";
var db = firebase.firestore();

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = { recipes: [], loading: false, refresh: false };
  }

  componentDidMount() {
    this.setState({ loading: true });
    db.collection("Recipes").onSnapshot((snapshot) => {
      let recipes = [];
      snapshot.forEach((doc) => recipes.push({ ...doc.data(), uid: doc.id }));
      console.log("recipes", recipes);
      this.setState(
        {
          recipes,
          loading: false,
          refresh: true,
        },
        () => this.setState({ refresh: false })
      );
    });
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Feed | Octo Waffle</title>
        </Helmet>
        {!this.state.loading ? (
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-7 col-lg-1"></div>
              <div className="col-md-10 col-lg-6 mt-3 nounderline maxcard">
                <h1 className="headline-feed my-4">
                  <span className="underline--magical">Feed</span>
                </h1>
                <div className="mt-5">
                  <Hits recipes={this.state.recipes} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <ClipLoader
              css={`
                display: block;
                position: fixed;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
              `}
              size={150}
              color={"#333"}
              loading={this.state.loading}
            />
          </div>
        )}
      </>
    );
  }
}

export default Feed;
