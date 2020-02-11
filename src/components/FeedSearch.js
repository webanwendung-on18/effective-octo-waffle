import React from "react";
import { connectSearchBox } from "react-instantsearch-dom";
import { TextField } from "@material-ui/core";

// onSubmit löschen und alles auskommentieren, um bei jedem Buchstabe eine Suche zu starten
const SearchBox = ({ currentRefinement, refine }) => (
  <div className="ais-Search w-75 mx-auto">
    <form
      noValidate
      action=""
      role="search"
      className="ais-SearchBox-form"
      onSubmit={e => {
        e.preventDefault();
        const value = new FormData(e.target).get("search-input");
        refine(value);
      }}
    >
      <TextField
        fullWidth
        className="ais-SearchBox-input"
        type="search"
        id="filled-basic"
        // value={currentRefinement}
        label="Search"
        variant="filled"
        name="search-input"
        // onChange={event => refine(event.currentTarget.value)}
      />
    </form>
  </div>
);

export const CustomSearchBox = connectSearchBox(SearchBox);
