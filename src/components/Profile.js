import React, { Component } from "react";
import { Link } from "@reach/router";
import { FiPlusCircle } from "react-icons/fi";
import SyncLoader from "react-spinners/SyncLoader";
import ClipLoader from "react-spinners/ClipLoader";
import firebase from "./../firebase/config";
import "firebase/firestore";

import CollectionPreview from "./CollectionPreview";
import RecipeCard from "./RecipeCard";

var db = firebase.firestore();

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, user: null, error: null, recipes: [] };
  }
  async componentDidMount() {
    try {
      this.setState({ loading: true });
      const userData = await db
        .collection("Users")
        .doc(this.props.userId)
        .get();

      if (userData.exists) {
        this.setState({ user: userData.data(), loading: false });
      } else {
        this.setState({ error: "User doesn't exist ☹", loading: false });
      }
    } catch (err) {
      console.error("Error", err.message);
    }
    try {
      var recipeData = db.collection("Recipes");

      var query = await recipeData
        .where("user_id", "==", this.props.userId)
        .get();

      if (query.empty) {
        console.log("No matching documents.");
        return;
      }

      query.forEach(doc => {
        this.setState({ recipes: [...this.state.recipes, doc.data()] });
      });
    } catch (err) {
      console.error("error", err.message);
    }
  }

  render() {
    return (
      <>
        {/* In Zukunft sollte der Error vielleicht an eine 404 Komponente weitergeleitet werden */}
        {this.state.error && <h1>{this.state.error}</h1>}
        {!this.state.loading && this.state.user !== null ? (
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
                <div className="col-8 ml-auto">
                  <div className="row profileInformation mt-3">
                    <h1>{this.state.user.name}</h1>
                  </div>
                  <div className="row mt-2 mt-lg-5">
                    <div className="col-4 ml-auto">
                      <div className="row">
                        <p> {this.state.recipes.length}</p>
                      </div>
                      <div className="row">
                        <p>Rezepte</p>
                      </div>
                    </div>
                    <div className="col-4 ml-auto">
                      <div className="row">
                        <p># </p>
                      </div>
                      <div className="row">
                        <p>Follower</p>
                      </div>
                    </div>
                    <div className="col-4 ml-auto">
                      <div className="row">
                        <p># </p>
                      </div>
                      <div className="row">
                        <p>Ich folge</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h4 className="mt-5 mb-2">Deine Sammlungen</h4>
              <p>
                <Link to="/add-recipe" className="nav-link addButton">
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
                {!this.state.loading && this.state.recipes.length > 0 ? (
                  this.state.recipes.map((recipe, index) => (
                    <RecipeCard
                      index={index}
                      id={recipe.uid}
                      key={recipe.uid}
                      title={recipe.title}
                      flags={recipe.flags}
                      name={recipe.user_name}
                      duration={recipe.duration}
                      imageUrl={recipe.imageUrl}
                      difficulty={recipe.difficulty}
                      description={recipe.description}
                    />
                  ))
                ) : (
                  <div>
                    <ClipLoader
                      css={`
                        display: block;
                        margin: 0 auto;
                      `}
                      size={150}
                      color={"#333"}
                      loading={this.state.loading}
                    />
                  </div>
                )}
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
