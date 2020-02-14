import React, { Component } from "react";
import { Link } from "@reach/router";

import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core/";
import { FiUser, FiPlusCircle, FiLogOut, FiLogIn } from "react-icons/fi";

class Navbar extends Component {
  render() {
    const { user, logOutUser } = this.props;

    return (
      <div>
        <AppBar position="fixed">
          <Toolbar>
            <Link to="/recipes" className="text-dark nounderline">
              <Typography variant="h6" noWrap>
                Octo Waffle
              </Typography>
            </Link>
            <div />
            {user && (
              <div className="ml-auto">
                <Link to="/add-recipe">
                  <IconButton>
                    <FiPlusCircle />
                  </IconButton>
                </Link>
                <Link to={`/profile/${this.props.user.uid}`}>
                  <IconButton>
                    <FiUser />
                  </IconButton>
                </Link>
                <Link to="/" onClick={e => logOutUser(e)}>
                  <IconButton>
                    <FiLogOut />
                  </IconButton>
                </Link>
              </div>
            )}
            {!user && (
              <div className="ml-auto">
                <Link to="/login">
                  <IconButton>
                    <FiLogIn />
                  </IconButton>
                </Link>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <div id="nav-space"></div>
      </div>
    );
  }
}

export default Navbar;
