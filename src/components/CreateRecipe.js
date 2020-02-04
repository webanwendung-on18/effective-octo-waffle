import React, { Component } from "react";
import { navigate } from "@reach/router";
import { FiPlusCircle } from "react-icons/fi";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import RadioGroup from "@material-ui/core/RadioGroup";
import Slider from "@material-ui/core/Slider";
import InputAdornment from "@material-ui/core/InputAdornment";

import firebase from "./../firebase/config";
import "firebase/firestore";
var db = firebase.firestore();

export default class AddressForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    if (["step"].includes(e.target.dataset.fieldType)) {
      let steps = [...this.state.steps];
      steps[e.target.dataset.id][e.target.dataset.fieldType] = e.target.value;
      this.setState({ steps }, () => console.log(this.state));
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

  valuetext(value) {
    return `${value}°C`;
  }
  handleDragStop = () => this.props.update(this.state.value);

  render() {
    const marks = [
      {
        value: 1,
        label: "easy"
      },
      {
        value: 2,
        label: "advanced"
      },
      {
        value: 3,
        label: "difficult"
      }
    ];

    return (
      <>
        <Typography variant="h6" gutterBottom>
          Create Recipe
        </Typography>
        <form
          onSubmit={e => this.handleNewRecipeSubmit(e)}
          onChange={this.handleChange}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id="title"
                name="title"
                label="Title"
                value={this.state.title}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Short description"
                name="description"
                multiline
                rowsMax="3"
                value={this.state.description}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="imageUrl"
                name="imageUrl"
                value={this.state.imageUrl}
                label="Image URL"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* <Typography id="difficulty-slider" gutterBottom>
                Difficulty
              </Typography> */}
              {/* <Slider
                // defaultValue={1}
                // getAriaValueText={this.valuetext}
                aria-labelledby="diffuculty-slider"
                valueLabelDisplay="off"
                step={1}
                min={1}
                max={3}
                marks={marks}
                value={this.state.difficulty}
                onChange={this.handleChange}
                // onDragStop={this.handleDragStop}
                name="difficulty"
              /> */}
              <FormControlLabel
                control={<Radio color="default" size="small" />}
                label="Easy"
                type="radio"
                value="easy"
                labelPlacement="top"
                name="difficulty"
                checked={this.state.difficulty === "easy"}
              />
              <FormControlLabel
                control={<Radio color="default" size="small" />}
                type="radio"
                value="advanced"
                label="Advanced"
                labelPlacement="top"
                name="difficulty"
                checked={this.state.difficulty === "advanced"}
              />
              <FormControlLabel
                control={<Radio color="default" size="small" />}
                type="radio"
                value="difficult"
                label="Difficult"
                labelPlacement="top"
                name="difficulty"
                checked={this.state.difficulty === "difficult"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="number"
                value={this.state.servings}
                name="servings"
                id="standard-start-adornment"
                style={{ width: "100px" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Servings</InputAdornment>
                  )
                }}
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                type="number"
                value={this.state.duration}
                name="duration"
                id="standard-start-adornment"
                className="ml-5"
                style={{ width: "100px" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">minutes</InputAdornment>
                  )
                }}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <FormControlLabel
                control={
                  <Checkbox
                    type="checkbox"
                    onClick={this.handleCheckbox}
                    value="vegetarian"
                    name="vegetarian"
                  />
                }
                label="Vegetarian"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    type="checkbox"
                    onClick={this.handleCheckbox}
                    value="vegan"
                    name="vegan"
                  />
                }
                label="Vegan"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    type="checkbox"
                    onClick={this.handleCheckbox}
                    value="fruitarian"
                    name="fruitarian"
                  />
                }
                label="Fruitarian"
              />
            </Grid>
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
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              );
            })}

            <Typography id="difficulty-slider" gutterBottom>
              Preparation
            </Typography>
            <Grid item xs={12}>
              {this.state.steps.map((step, idx) => {
                let stepIdx = idx + 1;
                let stepId = `step-${stepIdx}`;
                return (
                  <TextField
                    fullWidth
                    key={idx}
                    type="text"
                    name={stepId}
                    id={stepId}
                    alt="step"
                    className="mb-4"
                    value={this.state.steps[idx].step}
                    onChange={() => {}}
                    inputProps={{ "data-id": idx, "data-field-type": "step" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          Step {stepIdx}
                        </InputAdornment>
                      )
                    }}
                  />
                );
              })}
            </Grid>
            <Button
              variant="contained"
              color="primary"
              startIcon={<FiPlusCircle />}
              onClick={this.addStep}
            >
              Add Step
            </Button>
          </Grid>
        </form>
      </>
    );
  }
}
