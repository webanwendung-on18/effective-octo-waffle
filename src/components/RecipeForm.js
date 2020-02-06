import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CreateRecipe from "./CreateRecipe";
import Review from "./Review";
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
          <Review
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
    e.preventDefault();
    if (this.state.activeStep === 1) {
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
      navigate("/recipes");
      return;
    }
    this.setState({ activeStep: this.state.activeStep + 1 });
  };

  handleChange = e => {
    console.log("e", e.target.dataset.fieldType);
    if (["step"].includes(e.target.dataset.fieldType)) {
      let steps = [...this.state.steps];
      steps[e.target.dataset.id][e.target.dataset.fieldType] = e.target.value;
      this.setState({ steps }, () => console.log(this.state));
    }
    if (["amount", "unit", "ingredient"].includes(e.target.dataset.fieldType)) {
      let ingredients = [...this.state.ingredients];
      ingredients[e.target.dataset.id][e.target.dataset.fieldType] = e.target.value;
      this.setState({ ingredients }, () => console.log("ingredients", this.state.ingredients));
    } else {
      this.setState(
        {
          [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
        },
        () => console.log("u", this.state)
      );
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
        this.setState({ flags: [...this.state.flags, e.target.value] }, () =>
          console.log(this.state)
        );
      }
    }
  };

  addStep = e => {
    this.setState(prevState => ({
      steps: [...prevState.steps, { step: "" }]
    }));
  };

  addIngredient = e => {
    console.log("addIngredient", this.state.ingredients);
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
    const { activeStep } = this.state;
    return (
      <>
        <CssBaseline />
        <main className="formLayout">
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
                  <div className="d-flex justify-content-end">
                    {activeStep !== 0 && (
                      <Button onClick={this.handleBack} className="ml-2 mt-2">
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={e => this.handleNewRecipeSubmit(e)}
                      className="ml-2 mt-4"
                    >
                      {activeStep === steps.length - 1 ? "Create Recipe" : "Next"}
                    </Button>
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
