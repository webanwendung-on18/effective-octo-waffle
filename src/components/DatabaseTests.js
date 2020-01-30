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

class DatabaseTests extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", email: "", imageUrl: "", docRefId: "" };

    // This binding is necessary to make `this` work in the callback
    this.handleNewUserSubmit = this.handleNewUserSubmit.bind(this);
  }
  handleNewUserSubmit = e => {
    e.preventDefault();
    db.collection("Users")
      .add({
        name: this.state.name,
        email: this.state.email,
        imageUrl: this.state.imageUrl
      })
      .then(docRef => {
        this.setState({ docRefId: docRef.id });
        console.log("Document createt: ", docRef);
      })
      .catch(err => {
        console.log(`Error adding document: ${err}`);
      });
    this.getUsers();
  };
  getUsers = async () => {
    const snapshot = await db.collection("Users").get();
    const document = [];
    snapshot.forEach(doc => (document[doc.id] = doc.data()));
    console.log("docs", document);
  };
  render() {
    return (
      <>
        <h1>DatabaseTests</h1>
        <form
          onSubmit={e => this.handleNewUserSubmit(e)}
          className="align-items-center d-flex flex-column"
        >
          <div className="w-50">
            {this.state.docRefId && (
              <p
                style={{ padding: "5px", backgroundColor: "#00c853" }}
              >{`User with Id ${this.state.docRefId} was added.`}</p>
            )}
            <label>Name: </label>
            <input
              type="text"
              className="form-control mb-3"
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
              required
            />
            <label>Email: </label>
            <input
              type="text"
              className="form-control mb-3"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
              required
            />
            <label>imageUrl: </label>
            <input
              type="text"
              className="form-control mb-3"
              value={this.state.imageUrl}
              onChange={e => this.setState({ imageUrl: e.target.value })}
            />
            <button type="submit" className="btn btn-dark">
              Add User
            </button>
          </div>
        </form>
      </>
    );
  }
}

export default DatabaseTests;
