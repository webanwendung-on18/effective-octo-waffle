import React, { Component } from "react";
import RecipeCard from "./RecipeCard";
import { connectHits } from "react-instantsearch-dom";

class Hits extends Component {
  render() {
    return (
      <>
        {this.props.hits.length > 0
          ? this.props.hits.map((hit, index) => (
              <div className="feed-container" key={hit.objectID}>
                <RecipeCard
                  index={index}
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
            ))
          : null}
      </>
    );
  }
}

export const CustomHits = connectHits(Hits);
