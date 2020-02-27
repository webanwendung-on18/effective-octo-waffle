import React, { Component } from "react";
import { Link } from "@reach/router";
// Text fit sorgt dafür es kein Umbruch im Titel gibt, egal wie lang.
import { Textfit } from "react-textfit";
import { IoIosTime } from "react-icons/io";

class RecipeCard extends Component {
  render() {
    const { name, id, flags, title, duration, imageUrl, difficulty, description } = this.props;
    const open = () => <Link to={`/recipes/${id}`}></Link>;
    return (
      <Link to={`/recipes/${id}`} className="nounderline noColorLink">
        <div onClick={open} className="container nounderline">
          <div className="card-outline mb-5">
            <div className="row">
              <div className="col-md-7">
                <div className="card-content">
                  <span className="card-author subtle">{name}</span>
                  <div className="my-2 mb-4">
                    {flags.map((flag, idx) => (
                      <span key={idx} className="flag">
                        {flag}
                      </span>
                    ))}
                  </div>
                  <h2 className="card-title">
                    <Textfit mode="multi">{title}</Textfit>
                  </h2>
                  <span className="card-description subtle my-1">{description}</span>
                  <div className="mt-3 pt-2 my-4 rInfo">
                    <span className="mr-1 mb-2" style={{ fontWeight: "600" }}>
                      Difficulty:
                    </span>
                    <span className="mr-4">{difficulty}</span>
                    <span className="mt-xs-2 mt-lg-0 nobreak">
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
      </Link>
    );
  }
}

export default RecipeCard;
