import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";

import camera from "../../assets/camera.png";

import "./navigation.styles.scss";

const Navigation = () => {
  return (
    <Fragment>
      <nav className="navigation">
        <Link to="/" className="logo-container">
          <img src={camera} className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link to="/authentication" className="nav-link">
            SIGN IN
          </Link>
          <Link to="/dashboard" className="nav-link">
            DASHBOARD
          </Link>
        </div>
      </nav>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
