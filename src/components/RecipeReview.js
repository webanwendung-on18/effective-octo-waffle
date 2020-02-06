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

function Empty(props) {
  return <div className="empty">{`No ${props.name}`}</div>;
}

class Review extends Component {
  render() {
    const {
      title,
      // flags,
      // steps,
      // user_name,
      // difficulty,
      description
      // ingredients,
      // imageUrl,
      // duration,
      // servings,
      // isPrivate
    } = this.props;
    return (
      <>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Grid item xs={12} />
        <Paper variant="outlined" style={styles.paperContainer}></Paper>
        <Grid />

        <Grid item xs={12} />
        <Paper variant="outlined" className="reviewPaper">
          <Typography variant="h6" gutterBottom>
            Description
          </Typography>
          {description ? description : <Empty name="description" />}
        </Paper>
        <Grid />

        {/* <Grid item xs={12} />
        <Paper variant="outlined" className="reviewPaper">
          <Typography variant="h6" gutterBottom>
            Description
          </Typography>
          {description ? description : <Empty name="description" />}
        </Paper>
        <Grid /> */}
      </>
    );
  }
}

export default Review;
