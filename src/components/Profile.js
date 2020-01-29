import React, { Component } from "react";
import { Link } from "@reach/router";

import CollectionPreview from "./CollectionPreview";
import RecipePreview from "./RecipePreview";

class Profile extends Component {
  render() {
    return (
      <>
        <div classNameName="container-fluid">
          <div className="row">
            <img
              src="https://coverfiles.alphacoders.com/460/46067.jpg"
              alt=""
              className="img img-fluid w-100 "
            />
          </div>
          <div className="row justify-content-center">
            <div className="col-4 col-md-3 ml-4">
              <img
                src="https://cdn-images-1.medium.com/max/1600/1*zm5NLjdhGd3VVTA2u-xEPg.gif"
                alt=""
                className="img img-fluid rounded-circle profilePicture"
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <h4>Name</h4>
          </div>
          <div className="row">
            <div className="col-7 ml-auto">
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
