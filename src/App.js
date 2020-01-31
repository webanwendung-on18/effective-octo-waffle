import React from "react";
import "./App.css";
import { Router } from "@reach/router";

import Feed from "../src/components/Feed";
import Home from "../src/components/Home";
import Form from "../src/components/Form";
import DatabaseTests from "../src/components/DatabaseTests";

function App() {
  return (
    <>
      <Router>
        <Home path="/" />
        {/* <Login path="/login" />
        <Register path="/register" /> */}
        <Feed path="/recipes" />
        {/* <Recipe path="/recipes/:recipeId" />
        <Profile path="/profile/:userId" /> */}
        <Form path="/add-recipe" />
        <DatabaseTests path="/database-tests" />
      </Router>
    </>
  );
}

export default App;
