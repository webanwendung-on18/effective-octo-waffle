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
                id="validationTextarea"
                placeholder="Short description"
                required
              />
              <small id="passwordHelpBlock" className="form-text text-muted">
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
                        name="gridRadios"
                        id="gridRadios1"
                        value="option1"
                        checked
                      />
                      <label className="form-check-label" for="gridRadios1">
                        Easy
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gridRadios"
                        id="gridRadios2"
                        value="option2"
                      />
                      <label className="form-check-label" for="gridRadios2">
                        Advanced
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gridRadios"
                        id="gridRadios3"
                        value="option3"
                      />
                      <label className="form-check-label" for="gridRadios3">
                        Difficult
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control col-sm-5"
                    placeholder="Duration"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                  />
                  <div className="input-group-append">
                    <span className="input-group-text" id="basic-addon2">
                      min
                    </span>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customSwitch1"
                  />
                  <label className="custom-control-label" for="customSwitch1">
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
                  <label for="inputEmail3" className="col-md-2 col-form-label">
                    Servings
                  </label>
                  <div className="col-md-3">
                    <input type="text" className="form-control" />
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
            <textarea className="form-control" aria-label="With textarea" />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Step 2</span>
            </div>
            <textarea className="form-control" aria-label="With textarea" />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Step 3</span>
            </div>
            <textarea className="form-control" aria-label="With textarea" />
          </div>

          {/* BUTTONS */}
          <div className="form-row">
            <div className="col-md-2">
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
