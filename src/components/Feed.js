import React, { Component } from "react";
import firebase from "./../firebase/config";
import "firebase/firestore";
import ClipLoader from "react-spinners/ClipLoader";
import RecipeCard from "./RecipeCard";
import { Helmet } from "react-helmet";

var db = firebase.firestore();

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = { recipes: [], loading: false };
  }

  getAllRecipes = async () => {
    const snapshot = await db.collection("Recipes").get();
    const allRecipes = [];
    snapshot.forEach(doc => (allRecipes[doc.id] = doc.data()));
    this.setState({ recipes: allRecipes });
  };

  componentDidMount() {
    this.setState({ loading: true });
    db.collection("Recipes").onSnapshot(snapshot => {
      let recipes = [];
      snapshot.forEach(doc => recipes.push({ ...doc.data(), uid: doc.id }));
      this.setState({
        recipes,
        loading: false
      });
    });
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Feed | Octo Waffle</title>
        </Helmet>
        <div className="container">
          <h1 className="headline-feed">
            <span className="underline--magical">Feed</span>
          </h1>

          {!this.state.loading && this.state.recipes.length > 0 ? (
            this.state.recipes.map((recipe, index) => (
              <div className="card-container" key={recipe.uid}>
                <RecipeCard
                  index={index}
                  id={recipe.uid}
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
      </>
    );
  }
}

export default Feed;
