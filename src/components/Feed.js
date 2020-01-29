import React, { Component } from "react";
import { Link } from "@reach/router";

class Feed extends Component {
  render() {
    return (
      <>
        <h1>Feed</h1>
        <Link to="/recipes">Home</Link>
      </>
    );
  }
}

export default Feed;
