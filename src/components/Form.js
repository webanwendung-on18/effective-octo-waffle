import React, { Component } from "react";
import { FiPlusCircle } from "react-icons/fi";
import firebase from "./../firebase/config";
import { navigate } from "@reach/router";
import "firebase/firestore";

var db = firebase.firestore();

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      imageUrl: "",
      difficulty: "easy",
      duration: 0,
      isPrivate: false,
      servings: 0,
      flags: [],
      ingredients: [{ ingredient: "", amount: 0, unit: "" }],
      steps: [{ step: "" }],
      user_name: "",
      user_id: ""
    };

    // This binding is necessary to make `this` work in the callback
    this.handleNewRecipeSubmit = this.handleNewRecipeSubmit.bind(this);
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
  };

  handleChange = e => {
    if (/step/gi.test(e.target.className)) {
      let steps = [...this.state.steps];
      steps[e.target.dataset.id][[...e.target.classList][0].match("step")[0]] =
        e.target.value;
      this.setState({ steps });
    }
    if (/unit|amount|ingredient/gi.test(e.target.className)) {
      let ingredients = [...this.state.ingredients];
      ingredients[e.target.dataset.id][
        [...e.target.classList][0].match(/unit|amount|ingredient/gi)[0]
      ] = e.target.value;
      this.setState({ ingredients });
    } else {
      this.setState({
        [e.target.name]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value
      });
    }
  };

  addStep = e => {
    this.setState(prevState => ({
      steps: [...prevState.steps, { step: "" }]
    }));
  };

  addIngredient = e => {
    this.setState(prevState => ({
      ingredients: [
        ...prevState.ingredients,
        { ingredient: "", amount: 0, unit: "" }
      ]
    }));
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
  render() {
    return (
      <div className="container">
        <h1>Add a recipe</h1>
        <p>Here you can add your own recipe</p>

        <form
          onSubmit={e => this.handleNewRecipeSubmit(e)}
          onChange={this.handleChange}
        >
          {/* TITLE */}
          <div className="form-group">
            <div className="form-row">
              <input
                className="form-control form-control-lg"
                type="text"
                placeholder="Title"
                value={this.state.title}
                name="title"
                onChange={() => {}}
                required
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="form-group">
            <div className="form-row">
              <textarea
                className="form-control"
                placeholder="Short description"
                value={this.state.description}
                name="description"
                onChange={() => {}}
                required
              />
              <small className="form-text text-muted">
                This description will be displayed together with the title in
                the feed
              </small>
              <input
                className="form-control form-control mt-2"
                type="text"
                placeholder="Image URL"
                value={this.state.imageUrl}
                name="imageUrl"
                onChange={() => {}}
                required
              />
            </div>
          </div>

          {/* SELECTION 1 */}
          <div className="form-group">
            <div className="form-row">
              <div className="col">
                <div className="row">
                  <legend className="col-form-label col-xl-2 pt-0">
                    Difficulty
                  </legend>
                  <div className="col-xl-10">
                    <div className="form-check">
                      <label className="form-check-label">
                        <input
                          value="easy"
                          type="radio"
                          name="difficulty"
                          onChange={() => {}}
                          className="form-check-input"
                          checked={this.state.difficulty === "easy"}
                        />
                        Easy
                      </label>
                    </div>
                    <div className="form-check">
                      <label className="form-check-label">
                        <input
                          type="radio"
                          value="advanced"
                          name="difficulty"
                          className="form-check-input"
                          onChange={() => {}}
                          checked={this.state.difficulty === "advanced"}
                        />
                        Advanced
                      </label>
                    </div>
                    <div className="form-check">
                      <label className="form-check-label">
                        <input
                          type="radio"
                          value="difficult"
                          name="difficulty"
                          className="form-check-input"
                          onChange={() => {}}
                          checked={this.state.difficulty === "difficult"}
                        />
                        Difficult
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control col-sm-4 col-md-3 col-lg-2"
                    placeholder="Duration"
                    name="duration"
                    value={this.state.duration}
                    onChange={() => {}}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">minutes</span>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    name="isPrivate"
                    id="privateSwitch"
                    checked={this.state.isPrivate}
                    readOnly
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="privateSwitch"
                  >
                    Private
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* SELECTION 2 */}
          <div className="form-group">
            <div className="form-row">
              <div className="col-4">
                <div className="row">
                  <label className="col-xl-2 col-form-label">Servings</label>
                  <div className="col-3 col-sm-5 col-md-4">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="4"
                      name="servings"
                      value={this.state.servings}
                      onChange={() => {}}
                    />
                  </div>
                </div>
              </div>

              {/* FLAGS */}
              <div className="col-4">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox1"
                    onClick={this.handleCheckbox}
                    value="vegetarian"
                    name="vegetarian"
                    readOnly
                  />
                  <label className="form-check-label">Vegetarian</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox1"
                    onClick={this.handleCheckbox}
                    name="vegan"
                    value="vegan"
                  />
                  <label className="form-check-label">Vegan</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onClick={this.handleCheckbox}
                    name="fruitarian"
                    id="inlineCheckbox1"
                    value="fruitarian"
                  />
                  <label className="form-check-label">Fruitarian</label>
                </div>
              </div>
            </div>
          </div>

          {/* INGREDIENTS */}
          <h3>Ingredients</h3>
          <div className="form-group">
            {this.state.ingredients.map((ing, idx) => {
              let ingId = `ing-${idx}`;
              let amountId = `amount-${idx}`;
              let unitId = `unit-${idx}`;
              return (
                <div className="form-row mb-3" key={idx}>
                  <div className="col-sm-2 col-md-1">
                    <input
                      onChange={() => {}}
                      type="number"
                      name={amountId}
                      data-id={idx}
                      id={amountId}
                      value={this.state.ingredients[idx].amount}
                      className="amount form-control"
                    />
                  </div>
                  <div className="col-sm-3 col-md-2">
                    <select
                      value={this.state.ingredients[idx].unit}
                      className="unit custom-select"
                      id={unitId}
                      name={unitId}
                      data-id={idx}
                      onChange={() => {}}
                    >
                      <option value="piece">piece</option>
                      <option value="ml">ml</option>
                      <option value="g">g</option>
                      <option value="tsp">tsp</option>
                      <option value="tbsp">tbsp</option>
                    </select>
                  </div>
                  <div className="col-sm-7 col-md-4">
                    <input
                      type="text"
                      className="ingredient form-control"
                      id={ingId}
                      name={ingId}
                      data-id={idx}
                      value={this.state.ingredients[idx].ingredient}
                      onChange={() => {}}
                    />
                  </div>
                </div>
              );
            })}
            <div className="form-row mb-3">
              <div className="col-lg-3">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.addIngredient}
                >
                  <FiPlusCircle className="mr-2 mb-1" />
                  Add ingredient
                </button>
              </div>
            </div>
          </div>

          {/* PREPARATION */}
          <h3>Preparation</h3>
          {this.state.steps.map((step, idx) => {
            let stepIdx = idx + 1;
            let stepId = `step-${stepIdx}`;
            return (
              <div key={idx} className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Step {stepIdx}</span>
                </div>
                <textarea
                  type="text"
                  name={stepId}
                  data-id={idx}
                  id={stepId}
                  alt="step"
                  className="step form-control"
                  value={this.state.steps[idx].step}
                  onChange={() => {}}
                />
              </div>
            );
          })}

          {/* BUTTONS */}
          <div className="form-group">
            <div className="form-row">
              <div className="col-lg-2 mb-3">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.addStep}
                >
                  <FiPlusCircle className="mr-2 mb-1" />
                  Add step
                </button>
              </div>
              <div className="offset-lg-9 col-lg-1">
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
