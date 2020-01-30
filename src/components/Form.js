import React, { Component } from "react";
import Navbar from "./Navbar";

class Form extends Component {
  render() {
    return (
      <>
        <Navbar />
        <div className="container">
          <h1>Add a recipe</h1>
        </div>
      </>
    );
  }
}

export default Form;
