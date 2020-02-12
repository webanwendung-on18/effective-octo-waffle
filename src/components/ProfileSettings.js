import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";

import firebase from "./../firebase/config";
import "firebase/firestore";
import "firebase/storage";

const storage = firebase.storage();
var db = firebase.firestore();

class ProfileSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: "",
      image: null,
      progress: 0,
      user_name: "",
      user_id: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleUpload = e => {
    console.log("hier");
    if (e.target.files[0] && e.target.files[0] !== this.state.image) {
      const image = e.target.files[0];
      this.setState(
        () => ({ image }),
        () => {
          const { image } = this.state;
          const uploadTask = storage.ref(`profileImages/${image.name}`).put(image);
          uploadTask.on(
            "state_changed",
            snapshot => {
              const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              this.setState({ progress });
            },
            error => {
              console.log(error);
            },
            () => {
              storage
                .ref("profileImages")
                .child(image.name)
                .getDownloadURL()
                .then(imageUrl => {
                  this.setState({ imageUrl });
                });
            }
          );
        }
      );
    }
  };

  render() {
    return (
      <>
        <main className="formLayout">
          <Paper className="formPaper">
            <Typography component="h1" variant="h4" align="center"></Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={e => this.handleNewRecipeSubmit(e)}
              className="ml-2 mt-4"
            >
              {"Edit Profile"}
            </Button>
            {/* Image URL */}
            <Grid item xs={12} sm={7}>
              <TextField
                required
                id="imageUrl"
                name="imageUrl"
                value={this.state.progress === 100 ? this.state.image.name : this.state.imageUrl}
                disabled={this.state.progress === 100}
                label="Image URL"
                fullWidth
              />
            </Grid>
            <Grid item xs={2} className="d-flex align-self-end justify-content-center">
              <Typography variant="body1">OR</Typography>
            </Grid>
            <Grid item xs={5} sm={3} className="d-flex align-self-end justify-content-end">
              <Button
                variant="contained"
                component="label"
                onChange={this.handleUpload}
                color={this.state.progress === 100 ? "primary" : "default"}
                style={{ fontSize: "12px", width: "100%" }}
              >
                {this.state.progress === 100 ? "Sucess!" : "Upload Image"}

                <input type="file" style={{ display: "none" }} accept="image/*" />
              </Button>
            </Grid>
            {this.state.progress !== 0 && (
              <Grid item xs={12}>
                <LinearProgress variant="determinate" value={this.state.progress} />
              </Grid>
            )}
          </Paper>
        </main>
      </>
    );
  }
}

export default ProfileSettings;
