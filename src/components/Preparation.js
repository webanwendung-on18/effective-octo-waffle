import React, { Component } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import firebase from "./../firebase/config";
import "firebase/firestore";
import HTTP_404 from "./HTTP_404";
import Button from "@material-ui/core/Button";
import { FiArrowLeft, FiArrowRight, FiX } from "react-icons/fi";
import { Helmet } from "react-helmet";

var db = firebase.firestore();

class Preparation extends Component {
  constructor(props) {
    super(props);
    this.state = { recipe: null, loading: false, error: null };
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
  render() {
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
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<FiX />}
                    onClick={() => this.handleClick()}
                  >
                    Leave Preparation View
                  </Button>
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
