import { Link } from "@reach/router";
import React, { Component } from "react";
import { FirestoreCollection } from "@react-firebase/firestore";
// import firebase from "./../firebase/config";

// const db = firebase.firestore();
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
  render() {
    return (
      <>
        <h1>Home</h1>
        <Link to="/recipes">Recipes</Link>
        <FirestoreCollection path="/Users/">
          {d => {
            return d.isLoading ? (
              "Loading"
            ) : (
              <ul>
                {d.value.map((user, index) => (
                  <li key={index}>{user.name}</li>
                ))}
              </ul>
            );
          }}
        </FirestoreCollection>
      </>
    );
  }
}

export default Home;
