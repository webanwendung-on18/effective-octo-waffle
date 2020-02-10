import React from "react";

import algoliasearch from "algoliasearch";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";
import RecipeCard from "./RecipeCard";

const searchClient = algoliasearch("471N5SCCV8", "3b9d814b0c08445b640fd407b8dbae54");

function Search() {
  return (
    <InstantSearch searchClient={searchClient} indexName="Recipes">
      <SearchBox />
      <Hits hitComponent={SearchedRecipe} />
    </InstantSearch>
  );
}

// const CustomHighlight = connectHighlight(({ highlight, attribute, hit }) => {
//   const parsedHit = highlight({
//     highlightProperty: "_highlightResult",
//     attribute,
//     hit
//   });

//   return (
//     <div>
//       {console.log(hit)}
//       <h3>{hit.title}</h3>
//       <img src={hit.imageUrl} alt={hit.imageUrl} />
//       {parsedHit.map(part => (part.isHighlighted ? <mark>{part.value}</mark> : part.value))}
//     </div>
//   );
// });

const SearchedRecipe = ({ hit }) => (
  <div className="card-container" key={hit.objectID}>
    <RecipeCard
      id={hit.objectID}
      title={hit.title}
      flags={hit.flags}
      name={hit.user_name}
      duration={hit.duration}
      imageUrl={hit.imageUrl}
      difficulty={hit.difficulty}
      description={hit.description}
    />
  </div>
);

export default Search;
