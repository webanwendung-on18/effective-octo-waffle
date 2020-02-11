import React from "react";
import { connectSearchBox } from "react-instantsearch-dom";
import { TextField } from "@material-ui/core";

const SearchBox = ({ currentRefinement, refine }) => (
  <div className="ais-SearchBox">
    <form noValidate action="" role="search" className="ais-SearchBox-form">
      <TextField
        fullWidth
        className="ais-SearchBox-input"
        type="search"
        id="filled-basic"
        value={currentRefinement}
        label="Search"
        variant="filled"
        onChange={event => refine(event.currentTarget.value)}
      />
    </form>
  </div>
);

export const CustomSearchBox = connectSearchBox(SearchBox);
