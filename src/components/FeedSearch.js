import React from "react";
import { connectSearchBox } from "react-instantsearch-dom";

const SearchBox = ({ currentRefinement, refine }) => (
  <div className="ais-SearchBox">
    <form noValidate action="" role="search" className="ais-SearchBox-form">
      <input
        className="ais-SearchBox-input"
        type="search"
        value={currentRefinement}
        onChange={event => refine(event.currentTarget.value)}
      />
    </form>
  </div>
);

export const CustomSearchBox = connectSearchBox(SearchBox);
