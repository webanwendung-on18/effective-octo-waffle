import React, { Component } from "react";
import { Link } from "@reach/router";
import { FiSearch, FiPlusCircle, FiUser, FiLogOut } from "react-icons/fi";

class Navbar extends Component {
  render() {
    const { user, logOutUser } = this.props;

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
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse">
            <form className="form-inline">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                <FiSearch className="mb-1" />
              </button>
            </form>

            {user && (
              <ul className="navbar-nav ml-auto my-2 my-lg-0">
                <li className="nav-item">
                  <Link to="/add-recipe" className="nav-link">
                    <FiPlusCircle className="mr-1 mb-1" />
                    Add Recipe
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">
                    <FiUser className="mb-1" />
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/"
                    onClick={e => logOutUser(e)}
                  >
                    <FiLogOut className="mb-1" />
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </>
    );
  }
}

export default Navbar;
