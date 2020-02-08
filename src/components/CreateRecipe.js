import React, { Component } from "react";
import { FiPlusCircle } from "react-icons/fi";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Paper from "@material-ui/core/Paper";
import FormLabel from "@material-ui/core/FormLabel";
import { GlobalCss } from "../materialUI/styles";

export default class CreateRecipe extends Component {
  handleNewRecipeSubmit = e => {
    this.props.handleNewRecipeSubmit(e);
  };

  handleChange = e => {
    this.props.handleChange(e);
  };

  addStep = e => {
    this.props.addStep(e);
  };

  addIngredient = e => {
    this.props.addIngredient(e);
  };

  handleCheckbox = e => {
    this.props.handleCheckbox(e);
  };

  handleSlider(event, value) {
    this.props.handleSlider(event, value);
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
        <GlobalCss />
        <Typography variant="h6" gutterBottom>
          Create Recipe
        </Typography>
        <form onSubmit={e => this.handleNewRecipeSubmit(e)} onChange={this.handleChange}>
          <Grid container spacing={3}>
            {/* Title Field */}
            <Grid item xs={12}>
              <TextField
                required
                id="title"
                name="title"
                label="Title"
                value={this.props.title}
                fullWidth
              />
            </Grid>
            {/* Description */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Short description"
                name="description"
                multiline
                rowsMax="3"
                value={this.props.description}
                fullWidth
              />
            </Grid>
            {/* Image URL */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="imageUrl"
                name="imageUrl"
                value={this.props.imageUrl}
                label="Image URL"
                fullWidth
              />
            </Grid>
            {/* Ingredients  Title*/}
            <Grid item xs={12}>
              <Typography variant="h6" id="difficulty-slider" display="block">
                Ingredients
              </Typography>
            </Grid>
            {/* Ingredients */}
            <Paper variant="outlined">
              <Grid container item xs={12} spacing={4} className="ml-1 my-2">
                {this.props.ingredients.map((step, idx) => {
                  let ingId = `ing-${idx}`;
                  let amountId = `amount-${idx}`;
                  let unitId = `unit-${idx}`;
                  return (
                    <Grid container item xs={12} spacing={2} key={idx}>
                      <Grid item xs={2}>
                        <TextField
                          type="number"
                          label="Amount"
                          name={amountId}
                          id={amountId}
                          alt="amount"
                          value={this.props.ingredients[idx].amount}
                          onChange={() => {}}
                          inputProps={{
                            "data-id": idx,
                            "data-field-type": "amount"
                          }}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <InputLabel
                          style={{ fontSize: "12px", paddingTop: "2px" }}
                          htmlFor="age-native-simple"
                        >
                          Unit
                        </InputLabel>
                        <Select
                          native
                          value={this.props.ingredients[idx].unit}
                          name={unitId}
                          id={unitId}
                          style={{ marginTop: "-6.1px" }}
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
                          required
                          fullWidth
                          key={idx}
                          name={ingId}
                          label="Ingredient"
                          id={ingId}
                          alt="ingredient"
                          value={this.props.ingredients[idx].ingredient}
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
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<FiPlusCircle />}
                    onClick={this.addIngredient}
                  >
                    Add Ingredient
                  </Button>
                </Grid>
              </Grid>
            </Paper>
            {/* Preparation Title */}
            <Grid item xs={12}>
              <Typography variant="h6" id="difficulty-slider">
                Preparation
              </Typography>
            </Grid>
            {/* Preparation */}
            <Paper variant="outlined" className="w-100 p-3">
              <Grid container item xs={12}>
                {this.props.steps.map((step, idx) => {
                  let stepIdx = idx + 1;
                  let stepId = `step-${stepIdx}`;
                  return (
                    <Grid item xs={12} key={idx}>
                      <TextField
                        fullWidth
                        required
                        key={idx}
                        type="text"
                        name={stepId}
                        id={stepId}
                        alt="step"
                        className="mb-4"
                        value={this.props.steps[idx].step}
                        onChange={() => {}}
                        inputProps={{
                          "data-id": idx,
                          "data-field-type": "step"
                        }}
                        InputProps={{
                          startAdornment: (
                            <Grid item>
                              <InputAdornment position="start">Step {stepIdx}</InputAdornment>
                            </Grid>
                          )
                        }}
                      />
                    </Grid>
                  );
                })}
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<FiPlusCircle />}
                  onClick={this.addStep}
                >
                  Add Step
                </Button>
              </Grid>
            </Paper>
            {/* Other Parameter Title */}
            <Grid item xs={12}>
              <Typography variant="h6" id="difficulty-slider">
                Other Parameters
              </Typography>
            </Grid>
            {/* Other Parameter */}
            <Paper variant="outlined">
              <Grid container item xs={12} spacing={4} className="m-1">
                <Grid item xs={9} sm={6}>
                  <FormLabel width={1}>Difficulty</FormLabel>
                  <Slider
                    aria-labelledby="diffuculty-slider"
                    valueLabelDisplay="off"
                    step={1}
                    className="ml-sm-4"
                    min={1}
                    max={3}
                    marks={marks}
                    onChange={(event, value) => this.handleSlider(event, value)}
                    name="difficulty"
                  />
                </Grid>
                <Grid container item xs={12} sm={7}>
                  <TextField
                    type="number"
                    value={this.props.servings}
                    name="servings"
                    id="standard-start-adornment"
                    style={{ width: "100px" }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">Servings</InputAdornment>
                    }}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                  <TextField
                    type="number"
                    value={this.props.duration}
                    name="duration"
                    id="standard-start-adornment"
                    className="ml-5"
                    style={{ width: "120px" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start" className="ml-1">
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
                        color="primary"
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
                        color="primary"
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
                        color="primary"
                      />
                    }
                    label="Fruitarian"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </form>
      </>
    );
  }
}
