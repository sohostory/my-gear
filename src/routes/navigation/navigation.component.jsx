import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";

import camera from "../../assets/camera.png";

import "./navigation.styles.scss";

const Navigation = () => {
  return (
    <Fragment>
      <nav className="navigation">
        <Link to="/" className="logo-container" to="/">
          <img src={camera} className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link to="/sign-in" className="nav-link">
            SIGN IN
          </Link>
          <Link to="/register" className="nav-link">
            REGISTER
          </Link>
        </div>
      </nav>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
