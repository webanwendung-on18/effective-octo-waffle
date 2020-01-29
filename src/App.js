import React from "react";
import "./App.css";
import { Router } from "@reach/router";

import Feed from "../src/components/Feed";
import Home from "../src/components/Home";
import Form from "../src/components/Form";
import Navbar from "../src/components/Navbar";
import DatabaseTests from "../src/components/DatabaseTests";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
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
      </div>
    </>
  );
}

export default App;
