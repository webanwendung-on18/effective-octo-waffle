import React, { Component } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import firebase from "./../firebase/config";
import "firebase/firestore";
import HTTP_404 from "./HTTP_404";
import Button from "@material-ui/core/Button";
import { FiX } from "react-icons/fi";
import { Helmet } from "react-helmet";
import { Link, navigate } from "@reach/router";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Typography from "@material-ui/core/Typography";

var db = firebase.firestore();

class Preparation extends Component {
  constructor(props) {
    super(props);
    this.state = { activeStep: 0, recipe: null, loading: false, error: null };
  }

  async componentDidMount() {
    try {
      this.setState({ laoding: true });
      const recipe = await db
        .collection("Recipes")
        .doc(this.props.recipeId)
        .get();
      if (recipe.exists) {
        this.setState({ recipe: recipe.data(), loading: false });
      } else {
        this.setState({ error: "Recipe doesn't exist", loading: false });
      }
    } catch (err) {
      this.setState({ loading: false });
      console.error("Error", err.message);
    }
  }

  handleNext = () => {
    if (this.state.activeStep < this.state.recipe.steps.length - 1) {
      this.setState({ activeStep: this.state.activeStep + 1 });
    } else {
      navigate(`/recipes/${this.props.recipeId}`);
    }
  };

  handleBack = () => {
    this.setState({ activeStep: this.state.activeStep - 1 });
  };

  render() {
    let steps = [];
    if (this.state.recipe !== null) {
      steps = [...this.state.recipe.steps];
    }

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
                  <h1 className="text-center mt-4">{this.state.recipe.title}</h1>
                </div>
                <div className="col-12">
                  <div>
                    <Stepper activeStep={this.state.activeStep} orientation="vertical">
                      {steps.map((step, index) => (
                        <Step key={index}>
                          <StepLabel>
                            <span className="step-label">{`Step ${index + 1}`}</span>
                          </StepLabel>
                          <StepContent>
                            <Typography>
                              <span className="preparation-text">{step.step}</span>
                            </Typography>
                            <div className="mt-3">
                              <Button
                                disabled={this.state.activeStep === 0}
                                onClick={this.handleBack}
                                size="large"
                              >
                                Back
                              </Button>
                              <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                onClick={this.handleNext}
                              >
                                {this.state.activeStep === steps.length - 1 ? "Finish" : "Next"}
                              </Button>
                            </div>
                          </StepContent>
                        </Step>
                      ))}
                    </Stepper>
                  </div>
                </div>
              </div>
              <div className="col-12 d-flex justify-content-center mt-3">
                <Link to={`/recipes/${this.props.recipeId}`} style={{ textDecoration: "none" }}>
                  <Button className="mb-4" variant="contained" color="default" startIcon={<FiX />}>
                    {" "}
                    Leave Preparation View
                  </Button>
                </Link>
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
