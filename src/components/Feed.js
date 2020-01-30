import React, { Component } from "react";
import { Link } from "@reach/router";
import RecipeCard from "./RecipeCard";

class Feed extends Component {
  render() {
    return (
      <>
        <h1>Feed</h1>
        <RecipeCard />
      </>
    );
  }
}

export default Feed;
