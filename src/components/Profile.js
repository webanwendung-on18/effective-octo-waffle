import React, { Component } from "react";
import { Link } from "@reach/router";
import { FiPlusCircle } from "react-icons/fi";
import SyncLoader from "react-spinners/SyncLoader";
import ClipLoader from "react-spinners/ClipLoader";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import firebase from "./../firebase/config";
import "firebase/storage";
import "firebase/firestore";

import RecipeCard from "./RecipeCard";
import HTTP_404 from "./HTTP_404";
import { Helmet } from "react-helmet";

const storage = firebase.storage();
var db = firebase.firestore();

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      snackbarOpen: false,
      progress: 0,
      image: null,
      imageUrl: "",
      profileUser: null,
      error: null,
      recipes: [],
      likedRecipes: [],
      likedRecipeIds: [],
      recipe: null,
      recipeIds: []
    };
  }
  async componentDidMount() {
    try {
      this.setState({ loading: true });
      const profileUser = await db
        .collection("Users")
        .doc(this.props.userId)
        .get();

      if (profileUser.exists) {
        this.setState({ profileUser: profileUser.data() });
      } else {
        this.setState({ error: "User doesn't exist", loading: false });
      }
    } catch (err) {
      console.error("Error", err.message);
    }
    try {
      var recipeData = db.collection("Recipes");

      var allOwnedRecipes = await recipeData.where("user_id", "==", this.props.userId).get();

      if (allOwnedRecipes.empty) {
        console.log("No recipes found owned by User");
        this.setState({ loading: false });
        return;
      }
      allOwnedRecipes.forEach(doc => {
        this.setState({
          recipes: [...this.state.recipes, doc.data()],
          recipeIds: [...this.state.recipeIds, doc.id]
        });
      });
    } catch (err) {
      console.error("error", err.message);
    }
    try {
      if (this.state.profileUser.likedRecipes.length === 0) {
        this.setState({ loading: false });
        return;
      }
      this.state.profileUser.likedRecipes.forEach(async likedRecipeId => {
        const recipeDoc = await db
          .collection("Recipes")
          .doc(likedRecipeId)
          .get();

        this.setState({
          likedRecipes: [...this.state.likedRecipes, recipeDoc.data()],
          likedRecipeIds: [...this.state.likedRecipeIds, likedRecipeId],
          loading: false
        });
      });
    } catch (err) {
      this.setState({ loading: false });
      console.error("error", err.message);
    }
  }

  handleUpload = e => {
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
              this.setState({ progress }, () => console.log(this.state.progress));
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
                  this.setState({ imageUrl }, () => {
                    db.collection("Users")
                      .doc(this.props.registeredUserId)
                      .update({ profileImageUrl: this.state.imageUrl });
                  });
                });
            }
          );
        }
      );
    }
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ snackbarOpen: false });
  };

  updateInfo = (nameAttr, name) => {
    console.log(`${name} updated`);

    if (e.target.innerText.length > 0) {
      db.collection("Users")
        .doc(this.props.registeredUserId)
        .update({ name });
    } else {
      this.setState({ snackbarOpen: true });
    }
  };

  render() {
    return (
      <>
        <Snackbar open={this.state.snackbarOpen} autoHideDuration={6000} onClose={this.handleClose}>
          <MuiAlert elevation={6} variant="filled" onClose={this.handleClose} severity="error">
            Your username can't be empty
          </MuiAlert>
        </Snackbar>
        {this.state.error && <HTTP_404 message={this.state.error} />}
        {!this.state.loading && this.state.profileUser !== null ? (
          <>
            <Helmet>
              <title>{this.state.profileUser.name} Profile | Octo Waffle</title>
            </Helmet>
            <div className="container">
              <div className="row">
                <div className="col-4 col-md-3 ml-0 mt-4">
                  <img
                    src={
                      this.state.imageUrl === ""
                        ? this.state.profileUser.profileImageUrl
                        : this.state.imageUrl
                    }
                    alt=""
                    className="img img-fluid rounded profilePicture shadow"
                  />

                  {this.props.registeredUserId === this.state.profileUser.userId ? (
                    <Button
                      variant="outlined"
                      component="label"
                      onChange={this.handleUpload}
                      color={this.state.progress === 100 ? "primary" : "default"}
                      style={{ fontSize: "12px", width: "100%" }}
                    >
                      {this.state.progress === 100 ? "Sucess!" : "Upload Image"}

                      <input type="file" style={{ display: "none" }} accept="image/*" />
                    </Button>
                  ) : null}
                  {this.state.progress !== 0 && (
                    <LinearProgress variant="determinate" value={this.state.progress} />
                  )}
                </div>

                <div className="col-8 ml-auto p0">
                  <div className="row profileInformation mt-3 p0">
                    <div className="col p-0">
                      {this.props.registeredUserId === this.state.profileUser.userId ? (
                        <h1
                          contentEditable
                          suppressContentEditableWarning
                          className="name"
                          onBlur={e => this.updateInfo("name", e.target.innerText)}
                        >
                          {this.state.profileUser.name}
                          <EditIcon className="ml-3" />
                        </h1>
                      ) : (
                        <h1>{this.state.profileUser.name}</h1>
                      )}
                    </div>
                    <div className="col">
                      {this.state.profileUser.userId !== this.props.registeredUserId ? (
                        <Button
                          style={{ fontSize: "12px", width: "100%" }}
                          variant="outlined"
                          className="btn btn-primary"
                          type="submit"
                        >
                          Follow
                        </Button>
                      ) : null}
                    </div>
                  </div>
                  <div className="row mt-2 mt-lg-5">
                    <div className="col-4 ml-auto">
                      <div className="row">
                        <p> {this.state.recipes.length}</p>
                      </div>
                      <div className="row">
                        <p>Recipes</p>
                      </div>
                    </div>
                    <div className="col-4 ml-auto">
                      <div className="row">
                        <p># </p>
                      </div>
                      <div className="row">
                        <p>Follower</p>
                      </div>
                    </div>
                    <div className="col-4 ml-auto">
                      <div className="row">
                        <p># </p>
                      </div>
                      <div className="row">
                        <p>Follows</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h4 className="mt-5 mb-2">Deine Rezepte</h4>
              {this.state.profileUser.userId === this.props.registeredUserId ? (
                <p className="px-0 mx-0">
                  <Link to="/add-recipe" className="nav-link addButton">
                    <FiPlusCircle className="addButton" /> Neues hinzufügen
                  </Link>
                </p>
              ) : null}
              <div className="row">
                {!this.state.loading && this.state.recipes.length > 0 ? (
                  this.state.recipes.map((recipe, index) => (
                    <div className="col-12 col-lg-6 mr-auto" key={index}>
                      <RecipeCard
                        index={index}
                        id={this.state.recipeIds[index]}
                        title={recipe.title}
                        flags={recipe.flags}
                        name={recipe.user_name}
                        duration={recipe.duration}
                        imageUrl={recipe.imageUrl}
                        difficulty={recipe.difficulty}
                        description={recipe.description}
                      />
                    </div>
                  ))
                ) : (
                  <div>
                    <ClipLoader
                      css={`
                        display: block;
                        margin: 0 auto;
                      `}
                      size={150}
                      color={"#333"}
                      loading={this.state.loading}
                    />
                  </div>
                )}
              </div>
              <h4 className="mt-5 mb-2">Deine Favoriten</h4>
              <div className="row">
                {!this.state.loading && this.state.likedRecipes.length > 0 ? (
                  this.state.likedRecipes.map((recipe, index) => (
                    <div className="col-12 col-lg-6 mr-auto" key={index}>
                      <RecipeCard
                        index={index}
                        id={this.state.likedRecipeIds[index]}
                        title={recipe.title}
                        flags={recipe.flags}
                        name={recipe.user_name}
                        duration={recipe.duration}
                        imageUrl={recipe.imageUrl}
                        difficulty={recipe.difficulty}
                        description={recipe.description}
                      />
                    </div>
                  ))
                ) : (
                  <div>
                    <ClipLoader
                      css={`
                        display: block;
                        margin: 0 auto;
                      `}
                      size={150}
                      color={"#333"}
                      loading={this.state.loading}
                    />
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center">
            <SyncLoader size={15} color={"#333"} loading={this.state.loading} />
          </div>
        )}
      </>
    );
  }
}

export default Profile;
