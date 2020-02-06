import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Paper } from "@material-ui/core";

const styles = {
  paperContainer: {
    height: 200,
    backgroundImage: `url(https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80)`,
    backgroundPosition: "center",
    backgroundRepeat: "norepeat",
    backgroundSize: "cover"
  }
};

class Review extends Component {
  render() {
    return (
      <>
        <Typography variant="h6" gutterBottom>
          Order summary
        </Typography>
        <Grid xs={12} />
        <Paper variant="outlined" style={styles.paperContainer}></Paper>
        <Grid />
        <Typography variant="h6" gutterBottom>
          Order summary
        </Typography>
      </>
    );
  }
}

export default Review;
