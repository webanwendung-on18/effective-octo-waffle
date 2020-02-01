import React, { Component } from "react";
import { Link } from "@reach/router";

class Feed extends Component {
  render() {
    return (
      <>
        <div className="container">
          <h1>Feed</h1>
          <Link to="/">Home</Link>
        </div>
      </>
    );
  }
}

export default Feed;
