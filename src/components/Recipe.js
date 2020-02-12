import React, { Component } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import firebase from "./../firebase/config";
import "firebase/firestore";
import { Link } from "@reach/router";
import Checkbox from "@material-ui/core/Checkbox";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";

var db = firebase.firestore();

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: null,
      loading: false,
      error: null,
      liked: false,
      likes: 0,
      likedUserIds: [],
      likedRecipes: []
    };
  }
  async componentDidMount() {
    try {
      this.setState({ loading: true });
      const recipe = await db
        .collection("Recipes")
        .doc(this.props.recipeId)
        .get();
      if (recipe.exists) {
        this.setState({ recipe: recipe.data(), loading: false });
      } else {
        this.setState({ error: "Recipe doesn't exist", loading: false });
      }
    } catch (err) {
      this.setState({ loading: false });
      console.error("Error", err.message);
    }
  }

  handleLike = async () => {
    try {
      const likedRecipes = await db
        .collection("Users")
        .doc(this.props.user.userID)
        .get();
      if (likedRecipes.exists) {
        this.setState({ likedRecipes: [...this.state.likedRecipes, likedRecipes.data()] });
      } else {
        this.setState({ error: "User not found", loading: false });
        return;
      }
      if (!this.state.likedRecipes.includes(this.props.recipeId)) {
        this.setState({ likedRecipes: [...this.state.likedRecipes, this.props.recipeId] });
        // likedRecipes auf Datenbank aktualisieren
        // this.props.user.userID der this.state.likedUserIds hinzufügen (MUss das ein array sein??)
        // likedUserIds auf Recipes-Collection in der Datenbank aktualisieren
      } else {
        this.setState({
          likedRecipes: this.state.likedRecipes.filter(recipeId => recipeId !== this.props.recipeId)
        });
      }
    } catch (err) {
      console.error("Error", err.message);
    }
  };
  render() {
    return (
      <>
        {!this.state.loading && this.state.recipe !== null ? (
          <>
            <div
              className="hero-image"
              style={{ backgroundImage: `url(${this.state.recipe.imageUrl})` }}
            ></div>
            <div className="container recipe-outline hero-content">
              <div className="row intro">
                <div className="col-12">
                  <h1 className="recipe-title">{this.state.recipe.title}</h1>
                </div>
                <div className="col-12">
                  <p className="description">{this.state.recipe.description}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <p>
                    by{" "}
                    <Link to={`/profile/${this.state.recipe.user_id}`}>
                      {this.state.recipe.user_name}
                    </Link>
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-12">
                  <h2>
                    <span className="underline--magical">Ingredients</span>
                  </h2>
                  <ul className="list">
                    {this.state.recipe.ingredients.map((ingredient, idx) => (
                      <li key={idx}>
                        {ingredient.amount === 0 ? " " : ingredient.amount} {ingredient.unit}
                        {"   "}
                        {ingredient.ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-md-6 col-12">
                  <h2>
                    <span className="underline--magical">Details</span>
                  </h2>
                  <div>
                    <span className="mr-1 list" style={{ fontWeight: "600" }}>
                      Duration:
                    </span>
                    {this.state.recipe.duration > 1 ? (
                      <span>{this.state.recipe.duration} minutes</span>
                    ) : (
                      <p>{this.state.recipe.duration} minute</p>
                    )}
                  </div>
                  <div>
                    <span className="mr-1 list" style={{ fontWeight: "600" }}>
                      Difficulty:
                    </span>
                    {this.state.recipe.difficulty}
                  </div>
                  <div>
                    {this.state.recipe.flags.length > 0 ? (
                      <p>
                        This recipe is:
                        <span className="ml-2">
                          {this.state.recipe.flags.map((flag, idx) => (
                            <span key={idx} className="flag">
                              {flag}
                            </span>
                          ))}
                        </span>
                      </p>
                    ) : (
                      <p>This recipe has no labels</p>
                    )}
                  </div>
                  <div>
                    Do you like this recipe? Give it a &nbsp;
                    <span className="likeButton">
                      {
                        <Checkbox
                          icon={<FavoriteBorder />}
                          checkedIcon={<Favorite />}
                          value="checked"
                          onClick={this.handleLike}
                          className="mb-1"
                        />
                      }
                      <span>{this.state.likes}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <h2>
                    <span className="underline--magical">Preparation</span>
                  </h2>
                  <ul className="list">
                    {this.state.recipe.steps.map((step, idx) => (
                      <li key={idx} className="mb-4">
                        <h3 className="steps">Step {idx + 1}</h3>
                        {step.step}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="item">
                    <div className="polaroid">
                      <img src={this.state.recipe.imageUrl} alt="img" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <SyncLoader size={15} color={"#333"} loading={this.state.loading} />
        )}
      </>
    );
  }
}

export default Recipe;
