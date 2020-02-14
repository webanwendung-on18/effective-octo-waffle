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
            <div className="row">
              <Typography variant="h6" gutterBottom className="align-center">
                Profile Settings
              </Typography>
            </div>

            {/* Edit Profile Picture */}
            <div className="row">
              <div className="col-4 col-md-3 ml-0 mt-4">
                <img
                  src="https://cdn-images-1.medium.com/max/1600/1*zm5NLjdhGd3VVTA2u-xEPg.gif"
                  alt=""
                  className="img img-fluid rounded profilePicture shadow"
                />
                <Button
                  variant="contained"
                  component="label"
                  onChange={this.handleUpload}
                  color={this.state.progress === 100 ? "primary" : "default"}
                  style={{ fontSize: "12px", width: "100%" }}
                >
                  {this.state.progress === 100 ? "Sucess!" : "Change Picture"}
                  <input type="file" style={{ display: "none" }} accept="image/*" />
                </Button>
                {this.state.progress !== 0 && (
                  <Grid item xs={12}>
                    <LinearProgress variant="determinate" value={this.state.progress} />
                  </Grid>
                )}
              </div>

              <div className="col-8 ml-0 mt-4">
                <TextField label="Username" defaultValue="Natascha" />
                <TextField label="Email" defaultValue="forsternatascha@gmail.com" />
              </div>
            </div>
            <Typography variant="h6">Change Password</Typography>
            <div className="row">
              <div className="col-12 ml-0 mt-4">
                <TextField
                  id="standard-password-input"
                  label="Old Password"
                  type="password"
                  autoComplete="current-password"
                />
              </div>
              <div className="col-12 ml-0 mt-4">
                <TextField
                  id="standard-password-input"
                  label="New Password"
                  type="password"
                  autoComplete="current-password"
                />
              </div>
              <div className="col-12 ml-0 mt-4">
                <TextField
                  id="standard-password-input"
                  label="Repeat New Password"
                  type="password"
                  autoComplete="current-password"
                />
              </div>
            </div>

            <div className="row ml-auto">
              <Button
                variant="contained"
                color="primary"
                onClick={e => this.handleNewRecipeSubmit(e)}
                className="mt-4 ml-auto"
              >
                {"Save Changes"}
              </Button>
            </div>
          </Paper>
        </main>
      </>
    );
  }
}

export default ProfileSettings;
