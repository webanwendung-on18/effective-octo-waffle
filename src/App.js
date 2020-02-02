import React, { Component } from "react";
import "./App.css";
import { Router, navigate } from "@reach/router";
import firebase from "./firebase/config";
import "firebase/auth";

import Navbar from "./components/Navbar";
import Feed from "../src/components/Feed";
import Home from "../src/components/Home";
import Profile from "../src/components/Profile";
import Form from "../src/components/Form";
import Login from "../src/components/Login";
import Register from "../src/components/Register";
import DatabaseTests from "../src/components/DatabaseTests";

var db = firebase.firestore();

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      userName: null,
      userID: null
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(FBUser => {
      if (FBUser) {
        this.setState({
          user: FBUser,
          userName: FBUser.displayName,
          userID: FBUser.uid
        });
      } else {
        this.setState({ user: null });
      }
    });
  }

  registerUser = userName => {
    firebase.auth().onAuthStateChanged(FBUser => {
      FBUser.updateProfile({
        displayName: userName
      }).then(() => {
        this.setState(
          {
            user: FBUser,
            userName: FBUser.displayName,
            userID: FBUser.uid
          },
          () => {
            db.collection("Users")
              .doc(FBUser.uid)
              .set({
                name: this.state.user.displayName,
                userId: this.state.user.uid
              })
              .catch(err => {
                console.log(`Error adding document: ${err}`);
              });
          }
        );

        navigate("/recipes");
      });
    });
  };

  logOutUser = e => {
    e.preventDefault();
    this.setState({
      userName: null,
      userID: null,
      user: null
    });

    firebase
      .auth()
      .signOut()
      .then(() => {
        navigate("/login");
      });
  };

  render() {
    return (
      <>
        <Navbar user={this.state.user} logOutUser={this.logOutUser} />
        <Router>
          <Home path="/" user={this.state.user} />
          <Login path="/login" />
          <Register path="/register" registerUser={this.registerUser} />
          <Feed path="/recipes" />
          {/*<Recipe path="/recipes/:recipeId" />*/}
          <Profile path="/profile/:userId" />
          <Form user={this.state.user} path="/add-recipe" />
          <DatabaseTests path="/database-tests" />
        </Router>
      </>
    );
  }
}

export default App;
