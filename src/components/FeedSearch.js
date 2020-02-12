import React from "react";
import { connectSearchBox } from "react-instantsearch-dom";
import { connectAutoComplete } from "react-instantsearch-dom";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

// onSubmit löschen und alles auskommentieren, um bei jedem Buchstabe eine Suche zu starten
const SearchBox = ({ currentRefinement, refine, hits }) => {
  const flatProps = {
    options: hits.map(option => option.title)
  };
  return (
    <div className="ais-Search w-75 mx-auto">
      <form
        noValidate
        action=""
        role="search"
        className="ais-SearchBox-form"
        onChange={e => {
          const value = e.target.value;
          if (value === "") {
            refine(value);
          }
        }}
        onSubmit={e => {
          e.preventDefault();
          const value = new FormData(e.target).get("search-input");
          refine(value);
        }}
      >
        <Autocomplete
          {...flatProps}
          id="disable-open-on-focus"
          disableOpenOnFocus
          renderInput={params => (
            <TextField
              {...params}
              fullWidth
              className="ais-SearchBox-input"
              type="search"
              id="filled-basic"
              // value={currentRefinement}
              label="Search"
              variant="filled"
              name="search-input"
              // onChange={event => refine(event.currentTarget.value)} margin="normal" fullWidth
            />
          )}
          onChange={e => {
            const value = e.target.value;
            if (e.keyCode === 13) {
              refine(value);
            }
          }}
        />
      </form>
    </div>
  );
};

export const CustomSearchBox = connectAutoComplete(SearchBox);
