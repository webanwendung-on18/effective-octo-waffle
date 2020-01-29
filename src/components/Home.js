import { Link } from "@reach/router";
import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <>
        <h1>Home</h1>
        <Link to="/recipes">Recipes</Link>
      </>
    );
  }
}

export default Home;
