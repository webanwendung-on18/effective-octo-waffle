import React, { Component } from "react";
import "./App.css";
import { Router, navigate } from "@reach/router";
import firebase from "./firebase/config";
import "firebase/auth";

import Navbar from "./components/Navbar";
import Feed from "../src/components/Feed";
import Recipe from "../src/components/Recipe";
import Home from "../src/components/Home";
import Profile from "../src/components/Profile";
import Login from "../src/components/Login";
import Register from "../src/components/Register";
import HTTP_404 from "./components/HTTP_404";
import RecipeForm from "./components/RecipeForm";
import { Helmet } from "react-helmet";
import Favicon from "react-favicon";
import logo from "./images/Octo_Waffle_logo.svg";

var db = firebase.firestore();

let UserContext = React.createContext();

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
      })
        .then(() => {
          this.setState({
            user: FBUser,
            userName: FBUser.displayName,
            userID: FBUser.uid
          });
        })
        .then(() => {
          db.collection("Users")
            .doc(FBUser.uid)
            .set({
              name: FBUser.displayName,
              userId: FBUser.uid
            })
            .then(() => console.log("User logged in"))
            .catch(err => {
              console.log(`Error adding document: ${err}`);
            });
          navigate("/recipes");
        })
        .catch(err => console.error("Error", err));
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
        <Favicon url={logo} />
        <Helmet>
          <title>Octo Waffle</title>
        </Helmet>
        <Navbar user={this.state.user} logOutUser={this.logOutUser} />
        <UserContext.Provider value={this.state}>
          <Router>
            <Home path="/" user={this.state.user} />
            <Login path="login" />
            <Register path="register" registerUser={this.registerUser} />
            <Feed path="recipes" />
            <Recipe path="recipes/:recipeId" />
            <PrivateRoute
              as={Profile}
              path="/profile/:userId"
              registeredUserId={this.state.userID}
            />
            <PrivateRoute as={RecipeForm} user={this.state.user} path="/add-recipe" />
            <HTTP_404 default />
          </Router>
        </UserContext.Provider>
      </>
    );
  }
}

class PrivateRoute extends Component {
  static contextType = UserContext;

  render() {
    let { as: Comp, ...props } = this.props;
    if (this.context.user) {
      return <Comp {...props} />;
    }
    return <HTTP_404 message="Please login first" />;
  }
}

export default App;
