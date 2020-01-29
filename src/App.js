import React from "react";
import "./App.css";
import { Router } from "@reach/router";

import firebase from "firebase/app";
import "firebase/firestore";
import { FirestoreProvider } from "@react-firebase/firestore";

import { config } from "../src/firebase/config";

import Feed from "../src/components/Feed";
import Home from "../src/components/Home";
import Form from "../src/components/Form";
import Navbar from "../src/components/Navbar";

firebase.initializeApp(config);

function App() {
  return (
    <FirestoreProvider {...config} firebase={firebase}>
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
    </FirestoreProvider>
  );
}

export default App;
