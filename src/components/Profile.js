import React, { Component } from "react";
import { Link } from "@reach/router";
import { FiPlusCircle } from "react-icons/fi";
import SyncLoader from "react-spinners/SyncLoader";
import firebase from "./../firebase/config";
import "firebase/firestore";

import CollectionPreview from "./CollectionPreview";
import RecipePreview from "./RecipePreview";

var db = firebase.firestore();

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, user: null, error: null };
  }
  async componentDidMount() {
    try {
      this.setState({ loading: true });
      const userData = await db
        .collection("Users")
        .doc(this.props.userId)
        .get();
      if (userData.exists) {
        this.setState({ user: userData.data(), loading: false }, () =>
          console.log("why", this.state)
        );
      } else {
        this.setState({ error: "User doesn't exist ☹", loading: false });
      }
    } catch (err) {
      console.error("Error", err.message);
    }
  }

  render() {
    return (
      <>
        {/* In Zukunft sollte der Error vielleicht an eine 404 Komponente weitergeleitet werden */}
        {this.state.error && <h1>{this.state.error}</h1>}
        {!this.state.loading && this.state.user !== null ? (
          <>
            <div className="row ">
              <img
                src="https://coverfiles.alphacoders.com/460/46067.jpg"
                alt=""
                className="img img-fluid w-100 headerImage"
              />
            </div>
            <div className="container">
              <div className="row">
                <div className="col-4 col-md-3 ml-4 shadow ">
                  <img
                    src="https://cdn-images-1.medium.com/max/1600/1*zm5NLjdhGd3VVTA2u-xEPg.gif"
                    alt=""
                    className="img img-fluid rounded profilePicture"
                  />
                </div>
              </div>
              <div className="row profileInformation mt-5">
                <div className="col-6 ml-auto">
                  <h4>{this.state.user.name}</h4>
                </div>
              </div>
              <div className="row">
                <div className="col-4 col-md-2 ml-auto">
                  <p># Rezepte hinzugefügt</p>
                </div>
                <div className="col-4 col-md-2 ml-sm-auto ml-md-0">
                  <p># Follower</p>
                </div>
                <div className="col-4 col-md-2 ml-sm-auto ml-md-0">
                  <p># Ich folge</p>
                </div>
              </div>

              <h4 className="mt-3 mb-2">Deine Sammlungen</h4>
              <p>
                <Link to="/" className="nav-link addButton">
                  <FiPlusCircle /> Neue hinzufügen
                </Link>
              </p>

              <div className="row">
                <CollectionPreview />
                <CollectionPreview />
                <CollectionPreview />
                <CollectionPreview />
              </div>

              <h4 className="mt-5 mb-2">Deine Rezepte</h4>
              <p className="px-0 mx-0">
                <Link to="/add-recipe" className="nav-link addButton">
                  <FiPlusCircle className="addButton" /> Neues hinzufügen
                </Link>
              </p>

              <div className="row">
                <RecipePreview />
                <RecipePreview />
                <RecipePreview />
                <RecipePreview />
              </div>
            </div>
          </>
        ) : (
          <div className="text-center">
            <SyncLoader size={15} color={"#333"} loading={this.state.loading} />
          </div>
        )}
      </>
    );
  }
}

export default Profile;
