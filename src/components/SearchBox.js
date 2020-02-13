import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { connectAutoComplete } from "react-instantsearch-dom";
import { TextField } from "@material-ui/core";

// onSubmit löschen und alles  einkommentieren, um bei jedem Buchstabe eine Suche zu triggern
const SearchBox = ({ currentRefinement, refine, hits }) => {
  const flatProps = {
    options: hits.map(option => option.title)
  };
  return (
    <div className="feed-container">
      <form
        noValidate
        role="search"
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
