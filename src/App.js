import React from "react";
import "./App.css";
import { Router } from "@reach/router";

import Feed from "../src/components/Feed";
import Home from "../src/components/Home";

function App() {
  return (
    <div className="container">
      <Router>
        <Home path="/" />
        {/* <Login path="/login" />
      <Register path="/register" /> */}
        <Feed path="/recipes" />
        {/* <Recipe path="/recipes/:recipeId" />
      <Profile path="/profile/:userId" />
      <Form path="/add-recipe" /> */}
      </Router>
    </div>
  );
}

export default App;
