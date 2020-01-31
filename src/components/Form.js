import React, { Component } from "react";
import { FiPlusCircle } from "react-icons/fi";
import firebase from "./../firebase/config";
import "firebase/firestore";

var db = firebase.firestore();

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      difficulty: "",
      duration: 0,
      private: false,
      servings: 0,
      flags: [],
      ingredients: [],
      steps: [{ step: "" }],
      user_name: "",
      user_id: ""
    };

    // This binding is necessary to make `this` work in the callback
    this.handleNewRecipeSubmit = this.handleNewRecipeSubmit.bind(this);
  }

  handleChange = e => {
    if (["step"].includes(e.target.className)) {
      let steps = [...this.state.steps];
      steps[e.target.dataset.id][e.target.className] = e.target.value;
      this.setState({ steps }, () => console.log(this.state.steps));
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  handleNewRecipeSubmit = e => {
    e.preventDefault();
    db.collection("Recipes")
      .add({
        title: this.state.title,
        description: this.state.description,
        difficulty: this.state.difficulty,
        duration: this.state.duration,
        private: this.state.private,
        servings: this.state.servings,
        //Arrays
        flags: this.state.flags,
        ingredients: this.state.ingredients,
        steps: this.state.steps
      })
      .then(docRef => {
        this.setState({ docRefId: docRef.id });
        console.log("Document created: ", docRef);
      })
      .catch(err => {
        console.log(`Error adding document: ${err}`);
      });
    this.getRecipes();
  };

  getRecipes = async () => {
    const snapshot = await db.collection("Recipes").get();
    const document = [];
    snapshot.forEach(doc => (document[doc.id] = doc.data()));
  };

  addStep = e => {
    this.setState(prevState => ({
      steps: [...prevState.steps, { step: "" }]
    }));
  };

  render() {
    return (
      <>
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
                onChange={e => this.setState({ title: e.target.value })}
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
                onChange={e => this.setState({ description: e.target.value })}
                required
              />
              <small className="form-text text-muted">
                This description will be displayed together with the title in
                the feed
              </small>
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
                      <input
                        className="form-check-input"
                        type="radio"
                        checked
                        value={this.state.difficulty}
                        onChange={e =>
                          this.setState({ difficulty: e.target.value })
                        }
                      />
                      <label className="form-check-label">Easy</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" />
                      <label className="form-check-label">Advanced</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" />
                      <label className="form-check-label">Difficult</label>
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
                    value={this.state.duration}
                    onChange={e => this.setState({ duration: e.target.value })}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">min</span>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    value={this.state.private}
                    onChange={e => this.setState({ private: e.target.value })}
                  />
                  <label className="custom-control-label">Private</label>
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
                      value={this.state.servings}
                      onChange={e =>
                        this.setState({ servings: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* FLAGS */}
              <div className="col-4">
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox1"
                    value="Vegetarian"
                  />
                  <label class="form-check-label">Vegetarian</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox1"
                    value="Vegan"
                  />
                  <label class="form-check-label">Vegan</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox1"
                    value="Fruitarian"
                  />
                  <label class="form-check-label">Fruitarian</label>
                </div>
              </div>
            </div>
          </div>

          {/* INGREDIENTS */}
          <h3>Ingredients</h3>
          <div className="form-group">
            <div className="form-row mb-3">
              <div className="col-sm-2 col-md-1">
                <input type="number" className="form-control" />
              </div>
              <div className="col-sm-3 col-md-2">
                <select class="custom-select">
                  <option defaultValue>amount</option>
                  <option value="1">piece</option>
                  <option value="2">ml</option>
                  <option value="3">g</option>
                  <option value="4">tsp</option>
                  <option value="5">tbsp</option>
                </select>
              </div>
              <div className="col-sm-7 col-md-4">
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="form-row mb-3">
              <div className="col-sm-2 col-md-1">
                <input type="number" className="form-control" />
              </div>
              <div className="col-sm-3 col-md-2">
                <select class="custom-select">
                  <option defaultValue>amount</option>
                  <option value="1">piece</option>
                  <option value="2">ml</option>
                  <option value="3">g</option>
                  <option value="4">tsp</option>
                  <option value="5">tbsp</option>
                </select>
              </div>
              <div className="col-sm-7 col-md-4">
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="form-row mb-3">
              <div className="col-sm-2 col-md-1">
                <input type="number" className="form-control" />
              </div>
              <div className="col-sm-3 col-md-2">
                <select class="custom-select">
                  <option defaultValue>amount</option>
                  <option value="1">piece</option>
                  <option value="2">ml</option>
                  <option value="3">g</option>
                  <option value="4">tsp</option>
                  <option value="5">tbsp</option>
                </select>
              </div>
              <div className="col-sm-7 col-md-4">
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="form-row mb-3">
              <div className="col-lg-3">
                <button type="button" className="btn btn-primary">
                  <FiPlusCircle className="mr-2 mb-1" />
                  Add ingredient
                </button>
              </div>
            </div>
          </div>

          {/* PREPARATION */}
          <h3>Preparation</h3>
          <div className="form-group">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">Step 1</span>
              </div>
              <textarea className="form-control" />
            </div>
          </div>

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
                  className="step"
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
      </>
    );
  }
}

export default Form;
