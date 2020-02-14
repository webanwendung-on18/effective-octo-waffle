import React, { Component } from "react";
import { Link } from "@reach/router";
import { FiPlusCircle } from "react-icons/fi";
import SyncLoader from "react-spinners/SyncLoader";
import ClipLoader from "react-spinners/ClipLoader";
import firebase from "./../firebase/config";
import "firebase/firestore";

import CollectionPreview from "./CollectionPreview";
import RecipeCard from "./RecipeCard";
import HTTP_404 from "./HTTP_404";
import { Helmet } from "react-helmet";

var db = firebase.firestore();

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      profileUser: null,
      error: null,
      recipes: [],
      recipe: null,
      recipeIds: []
    };
  }
  async componentDidMount() {
    try {
      this.setState({ loading: true });
      const profileUser = await db
        .collection("Users")
        .doc(this.props.userId)
        .get();

      if (profileUser.exists) {
        this.setState({ profileUser: profileUser.data(), loading: false });
      } else {
        this.setState({ error: "User doesn't exist", loading: false });
      }
    } catch (err) {
      console.error("Error", err.message);
    }
    try {
      var recipeData = db.collection("Recipes");

      var query = await recipeData.where("user_id", "==", this.props.userId).get();

      if (query.empty) {
        console.log("No matching documents.");
        return;
      }

      query.forEach(doc => {
        this.setState({
          recipes: [...this.state.recipes, doc.data()],
          recipeIds: [...this.state.recipeIds, doc.id]
        });
      });
    } catch (err) {
      console.error("error", err.message);
    }
  }

  render() {
    return (
      <>
        {this.state.error && <HTTP_404 message={this.state.error} />}
        {!this.state.loading && this.state.profileUser !== null ? (
          <>
            <Helmet>
              <title>{this.state.user.name} Profile | Octo Waffle</title>
            </Helmet>
            <div className="container">
              <div className="row">
                <div className="col-4 col-md-3 ml-0 mt-4">
                  <img
                    src="https://cdn-images-1.medium.com/max/1600/1*zm5NLjdhGd3VVTA2u-xEPg.gif"
                    alt=""
                    className="img img-fluid rounded profilePicture shadow"
                  />
                </div>
                <div className="col-8 ml-auto p0">
                  <div className="row profileInformation mt-3 p0">
                    <div className="col p-0">
                      <h1>{this.state.profileUser.name}</h1>
                    </div>
                    <div className="col">
                      {this.state.profileUser.userId !== this.props.registeredUserId ? (
                        <button class="btn btn-primary" type="submit">
                          Follow
                        </button>
                      ) : (
                        <button className="btn btn-primary" type="submit">
                          Edit
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="row mt-2 mt-lg-5">
                    <div className="col-4 ml-auto">
                      <div className="row">
                        <p> {this.state.recipes.length}</p>
                      </div>
                      <div className="row">
                        <p>Recipes</p>
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
                        <p>Follows</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h4 className="mt-5 mb-2">Deine Sammlungen</h4>
              {this.state.profileUser.userId === this.props.registeredUserId ? (
                <p>
                  <Link to="/add-recipe" className="nav-link addButton">
                    <FiPlusCircle /> Neue hinzufügen
                  </Link>
                </p>
              ) : null}

              <div className="row">
                <CollectionPreview />
                <CollectionPreview />
                <CollectionPreview />
                <CollectionPreview />
              </div>

              <h4 className="mt-5 mb-2">Deine Rezepte</h4>
              {this.state.profileUser.userId === this.props.registeredUserId ? (
                <p className="px-0 mx-0">
                  <Link to="/add-recipe" className="nav-link addButton">
                    <FiPlusCircle className="addButton" /> Neues hinzufügen
                  </Link>
                </p>
              ) : null}

              <div className="row">
                {!this.state.loading && this.state.recipes.length > 0 ? (
                  this.state.recipes.map((recipe, index) => (
                    <div className="col-12 col-lg-6 mr-auto" key={index}>
                      <RecipeCard
                        index={index}
                        id={this.state.recipeIds[index]}
                        title={recipe.title}
                        flags={recipe.flags}
                        name={recipe.user_name}
                        duration={recipe.duration}
                        imageUrl={recipe.imageUrl}
                        difficulty={recipe.difficulty}
                        description={recipe.description}
                      />
                    </div>
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
