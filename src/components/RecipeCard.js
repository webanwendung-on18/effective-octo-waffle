import React, { Component } from "react";
import { Link } from "@reach/router";
// Text fit sorgt dafür es kein Umbruch im Titel gibt, egal wie lang.
import { Textfit } from "react-textfit";
import { IoIosTime } from "react-icons/io";

class RecipeCard extends Component {
  render() {
    const {
      id,
      name,
      flags,
      index,
      title,
      duration,
      imageUrl,
      difficulty,
      description
    } = this.props;
    const recipeIndex = index + 1;
    return (
      <div className="card-outline">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="card-content mr-4">
                <span className="card-number card-circle subtle">
                  {("0" + recipeIndex).slice(-2)}
                </span>
                <span className="ml-2">
                  {flags.map((flag, idx) => (
                    <span key={idx} className="flag">
                      {flag}
                    </span>
                  ))}
                </span>
                <span className="card-author subtle">{name}</span>
                <h2 className="card-title">
                  <Textfit mode="single">{title}</Textfit>
                </h2>
                <span className="card-description subtle">{description}</span>
                <Link to={`/recipes/${id}`} className="card-read">
                  <br></br>
                  <span className="underline--magical">Read more</span>
                </Link>
                <div className="d-flex flex-wrap align-items-center">
                  <span className="mr-1" style={{ fontWeight: "600" }}>
                    Difficulty:
                  </span>
                  <span className="mr-4">{difficulty}</span>

                  <span className="mt-xs-2 mt-lg-0">
                    <IoIosTime size={"1.5em"} color={"#333"} className={"mr-1"} />
                    {`${duration} minutes`}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <img src={imageUrl} alt="recipeImage" className="card-media" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeCard;
