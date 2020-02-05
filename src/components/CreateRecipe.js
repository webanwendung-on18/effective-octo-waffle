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
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Paper from "@material-ui/core/Paper";
import FormLabel from "@material-ui/core/FormLabel";

import firebase from "./../firebase/config";
import "firebase/firestore";
import { FormControl } from "@material-ui/core";
var db = firebase.firestore();

export default class CreateRecipe extends Component {
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
    if (["amount", "unit", "ingredient"].includes(e.target.dataset.fieldType)) {
      let ingredients = [...this.state.ingredients];
      ingredients[e.target.dataset.id][e.target.dataset.fieldType] =
        e.target.value;
      this.setState({ ingredients }, () =>
        console.log("ingredients", this.state.ingredients)
      );
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
    console.log("addIngredient", this.state.ingredients);
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
            <Grid item xs={12}>
              <Typography variant="h6" id="difficulty-slider">
                Other Parameter
              </Typography>
            </Grid>
            <Paper variant="outlined" xs={12} width="100%">
              <Grid container item xs={12}>
                <Grid item xs={12} sm={6}>
                  <FormLabel width={1} className="m-3">
                    Difficulty
                  </FormLabel>
                  <Slider
                    aria-labelledby="diffuculty-slider"
                    valueLabelDisplay="off"
                    step={1}
                    className="ml-sm-4 w-xs-50"
                    min={1}
                    max={3}
                    marks={marks}
                    onChange={(event, value) => this.handleSlider(event, value)}
                    name="difficulty"
                  />

                  {/* <RadioGroup row>
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
              </RadioGroup> */}
                </Grid>
                <Grid item xs={12} sm={7}>
                  <TextField
                    type="number"
                    value={this.state.servings}
                    name="servings"
                    id="standard-start-adornment"
                    style={{ width: "100px" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          Servings
                        </InputAdornment>
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
                        <InputAdornment position="start">
                          minutes
                        </InputAdornment>
                      )
                    }}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
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
              </Grid>
            </Paper>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                id="difficulty-slider"
                display="block"
                gutterBottom
              >
                Ingredients
              </Typography>
            </Grid>
            <Grid item>
              {this.state.ingredients.map((step, idx) => {
                let ingId = `ing-${idx}`;
                let amountId = `amount-${idx}`;
                let unitId = `unit-${idx}`;
                return (
                  <Grid
                    container
                    item
                    xs={12}
                    spacing={2}
                    key={idx}
                    className="mb-3"
                  >
                    <Grid item xs={2}>
                      <TextField
                        type="number"
                        label="Amount"
                        name={amountId}
                        id={amountId}
                        alt="amount"
                        value={this.state.ingredients[idx].amount}
                        onChange={() => {}}
                        inputProps={{
                          "data-id": idx,
                          "data-field-type": "amount"
                        }}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <InputLabel
                        style={{ fontSize: "12px" }}
                        htmlFor="age-native-simple"
                      >
                        Unit
                      </InputLabel>
                      <Select
                        native
                        value={this.state.ingredients[idx].unit}
                        name={unitId}
                        id={unitId}
                        alt="unit"
                        label="Unit"
                        inputProps={{
                          "data-id": idx,
                          "data-field-type": "unit"
                        }}
                      >
                        <option value="" />
                        <option value={"piece"}>piece</option>
                        <option value={"ml"}>ml</option>
                        <option value={"g"}>g</option>
                        <option value={"tsp"}>tsp</option>
                        <option value={"tbsp"}>tbsp</option>
                      </Select>
                    </Grid>

                    <Grid item xs={8}>
                      <TextField
                        fullWidth
                        key={idx}
                        name={ingId}
                        label="Ingredient"
                        id={ingId}
                        alt="ingredient"
                        value={this.state.ingredients[idx].ingredient}
                        onChange={() => {}}
                        inputProps={{
                          "data-id": idx,
                          "data-field-type": "ingredient"
                        }}
                      />
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
            <Button
              variant="contained"
              color="primary"
              startIcon={<FiPlusCircle />}
              onClick={this.addIngredient}
            >
              Add Ingredient
            </Button>
            <Grid item xs={12}>
              <Typography variant="h6" id="difficulty-slider" gutterBottom>
                Preparation
              </Typography>
            </Grid>
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