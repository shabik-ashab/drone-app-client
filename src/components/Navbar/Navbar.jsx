import * as React from "react";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import logo from "../../image/logo.png";
const Navbar = () => {
  const { user, logOut } = useAuth();

  // // handleClick function help the state to know page location

  // onClick={() => handleClick('products')}
  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand" href="#">
              <img alt=" " src={logo} />
            </a>
            <ul className="navbar-nav ms-2 me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/home">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/products">Products</NavLink>
              </li>
              <li className="nav-item">
                {user.email ? (
                  <NavLink to="/dashboard">Dashboard</NavLink>
                ) : (
                  <NavLink to="/login">login</NavLink>
                )}
              </li>
              <li className="nav-item"></li>
            </ul>
            {user.email ? (
              <p className="usr d-flex pt-2 me-4">
                <p className="">
                  {user?.displayName}{" "}
                  <img
                    alt=" "
                    src={user?.photoURL}
                    className="w-25 img-fluid"
                  />
                </p>
                <p>
                  <Button
                    className=""
                    onClick={logOut}
                    variant="outline-danger"
                  >
                    Logout
                  </Button>
                </p>
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
