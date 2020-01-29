import React, { Component } from "react";
import { Link } from "@reach/router";
import Navbar from "./Navbar";

class Feed extends Component {
  render() {
    return (
      <>
        <Navbar />
        <h1>Feed</h1>
        <Link to="/">Home</Link>
      </>
    );
  }
}

export default Feed;
