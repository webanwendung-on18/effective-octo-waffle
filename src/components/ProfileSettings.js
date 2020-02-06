import React, { Component } from "react";
import { Link } from "@reach/router";
import firebase from "./../firebase/config";
import "firebase/firestore";

var db = firebase.firestore();

class ProfileSettings extends Component {
  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-4 col-md-3 ml-0 mt-4">
              <img
                src="https://cdn-images-1.medium.com/max/1600/1*zm5NLjdhGd3VVTA2u-xEPg.gif"
                alt=""
                className="img img-fluid rounded profilePicture shadow"
              />
            </div>
            <div className="col"></div>
          </div>
        </div>
      </>
    );
  }
}

export default ProfileSettings;
