import React, { Component } from "react";
import { Link } from "@reach/router";

import { AppBar, Toolbar, IconButton } from "@material-ui/core/";
import { FiUser, FiPlusCircle, FiLogOut, FiLogIn } from "react-icons/fi";
import logo from "../images/Octo_Waffle_logo.svg";

class Navbar extends Component {
  render() {
    const { user, logOutUser } = this.props;

    return (
      <div>
        <AppBar position="fixed">
          <Toolbar>
            <Link to="/recipes" className="text-dark nounderline d-flex align-items-center">
              <img src={logo} alt="Octo Waffle Logo" className="logo" />
              <h4 className="mb-0 ml-2 title">Octo Waffle</h4>
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
