import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CreateRecipe from "./CreateRecipe";
import RecipeReview from "./RecipeReview";
import Snackbar from "@material-ui/core/Snackbar";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MuiAlert from "@material-ui/lab/Alert";
import { navigate } from "@reach/router";

import firebase from "./../firebase/config";
import "firebase/firestore";
var db = firebase.firestore();

const steps = ["Create Recipe", "Review your Recipe"];

export default class RecipeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      snackbarOpen: false,
      title: "",
      description: "",
      imageUrl: "",
      difficulty: 1,
      duration: 10,
      isPrivate: false,
      servings: "1",
      flags: [],
      ingredients: [{ ingredient: "", amount: 0, unit: "" }],
      steps: [{ step: "" }],
      user_name: "",
      user_id: ""
    };

    this.handleNewRecipeSubmit = this.handleNewRecipeSubmit.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.handleSlider = this.handleSlider.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addStep = this.addStep.bind(this);
  }

  getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <CreateRecipe
            addStep={this.addStep}
            handleChange={this.handleChange}
            handleSlider={this.handleSlider}
            addIngredient={this.addIngredient}
            handleCheckbox={this.handleCheckbox}
            title={this.state.title}
            flags={this.state.flags}
            steps={this.state.steps}
            user_name={this.state.user_name}
            difficulty={this.state.difficulty}
            description={this.state.description}
            ingredients={this.state.ingredients}
            imageUrl={this.state.imageUrl}
            duration={this.state.duration}
            servings={this.state.servings}
            isPrivate={this.state.isPrivate}
          />
        );
      case 1:
        return (
          <RecipeReview
            title={this.state.title}
            flags={this.state.flags}
            steps={this.state.steps}
            user_name={this.state.user_name}
            difficulty={this.state.difficulty}
            description={this.state.description}
            ingredients={this.state.ingredients}
            imageUrl={this.state.imageUrl}
            duration={this.state.duration}
            servings={this.state.servings}
            isPrivate={this.state.isPrivate}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  validate(title, description, imageUrl, ingredients, steps) {
    let validObj = {
      title: title.length === 0,
      description: description.length === 0,
      imageUrl: imageUrl.length === 0,
      ingredients: ingredients.some(ingredient => ingredient.ingredient.length === 0),
      steps: steps.some(step => step.step.length === 0)
    };
    return validObj;
  }

  canBeSubmitted() {
    const errors = this.validate(
      this.state.title,
      this.state.description,
      this.state.imageUrl,
      this.state.ingredients,
      this.state.steps
    );
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ snackbarOpen: false });
  };

  handleNewRecipeSubmit = e => {
    const {
      title,
      flags,
      steps,
      duration,
      servings,
      imageUrl,
      isPrivate,
      difficulty,
      ingredients,
      description
    } = this.state;
    const { user } = this.props;
    if (!this.canBeSubmitted()) {
      e.preventDefault();
      this.setState({ snackbarOpen: true });
      return;
    }
    if (this.state.activeStep === 1) {
      e.preventDefault();
      db.collection("Recipes")
        .add({
          title,
          flags,
          steps,
          duration,
          imageUrl,
          servings,
          isPrivate,
          difficulty,
          description,
          ingredients,
          user_id: user.uid,
          user_name: user.displayName
        })
        .then(docRef => {
          this.setState({ docRefId: docRef.id });
          navigate(`/recipes/${docRef.id}`);
        })
        .catch(err => {
          console.log(`Error adding document: ${err}`);
        });
      return;
    }
    this.setState({ activeStep: this.state.activeStep + 1 });
  };

  handleChange = e => {
    if (["step"].includes(e.target.dataset.fieldType)) {
      let steps = [...this.state.steps];
      steps[e.target.dataset.id][e.target.dataset.fieldType] = e.target.value;
      this.setState({ steps });
    }
    if (["amount", "unit", "ingredient"].includes(e.target.dataset.fieldType)) {
      let ingredients = [...this.state.ingredients];
      ingredients[e.target.dataset.id][e.target.dataset.fieldType] = e.target.value;
      this.setState({ ingredients });
    } else {
      this.setState({
        [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
      });
    }
  };

  handleCheckbox = e => {
    if (e.target.name === e.target.value && e.target.type === "checkbox") {
      var flagsArr = [...this.state.flags];
      var index = flagsArr.indexOf(e.target.value);
      if (index !== -1) {
        flagsArr.splice(index, 1);
        this.setState({ flags: flagsArr });
      } else {
        this.setState({ flags: [...this.state.flags, e.target.value] });
      }
    }
  };

  addStep = e => {
    this.setState(prevState => ({
      steps: [...prevState.steps, { step: "" }]
    }));
  };

  addIngredient = e => {
    this.setState(prevState => ({
      ingredients: [...prevState.ingredients, { ingredient: "", amount: 0, unit: "" }]
    }));
  };

  handleBack = () => {
    this.setState({ activeStep: this.state.activeStep - 1 });
  };

  handleSlider(event, value) {
    this.setState(() => {
      switch (value) {
        case 1:
          return { difficulty: "easy" };
        case 2:
          return { difficulty: "advanced" };
        case 3:
          return { difficulty: "difficult" };
        default:
          break;
      }
    });
  }

  render() {
    const { activeStep, snackbarOpen } = this.state;
    return (
      <>
        <CssBaseline />
        <main className="formLayout">
          <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={this.handleClose}>
            <MuiAlert elevation={6} variant="filled" onClose={this.handleClose} severity="error">
              Some required fields are empty
            </MuiAlert>
          </Snackbar>
          <Paper className="formPaper">
            <Typography component="h1" variant="h4" align="center">
              {activeStep === steps.length - 1 ? "Recipe Review" : "Recipe Form"}
            </Typography>
            <Stepper activeStep={activeStep} className="pt-3 pb-5">
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <>
              {activeStep === steps.length ? (
                <></>
              ) : (
                <>
                  {this.getStepContent(activeStep)}
                  <div className="d-flex justify-content-between">
                    <FormControlLabel
                      className="mt-4"
                      control={
                        <Switch
                          color="primary"
                          onClick={this.handleChange}
                          name="isPrivate"
                          value="isPrivate"
                          inputProps={{ "aria-label": "private checkbox" }}
                        />
                      }
                      label="Private"
                    />
                    <div className="">
                      {activeStep !== 0 && (
                        <Button onClick={this.handleBack} className="ml-2 mt-4">
                          Back
                        </Button>
                      )}
                      {activeStep === steps.length - 1 ? (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={e => this.handleNewRecipeSubmit(e)}
                          className="ml-2 mt-4"
                        >
                          {"Create Recipe"}
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={e => this.handleNewRecipeSubmit(e)}
                          className="ml-2 mt-4"
                        >
                          {"Next"}
                        </Button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </>
          </Paper>
        </main>
      </>
    );
  }
}
