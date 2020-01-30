import React, { Component } from "react";
import { FiPlusCircle } from "react-icons/fi";

class Form extends Component {
  render() {
    return (
      <>
        <h1>Add a recipe</h1>
        <p>Here you can add your own recipe</p>

        <form>
          {/* TITLE */}
          <div className="form-group">
            <div className="form-row">
              <input
                className="form-control form-control-lg"
                type="text"
                placeholder="Title"
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
                  <legend className="col-form-label col-md-2 pt-0">
                    Level
                  </legend>
                  <div className="col-md-10">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        checked
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
                    className="form-control col-sm-5"
                    placeholder="Duration"
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">min</span>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="custom-control custom-switch">
                  <input type="checkbox" className="custom-control-input" />
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
                  <label className="col-md-2 col-form-label">Servings</label>
                  <div className="col-md-3">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="4"
                    />
                  </div>
                </div>
              </div>
              <div className="col-4">
                <ul className="list-group list-group-horizontal-md">
                  <li className="list-group-item">Vegetarian</li>
                  <li className="list-group-item">Vegan</li>
                  <li className="list-group-item">Fruitarian</li>
                </ul>
              </div>
            </div>
          </div>

          {/* INGREDIENTS */}
          <h3>Ingredients</h3>
          <div className="form-group">
            <div className="form-row mb-3">
              <div className="col-3">
                <input type="text" className="form-control" />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="form-row mb-3">
              <div className="col-3">
                <input type="text" className="form-control" />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="form-row">
              <div className="col-3">
                <input type="text" className="form-control" />
              </div>
            </div>
          </div>

          {/* PREPARATION */}
          <h3>Preparation</h3>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Step 1</span>
            </div>
            <textarea className="form-control" />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Step 2</span>
            </div>
            <textarea className="form-control" />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Step 3</span>
            </div>
            <textarea className="form-control" />
          </div>

          {/* BUTTONS */}
          <div className="form-row">
            <div className="col-md-2 mb-3">
              <button type="submit" className="btn btn-primary">
                <FiPlusCircle className="mr-2" />
                Add recipe
              </button>
            </div>
            <div className="offset-md-9 col-md-1">
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </div>
          </div>
        </form>
      </>
    );
  }
}

export default Form;
