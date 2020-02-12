import React, { Component } from "react";
import Comment from "./Comment";

import firebase from "./../firebase/config";
import "firebase/firestore";
var db = firebase.firestore();

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = { comments: [], loading: false };
  }
  async componentDidMount() {
    try {
      this.setState({ loading: true });
      db.collection(`Recipes/${this.props.recipeId}/Comments`).onSnapshot(snapshot => {
        let comments = [];
        snapshot.forEach(doc => comments.push({ ...doc.data(), id: doc.id }));
        console.log("fdsaasdfas", comments);
        if (comments.length > 0) {
          this.setState({ comments, loading: false });
        } else {
          this.setState({ error: "No Comments Found", loading: false });
        }
      });
    } catch (err) {
      console.error("Error", err.message);
    }
  }

  render() {
    return (
      <div className="col-10 col-md-8">
        <div className="offset-1">
          <ul className="list-group" id="messages">
            {this.state.comments.length > 0 &&
              this.state.comments.map((comment, idx) => {
                console.log("comment", comment);
                return (
                  <Comment
                    key={idx}
                    date={comment.date}
                    message={comment.message}
                    messageId={comment.id}
                    username={"hey"}
                    profileImage={comment.profileImageUrl}
                  />
                );
              })}
          </ul>
        </div>
      </div>
    );
  }
}

export default CommentList;
