import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Paper, List, ListItem, ListItemText } from "@material-ui/core";
import { IoIosTime } from "react-icons/io";
import { Helmet } from "react-helmet";

function Empty(props) {
  return <div className="empty">{`No ${props.name}`}</div>;
}

class Review extends Component {
  render() {
    const {
      title,
      flags,
      steps,
      difficulty,
      description,
      ingredients,
      imageUrl,
      duration
    } = this.props;
    const styles = {
      paperContainer: {
        height: 200,
        backgroundImage: `url(${imageUrl})`,
        backgroundPosition: "center",
        backgroundRepeat: "norepeat",
        backgroundSize: "cover"
      }
    };
    return (
      <>
        <Helmet>
          <title>Recipe Review | Octo Waffle</title>
        </Helmet>
        <div className="d-flex w-100 align-items-center no-wrap">
          <Typography variant="h6" className="d-inline-block mb-0" gutterBottom>
            {title}
          </Typography>
          <div className="ml-2 justify-content-center">
            {flags.map((flag, idx) => (
              <span key={idx} className="flag reviewFlag">
                {flag}
              </span>
            ))}
          </div>
          <div className="w-100 d-flex justify-content-end align-self-end">
            <span className="mr-1" style={{ fontWeight: "600" }}>
              Difficulty:{" "}
            </span>
            {difficulty}
            <span className="mt-sm-2 mt-lg-0">
              <IoIosTime size={"1.5em"} color={"#333"} className={"ml-lg-5 mr-1 mb-1"} />
              {`${duration} minutes`}
            </span>
          </div>
        </div>
        <Grid item xs={12} />
        <Paper variant="outlined" style={styles.paperContainer} className="mt-2"></Paper>
        <Grid />

        <Grid item xs={12} />
        <Paper variant="outlined" className="reviewPaper">
          <Typography variant="h6" className="ml-2 mt-2" gutterBottom>
            Description
          </Typography>
          {description ? (
            <span className="d-inline-block ml-2 pb-2">{description}</span>
          ) : (
            <Empty name="description" />
          )}
        </Paper>
        <Grid />

        <Grid item xs={12} />
        <Paper variant="outlined" className="reviewPaper">
          <Typography variant="h6" className="ml-2 mt-2" gutterBottom>
            Ingredients
          </Typography>
          <List dense className="ingredientsList">
            {ingredients[0].ingredient !== "" ? (
              ingredients.map((ing, idx) => {
                const ingredient =
                  (ing.amount === 0 ? " " : ing.amount) + ` ${ing.unit} ${ing.ingredient}`;
                return (
                  <ListItem key={idx} className="ingredientItem">
                    <ListItemText primary={ingredient} />
                  </ListItem>
                );
              })
            ) : (
              <Empty name="Ingredients" />
            )}
          </List>
        </Paper>
        <Grid />

        <Grid item xs={12} />
        <Paper variant="outlined" className="reviewPaper">
          <Typography variant="h6" className="ml-2 mt-2" gutterBottom>
            Steps
          </Typography>
          <List dense className="ingredientsList">
            {steps[0].step !== "" ? (
              steps.map((ing, idx) => {
                const step = `Step ${idx + 1}: ${ing.step}`;
                return (
                  <ListItem key={idx} className="ingredientItem">
                    <ListItemText primary={step} />
                  </ListItem>
                );
              })
            ) : (
              <Empty name="steps" />
            )}
          </List>
        </Paper>
        <Grid />
      </>
    );
  }
}

export default Review;
