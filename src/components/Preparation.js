import React, { Component } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import firebase from "./../firebase/config";
import "firebase/firestore";
import HTTP_404 from "./HTTP_404";
import Button from "@material-ui/core/Button";
import { FiArrowLeft, FiArrowRight, FiX } from "react-icons/fi";
import { Helmet } from "react-helmet";
import { Link } from "@reach/router";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

var db = firebase.firestore();

class Preparation extends Component {
  constructor(props) {
    super(props);
    this.state = { activeStep: 0, recipe: null, loading: false, error: null };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    window.history.back();
  }

  async componentDidMount() {
    try {
      this.setState({ laoding: true });
      const recipe = await db
        .collection("Recipes")
        .doc(this.props.recipeId)
        .get();
      if (recipe.exists) {
        this.setState({ recipe: recipe.data(), loading: false }, () =>
          console.log(this.state.recipe)
        );
      } else {
        this.setState({ error: "Recipe doesn't exist", loading: false });
      }
    } catch (err) {
      this.setState({ loading: false });
      console.error("Error", err.message);
    }
  }

  handleNext = () => {
    this.setState({ activeStep: this.state.activeStep + 1 });
  };

  handleBack = () => {
    this.setState({ activeStep: this.state.activeStep - 1 });
  };

  // Needs to be an automated array with steps
  getSteps() {
    return ["Select campaign settings", "Create an ad group", "Create an ad"];
  }

  // Need to be switched to steps
  getStepContent(step) {
    switch (step) {
      case 0:
        return `For each ad campaign that you create, you can control how much
                you're willing to spend on clicks and conversions, which networks
                and geographical locations you want your ads to show on, and more.`;
      case 1:
        return "An ad group contains one or more ads which target a shared set of keywords.";
      case 2:
        return `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`;
      default:
        return "Unknown step";
    }
  }

  render() {
    const steps = this.getSteps();

    return (
      <>
        {this.state.error && <HTTP_404 message={this.state.error} />}
        {!this.state.loading && this.state.recipe !== null ? (
          <>
            <Helmet>
              <title>{this.state.recipe.title} - Preparation | Octo Waffle</title>
            </Helmet>
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <h1 className="text-center">{this.state.recipe.title}</h1>
                </div>
                <div className="col-12">
                  <ul className="list">
                    {this.state.recipe.steps.map((step, idx) => (
                      <li key={idx} className="mb-4">
                        <h3 className="steps">Step {idx + 1}</h3>
                        {step.step}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="">
                  <Button
                    variant="contained"
                    color="default"
                    startIcon={<FiArrowLeft />}
                    onClick="/"
                  >
                    Previous Step
                  </Button>
                </div>
                <div className="ml-auto">
                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<FiArrowRight />}
                    onClick="/"
                  >
                    Next Step
                  </Button>
                </div>
                <div className="col-12 d-flex justify-content-center mt-4">
                  <Link to={`/recipes/${this.props.recipeId}`} style={{ textDecoration: "none" }}>
                    <Button variant="contained" color="secondary" startIcon={<FiX />}>
                      {" "}
                      Leave Preparation View
                    </Button>
                  </Link>
                </div>

                <div className="col-12">
                  <div>
                    <Stepper activeStep={this.state.activeStep} orientation="vertical">
                      {steps.map((label, index) => (
                        <Step key={label}>
                          <StepLabel>{label}</StepLabel>
                          <StepContent>
                            <Typography>{this.getStepContent(index)}</Typography>
                            <div>
                              <div>
                                <Button
                                  disabled={this.state.activeStep === 0}
                                  onClick={this.handleBack}
                                >
                                  Back
                                </Button>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={this.handleNext}
                                >
                                  {this.state.activeStep === steps.length - 1 ? "Finish" : "Next"}
                                </Button>
                              </div>
                            </div>
                          </StepContent>
                        </Step>
                      ))}
                    </Stepper>
                    {this.state.activeStep === steps.length && (
                      <Paper square elevation={0}>
                        <Typography>All steps completed - you&apos;re finished</Typography>
                      </Paper>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <SyncLoader size={15} color={"#333"} loading={this.state.loading} />
        )}
      </>
    );
  }
}

export default Preparation;
