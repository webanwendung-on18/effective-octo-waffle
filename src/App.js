import React from "react";
import "./App.css";
import { Router } from "@reach/router";

import Feed from "../src/components/Feed";
import Home from "../src/components/Home";
import Form from "../src/components/Form";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Home path="/" />
        {/* <Login path="/login" />
        <Register path="/register" /> */}
        <Feed path="/recipes" />
        {/* <Recipe path="/recipes/:recipeId" />
        <Profile path="/profile/:userId" /> */}
        <Form path="/add-recipe" />
      </Router>
    </>
  );
}

export default App;
