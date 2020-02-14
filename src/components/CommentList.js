import React, { Component } from "react";
import Comment from "./Comment";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import firebase from "./../firebase/config";
import "firebase/firestore";
import { Grid, TextField, Button } from "@material-ui/core";
var db = firebase.firestore();

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = { comments: [], loading: false, comment: "", snackbarOpen: false };
    this.handleNewComment = this.handleNewComment.bind(this);
  }
  async componentDidMount() {
    try {
      this.setState({ loading: true });
      db.collection(`Recipes/${this.props.recipeId}/Comments`).onSnapshot(snapshot => {
        let comments = [];
        snapshot.forEach(doc => comments.push({ ...doc.data(), id: doc.id }));
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

  handleNewComment = e => {
    e.preventDefault();
    console.log("sdafasf");
    const { comment } = this.state;
    const { user } = this.props;
    if (this.state.comment === "") {
      this.setState({ snackbarOpen: true });
      return;
    }

    db.collection(`Recipes/${this.props.recipeId}/Comments`)
      .add({
        comment,
        user_id: user.uid,
        user_name: user.displayName
      })
      .catch(err => {
        console.log(`Error adding document: ${err}`);
      });
    return;
  };

  handleChange = e => {
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => console.log(this.state)
    );
  };
  render() {
    return (
      <>
        <Snackbar open={this.state.snackbarOpen} autoHideDuration={6000} onClose={this.handleClose}>
          <MuiAlert elevation={6} variant="filled" onClose={this.handleClose} severity="error">
            Some required fields are empty
          </MuiAlert>
        </Snackbar>
        <Grid container>
          <Grid item xs={12} md={8}>
            {this.state.comments.length > 0 &&
              this.state.comments.map((comment, idx) => {
                console.log("comment", comment);
                return (
                  <Comment
                    key={idx}
                    date={comment.date}
                    message={comment.message}
                    messageId={comment.id}
                    username={comment.user_name}
                    profileImage={comment.profileImageUrl}
                  />
                );
              })}
          </Grid>
          <Grid item xs={12} className="mt-4">
            <form onChange={this.handleChange} className="d-flex align-items-baseline">
              <Grid item xs={10} md={7} className="align-self-end">
                <TextField
                  fullWidth
                  required
                  label="Leave a comment"
                  name="comment"
                  multiline
                  rowsMax="3"
                  value={this.state.comment}
                />
              </Grid>
              <Grid item xs={2} className="d-flex ">
                <Button
                  onClick={this.handleNewComment}
                  variant="contained"
                  color="primary"
                  className="mt-4 ml-2 align-self-end"
                >
                  {"Submit"}
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
        {/* <div className="col-10"> */}

        {/* </div> */}
      </>
    );
  }
}

export default CommentList;
