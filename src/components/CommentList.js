import React, { Component } from "react";
import CommentMui from "./CommentMui";

import firebase from "./../firebase/config";
import "firebase/firestore";
import { Grid, TextField } from "@material-ui/core";
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
      <div className="col-10">
        <ul className="list-group" id="messages">
          {this.state.comments.length > 0 &&
            this.state.comments.map((comment, idx) => {
              console.log("comment", comment);
              return (
                <CommentMui
                  key={idx}
                  date={comment.date}
                  message={comment.message}
                  messageId={comment.id}
                  username={comment.user_name}
                  profileImage={comment.profileImageUrl}
                />
              );
            })}
        </ul>
        <Grid item xs={10}>
          <TextField
            required
            label="Leave a comment"
            name="description"
            multiline
            rowsMax="3"
            value={this.props.description}
            fullWidth
          />
        </Grid>
      </div>
    );
  }
}

export default CommentList;
