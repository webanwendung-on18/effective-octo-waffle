import { Link } from "@reach/router";
import React, { Component } from "react";
import firebase from "./../firebase/config";
import "firebase/firestore";

var db = firebase.firestore();

// let userRef = db.collection("Users").doc("gWIgDT2As3jguTdJ7rAi");
// userRef
//   .get()
//   .then(function(doc) {
//     if (doc.exists) {
//       console.log("Document data:", doc.data());
//     } else {
//       // doc.data() will be undefined in this case
//       console.log("No such document!");
//     }
//   })
//   .catch(function(error) {
//     console.log("Error getting document:", error);
//   });

class Home extends Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick = e => {
    db.collection("Users")
      .add({ name: "Felix", email: "felix@felix.com" })
      .then(docRef => {
        console.log(`Document written with ID: ${docRef.id}`);
      })
      .catch(err => {
        console.log(`Error adding document: ${err}`);
      });
  };
  render() {
    return (
      <>
        <h1>Home</h1>
        <Link to="/recipes">Recipes</Link>
        <button onClick={this.handleClick}>Click me</button>
      </>
    );
  }
}

export default Home;
