import React, { Component } from "react";
import { Link } from "@reach/router";

import CollectionPreview from "./CollectionPreview";
import RecipePreview from "./RecipePreview";

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

          <div className="row">
            <CollectionPreview />
            <CollectionPreview />
            <CollectionPreview />
            <CollectionPreview />
          </div>

          <h4 className="mt-5">Deine Rezepte</h4>

          <div className="row">
            <RecipePreview />
            <RecipePreview />
            <RecipePreview />
            <RecipePreview />
          </div>
        </div>
      </>
    );
  }
}

export default Profile;
