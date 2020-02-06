import React, { Component } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import firebase from "./../firebase/config";
import "firebase/firestore";

var db = firebase.firestore();

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = { recipe: null, loading: false, error: null };
  }
  async componentDidMount() {
    try {
      this.setState({ loading: true });
      const recipe = await db
        .collection("Recipes")
        .doc(this.props.recipeId)
        .get();
      if (recipe.exists) {
        this.setState({ recipe: recipe.data(), loading: false }, () =>
          console.log(this.state.recipe)
        );
      } else {
        this.setState({ error: "Recipe doesn't exist ☹", loading: false });
      }
    } catch (err) {
      this.setState({ loading: false });
      console.error("Error", err.message);
    }
  }
  render() {
    let seen = [];
    // const {
    //   title,
    //   flags,
    //   steps,
    //   duration,
    //   serving,
    //   imageUrl,
    //   isPrivate,
    //   diffculty,
    //   ingredients,
    //   description
    // } = this.state;
    return (
      <>
        {!this.state.loading && this.state.recipe !== null ? (
          <>
            <h1>{this.state.recipe.title}</h1>
            <pre>
              {JSON.stringify(
                this.state.recipe,
                function(key, val) {
                  if (val != null && typeof val == "object") {
                    if (seen.indexOf(val) >= 0) {
                      return;
                    }
                    seen.push(val);
                  }
                  return val;
                },
                2
              )}
            </pre>
          </>
        ) : (
          <SyncLoader size={15} color={"#333"} loading={this.state.loading} />
        )}
      </>
    );
  }
}

export default Recipe;
