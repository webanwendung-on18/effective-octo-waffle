import React, { Component } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";

class Like extends Component {
  constructor() {
    super();
    this.state = {
      liked: false,
      likes: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      liked: !this.state.liked
    });
    console.log(this.state.liked);
  }

  handleLike = () => {
    if (!this.state.liked) {
      this.setState((prevState, props) => {
        return {
          likes: prevState.likes + 1,
          liked: true
        };
      });
    } else {
      this.setState((prevState, props) => {
        return {
          likes: prevState.likes - 1,
          liked: false
        };
      });
    }
  };

  render() {
    return (
      <>
        <div className="container">
          <div>
            Do you like this recipe? Give it a &nbsp;
            <span className="likeButton">
              {
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  value="checked"
                  onClick={(this.handleClick, this.handleLike)}
                  className="mb-1"
                />
              }
              <span>{this.state.likes}</span>
            </span>
          </div>
        </div>
      </>
    );
  }
}

export default Like;
