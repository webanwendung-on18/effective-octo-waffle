import React, { Component } from "react";
import { Link } from "@reach/router";
import Navbar from "./Navbar";

class Form extends Component {
  render() {
    return (
      <>
        <Navbar />
        <h1>Add a recipe</h1>
      </>
    );
  }
}

export default Form;
