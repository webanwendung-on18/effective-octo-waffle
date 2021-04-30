import React, { Component } from "react";
import RecipeCard from "./RecipeCard";

class Hits extends Component {
  render() {
    return (
      <>
        {this.props.recipes.length > 0
          ? this.props.recipes.map((hit, index) => (
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

export default Hits;
