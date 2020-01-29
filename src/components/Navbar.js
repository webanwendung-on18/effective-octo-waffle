import React, { Component } from "react";
import { Link } from "@reach/router";
import { FiSearch, FiPlusCircle, FiUser, FiLogOut } from "react-icons/fi";

class Navbar extends Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link to="/" className="navbar-brand">
            Effective-Octo-Waffle
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <form class="form-inline">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
              <FiSearch />
            </button>
          </form>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto my-2 my-lg-0">
              <li className="nav-item">
                <Link to="/add-recipe" className="nav-link">
                  <FiPlusCircle className="mr-1" />
                  Add Recipe
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/profile" className="nav-link">
                  <FiUser />
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <FiLogOut />
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  }
}

export default Navbar;
