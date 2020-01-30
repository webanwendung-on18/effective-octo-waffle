import React, { Component } from "react";
import RecipeCard from "./RecipeCard";
import firebase from "./../firebase/config";
import "firebase/firestore";

var db = firebase.firestore();

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = { recipes: [] };
  }

  getAllRecipes = async () => {
    const snapshot = await db.collection("Recipes").get();
    const allRecipes = [];
    snapshot.forEach(doc => (allRecipes[doc.id] = doc.data()));
    this.setState({ recipes: allRecipes });
    console.log(allRecipes);
    return this.state.recipes;
  };

  async componentDidMount() {
    const allrecipes = await this.getAllRecipes();
  }

  render() {
    return (
      <>
        <h1>Feed</h1>
        {this.state.recipes.map(recipe => {
          return <p>{recipe.id}</p>;
        })}
        <RecipeCard />
        <RecipeCard />
      </>
    );
  }
}

export default Feed;
