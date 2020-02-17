import React, { Component } from "react";
import Comment from "./Comment";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import firebase from "./../firebase/config";
import "firebase/firestore";
import { Grid, TextField, Button, InputAdornment } from "@material-ui/core";
var db = firebase.firestore();

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = { comments: [], loading: false, comment: "", snackbarOpen: false, user: null };
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
      const registeredUser = await db
        .collection("Users")
        .doc(this.props.user.uid)
        .get();
      this.setState({ user: registeredUser.data() });
    } catch (err) {
      console.error("Error", err.message);
    }
  }

  handleNewComment = e => {
    e.preventDefault();
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
        user_name: user.displayName,
        profileImageUrl: this.state.user.profileImageUrl,
        date: new Date()
      })
      .catch(err => {
        console.log(`Error adding comment: ${err}`);
      });
    this.setState({ comment: "" });
    return;
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ snackbarOpen: false });
  };

  handleDelete = (e, commentId) => {
    e.preventDefault();
    db.collection(`Recipes/${this.props.recipeId}/Comments`)
      .doc(commentId)
      .delete()
      .catch(error => {
        console.error("Error removing comment: ", error);
      });
  };

  handleUpdate = (comment, commentId, handleClose) => {
    db.collection(`Recipes/${this.props.recipeId}/Comments`)
      .doc(commentId)
      .update({ comment })
      .catch(error => {
        console.error("Error updating comment: ", error);
      });
    handleClose();
  };

  render() {
    let sortedComments = [...this.state.comments];
    if (this.state.comments.length > 1) {
      sortedComments = [...this.state.comments].sort((a, b) => {
        return new Date(a.date.seconds) - new Date(b.date.seconds);
      });
    }
    return (
      <>
        <Snackbar open={this.state.snackbarOpen} autoHideDuration={6000} onClose={this.handleClose}>
          <MuiAlert elevation={6} variant="filled" onClose={this.handleClose} severity="error">
            Some required fields are empty
          </MuiAlert>
        </Snackbar>
        <Grid container justify="center">
          <Grid item xs={12} md={8}>
            {this.state.comments.length > 0 &&
              this.state.user !== null &&
              sortedComments.map((comment, idx) => {
                return (
                  <Comment
                    key={idx}
                    date={comment.date.seconds}
                    commentUserId={comment.user_id}
                    registeredUserId={this.state.user.userId}
                    message={comment.comment}
                    messageId={comment.id}
                    handleDelete={this.handleDelete}
                    handleUpdate={this.handleUpdate}
                    username={comment.user_name}
                    profileImage={comment.profileImageUrl}
                  />
                );
              })}
          </Grid>
          <Grid item xs={12} className="mt-4">
            <form
              onChange={this.handleChange}
              className="d-flex align-items-center justify-content-center"
            >
              <Grid item xs={12} md={8} className="align-items-center">
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Leave a comment"
                  name="comment"
                  multiline
                  rowsMax="3"
                  value={this.state.comment}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          onClick={this.handleNewComment}
                          variant="contained"
                          color="primary"
                          className=""
                        >
                          {"Submit"}
                        </Button>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              {/* <Grid item xs={2} className="d-flex align-self-center"></Grid> */}
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
